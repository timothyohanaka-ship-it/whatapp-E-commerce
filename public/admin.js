// ========== FIREBASE SETUP ==========
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, onSnapshot, deleteDoc, doc, updateDoc, writeBatch, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAcB6y16zcRnYUsi3Yg4mVWoVUQSk6EkXM",
  authDomain: "e-commance-3d365.firebaseapp.com",
  projectId: "e-commance-3d365",
  storageBucket: "e-commance-3d365.firebasestorage.app",
  messagingSenderId: "91723916780",
  appId: "1:91723916780:web:a5e7079edb49ed84118cc9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ========== ADMIN CREDENTIALS ==========
// List of admin emails - Add your admin emails here
const ADMIN_EMAILS = [
  "admin@example.com",
  "owner@example.com"
  // Add more admin emails as needed
];

// For backwards compatibility, also support simple username/password login
const ADMIN_USER = "Admin";
const ADMIN_PASS = "12345";

let currentUser = null;
let isAdminUser = false;
let products = [];
let productsUnsubscribe = null;

// ========== AUTH STATE MANAGEMENT ==========
function checkAuthState() {
  onAuthStateChanged(auth, async (user) => {
    currentUser = user;
    
    if (user) {
      // Check if user is in admin list
      isAdminUser = ADMIN_EMAILS.includes(user.email);
      
      if (!isAdminUser) {
        // Non-admin users redirected to store
        alert("You do not have admin access.");
        window.location.href = "home.html";
        return;
      }
      
      // Admin user - show dashboard
      showAdminDashboard();
      setupProductsListener();
      loadStoreSettingsFields();
      loadAdminMarqueeInput();
    } else {
      // Not logged in - show login form
      showLoginForm();
    }
  });
}

function showLoginForm() {
  const loginSection = document.getElementById("login-section");
  const adminDashboard = document.getElementById("admin-dashboard");
  
  if (loginSection) loginSection.classList.remove("hidden");
  if (adminDashboard) adminDashboard.classList.add("hidden");
}

function showAdminDashboard() {
  const loginSection = document.getElementById("login-section");
  const adminDashboard = document.getElementById("admin-dashboard");
  
  if (loginSection) loginSection.classList.add("hidden");
  if (adminDashboard) adminDashboard.classList.remove("hidden");
}

function handleLogout() {
  signOut(auth).then(() => {
    showLoginForm();
  }).catch((error) => {
    console.error("Logout Error:", error);
  });
}

function handleLogin(event) {
  event.preventDefault();
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    // Simple password auth - show admin dashboard
    // Note: In production, use Firebase email/password auth instead
    isAdminUser = true;
    showAdminDashboard();
    setupProductsListener();
    loadStoreSettingsFields();
    loadAdminMarqueeInput();
  } else {
    alert("Invalid username or password!");
  }
}

// ========== FIRESTORE PRODUCTS MANAGEMENT ==========
function setupProductsListener() {
  const productsRef = collection(db, 'products');
  
  if (productsUnsubscribe) productsUnsubscribe();
  
  productsUnsubscribe = onSnapshot(productsRef, (snapshot) => {
    products = [];
    snapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    renderAdminProducts();
  });
}

// Add product to Firestore
async function handleAddProduct(event) {
  event.preventDefault();

  const name = document.getElementById('prod-name').value.trim();
  const category = document.getElementById('prod-category').value;
  const price = parseFloat(document.getElementById('prod-price').value);
  const originalPrice = parseFloat(document.getElementById('prod-orig-price').value) || null;
  const color = document.getElementById('prod-color').value.trim();
  const description = document.getElementById('prod-desc').value.trim();

  const selectedSource = document.getElementById('image-source-dropdown').value;
  let imageSrc = '';

  if (selectedSource === 'url') {
    imageSrc = document.getElementById('prod-image-url').value.trim();
  } else {
    const fileInput = document.getElementById('prod-image-file');
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      
      if (file.size > 1500000) {
        alert("File size too large! Please choose an image smaller than 1.5MB.");
        return;
      }
      
      try {
        imageSrc = await readFileAsDataURL(file);
      } catch (err) {
        alert("Error reading file.");
        return;
      }
    }
  }

  if (!imageSrc) {
    imageSrc = 'https://via.placeholder.com/300?text=No+Image';
  }

  const newProduct = {
    name,
    category,
    price,
    originalPrice,
    color,
    description,
    image: imageSrc,
    createdAt: new Date().toISOString() // Add timestamp
  };

  try {
    // Add to Firestore
    const docRef = await addDoc(collection(db, 'products'), newProduct);
    console.log("Product added with ID:", docRef.id);
    
    document.getElementById('add-product-form').reset();
    handleImageSourceChange('url');
    alert('Product added successfully!');
  } catch (e) {
    console.error("Error adding product:", e);
    alert('Failed to add product: ' + e.message);
  }
}

async function deleteProduct(productId) {
  if (!confirm('Are you sure you want to delete this product?')) return;
  
  try {
    await deleteDoc(doc(db, 'products', productId));
    alert('Product deleted successfully!');
  } catch (e) {
    console.error("Error deleting product:", e);
    alert('Failed to delete product: ' + e.message);
  }
}

async function updateProductQuantity(productId, newQuantity) {
  try {
    await updateDoc(doc(db, 'products', productId), {
      quantity: newQuantity
    });
  } catch (e) {
    console.error("Error updating product:", e);
  }
}

async function toggleStock(productId, currentStock) {
  try {
    await updateDoc(doc(db, 'products', productId), {
      inStock: !currentStock
    });
  } catch (e) {
    console.error("Error toggling stock:", e);
  }
}

function renderAdminProducts() {
  const tableBody = document.getElementById('admin-product-table');
  if (!tableBody) return;

  tableBody.innerHTML = '';

  if (products.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 20px;">No products yet.</td></tr>';
    return;
  }

  products.forEach((product) => {
    const createdDate = product.createdAt 
      ? new Date(product.createdAt).toLocaleDateString() 
      : 'N/A';
    
    tableBody.innerHTML += `
      <tr>
        <td><img src="${product.image}" style="max-width: 50px; border-radius: 4px;"></td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.description || 'N/A'}</td>
        <td>₦${Number(product.price).toLocaleString()}</td>
        <td>${product.quantity || 0}</td>
        <td>${createdDate}</td>
        <td>
          <button onclick="toggleStock('${product.id}', ${product.inStock})" style="padding: 6px 12px; background: ${product.inStock ? '#27ae60' : '#e74c3c'}; color: white; border: none; border-radius: 4px; cursor: pointer;">
            ${product.inStock ? 'In Stock' : 'Out of Stock'}
          </button>
          <button onclick="deleteProduct('${product.id}')" style="padding: 6px 12px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 5px;">Delete</button>
        </td>
      </tr>
    `;
  });
}

// ========== STORE SETTINGS MANAGEMENT ==========
async function saveStoreSettings() {
  const nameInput = document.getElementById('store-name-input');
  const taglineInput = document.getElementById('store-tagline-input');
  const loginBgUrlInput = document.getElementById('login-bg-url');
  const loginBgFileInput = document.getElementById('login-bg-file');

  let loginBackgroundImage = '';

  if (loginBgFileInput && loginBgFileInput.files && loginBgFileInput.files[0]) {
    const file = loginBgFileInput.files[0];
    try {
      loginBackgroundImage = await readFileAsDataURL(file);
      if (loginBgFileInput) loginBgFileInput.value = '';
    } catch (err) {
      alert("Error reading image file.");
      return;
    }
  } else {
    loginBackgroundImage = (loginBgUrlInput && loginBgUrlInput.value.trim()) || '';
  }

  const settingsData = {
    name: (nameInput && nameInput.value.trim()) || 'Store Name',
    tagline: (taglineInput && taglineInput.value.trim()) || 'Quality products delivered fast.',
    loginBackgroundImage
  };

  try {
    const settingsRef = collection(db, 'storeSettings');
    const existingDocs = await getDocs(settingsRef);
    
    if (!existingDocs.empty) {
      // Update existing settings
      const docId = existingDocs.docs[0].id;
      await updateDoc(doc(db, 'storeSettings', docId), settingsData);
    } else {
      // Create new settings document
      await setDoc(doc(db, 'storeSettings', 'default'), settingsData);
    }
    
    alert('Settings saved successfully!');
  } catch (e) {
    console.error("Error saving settings:", e);
    alert('Failed to save settings: ' + e.message);
  }
}

function loadStoreSettingsFields() {
  const settingsRef = collection(db, 'storeSettings');
  onSnapshot(settingsRef, (snapshot) => {
    if (!snapshot.empty) {
      const settings = snapshot.docs[0].data();
      const nameEl = document.getElementById('store-name-input');
      const taglineEl = document.getElementById('store-tagline-input');
      const loginBgUrlEl = document.getElementById('login-bg-url');

      if (nameEl) nameEl.value = settings.name || 'Store Name';
      if (taglineEl) taglineEl.value = settings.tagline || 'Quality products delivered fast.';
      if (loginBgUrlEl) loginBgUrlEl.value = settings.loginBackgroundImage || '';
    }
  });
}

// ========== MARQUEE MANAGEMENT ==========
async function saveMarqueeMessage() {
  const input = document.getElementById('marquee-text-input');
  const message = input ? input.value.trim() : 'You are welcome';

  try {
    const marqueeRef = collection(db, 'marqueeMessage');
    const existingDocs = await getDocs(marqueeRef);
    
    if (!existingDocs.empty) {
      // Update existing message
      const docId = existingDocs.docs[0].id;
      await updateDoc(doc(db, 'marqueeMessage', docId), { text: message });
    } else {
      // Create new message document
      await setDoc(doc(db, 'marqueeMessage', 'default'), { text: message });
    }
    
    alert('Marquee updated successfully!');
  } catch (e) {
    console.error("Error saving marquee:", e);
    alert('Failed to save marquee: ' + e.message);
  }
}

function loadAdminMarqueeInput() {
  const marqueeRef = collection(db, 'marqueeMessage');
  onSnapshot(marqueeRef, (snapshot) => {
    const input = document.getElementById('marquee-text-input');
    if (input && !snapshot.empty) {
      input.value = snapshot.docs[0].data().text || 'You are welcome';
    }
  });
}

// ========== IMAGE FILE HANDLING ==========
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function handleImageSourceChange(source) {
  const urlInput = document.getElementById('prod-image-url');
  const fileInput = document.getElementById('prod-image-file');
  const urlGroup = document.getElementById('url-input-group');
  const fileGroup = document.getElementById('file-input-group');

  if (source === 'url') {
    if (urlGroup) urlGroup.style.display = 'block';
    if (fileGroup) fileGroup.style.display = 'none';
    if (fileInput) fileInput.value = '';
  } else {
    if (urlGroup) urlGroup.style.display = 'none';
    if (fileGroup) fileGroup.style.display = 'block';
    if (urlInput) urlInput.value = '';
  }
}

// ========== WINDOW EXPORTS ==========
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.handleAddProduct = handleAddProduct;
window.saveStoreSettings = saveStoreSettings;
window.saveMarqueeMessage = saveMarqueeMessage;
window.deleteProduct = deleteProduct;
window.toggleStock = toggleStock;
window.handleImageSourceChange = handleImageSourceChange;

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
  checkAuthState();
});

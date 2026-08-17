const ADMIN_USER = "Admin";
const ADMIN_PASS = "12345";

const defaultStoreSettings = {
  name: "Store Name",
  tagline: "Quality products delivered fast to your doorstep.",
  loginBackgroundImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80"
};

const defaultProducts = [
  {
    id: 1,
    name: "Digital Drawing Tablet with Stylus",
    category: "Computer Accessories",
    price: 43952,
    originalPrice: 71570,
    description: "High precision drawing pad with battery-free stylus.",
    color: "Black",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    inStock: true
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    category: "Phone",
    price: 980000,
    originalPrice: 1180000,
    description: "Premium smartphone with A17 Pro chip and titanium finish.",
    color: "Natural Titanium",
    image: "https://images.unsplash.com/photo-1678652878683-1b0cdef9c41d?auto=format&fit=crop&w=900&q=80",
    inStock: true
  },
  {
    id: 3,
    name: "Apple Watch Series 9",
    category: "Smartwatch",
    price: 560000,
    originalPrice: 670000,
    description: "Fitness-ready smartwatch with a bright OLED display.",
    color: "Silver",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
    inStock: true
  },
  {
    id: 4,
    name: "AirPods Pro 2",
    category: "AirPods",
    price: 260000,
    originalPrice: 320000,
    description: "Noise-cancelling wireless earbuds with spatial audio.",
    color: "White",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=900&q=80",
    inStock: true
  },
  {
    id: 5,
    name: "Aviator Sunglasses",
    category: "Sunglasses",
    price: 72000,
    originalPrice: 98000,
    description: "Polarized style shades built for comfort and UV protection.",
    color: "Black",
    image: "https://images.unsplash.com/photo-1577803947579-9f5d4f69ea1d?auto=format&fit=crop&w=900&q=80",
    inStock: true
  },
  {
    id: 6,
    name: "Wireless Mechanical Keyboard",
    category: "Computer Accessories",
    price: 180000,
    originalPrice: 240000,
    description: "Responsive wireless keyboard with customizable RGB lighting.",
    color: "Black",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80",
    inStock: true
  },
  {
    id: 7,
    name: "14-inch UltraBook Pro",
    category: "Laptops",
    price: 1450000,
    originalPrice: 1700000,
    description: "Lightweight laptop with all-day battery and high performance.",
    color: "Space Gray",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
    inStock: true
  },
  {
    id: 8,
    name: "Studio Wireless Headphones",
    category: "Audio",
    price: 310000,
    originalPrice: 390000,
    description: "Immersive sound and deep bass for work and travel.",
    color: "Midnight Blue",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
    inStock: true
  }
];

let products = JSON.parse(localStorage.getItem('products')) || defaultProducts;
if (!localStorage.getItem('products')) {
  localStorage.setItem('products', JSON.stringify(products));
}

document.addEventListener("DOMContentLoaded", () => {
  checkAuthState();
  loadAdminMarqueeInput();
  loadStoreSettingsFields();
});

function applyLoginBackground() {
  const settings = JSON.parse(localStorage.getItem('storeSettings')) || defaultStoreSettings;
  const bg = settings.loginBackgroundImage || settings.backgroundImage || defaultStoreSettings.loginBackgroundImage;
  const pageBody = document.body;

  if (!pageBody) return;
  pageBody.style.backgroundImage = `linear-gradient(rgba(15, 23, 42, 0.38), rgba(15, 23, 42, 0.38)), url("${bg}")`;
  pageBody.style.backgroundSize = 'cover';
  pageBody.style.backgroundPosition = 'center';
  pageBody.style.backgroundAttachment = 'fixed';
  pageBody.style.backgroundRepeat = 'no-repeat';
}

function loadStoreSettingsFields() {
  const settings = JSON.parse(localStorage.getItem('storeSettings')) || defaultStoreSettings;
  const nameEl = document.getElementById('store-name-input');
  const taglineEl = document.getElementById('store-tagline-input');
  const loginBgUrlEl = document.getElementById('login-bg-url');

  if (nameEl) nameEl.value = settings.name || defaultStoreSettings.name;
  if (taglineEl) taglineEl.value = settings.tagline || defaultStoreSettings.tagline;
  if (loginBgUrlEl) loginBgUrlEl.value = settings.loginBackgroundImage || defaultStoreSettings.loginBackgroundImage;

  applyLoginBackground();
}

function saveStoreSettings() {
  const nameInput = document.getElementById('store-name-input');
  const taglineInput = document.getElementById('store-tagline-input');
  const loginBgUrlInput = document.getElementById('login-bg-url');
  const loginBgFileInput = document.getElementById('login-bg-file');

  const existingSettings = JSON.parse(localStorage.getItem('storeSettings')) || defaultStoreSettings;
  let loginBackgroundImage = (loginBgUrlInput && loginBgUrlInput.value.trim()) || existingSettings.loginBackgroundImage || defaultStoreSettings.loginBackgroundImage;

  const handleSave = () => {
    const updatedSettings = {
      name: (nameInput && nameInput.value.trim()) || defaultStoreSettings.name,
      tagline: (taglineInput && taglineInput.value.trim()) || defaultStoreSettings.tagline,
      loginBackgroundImage
    };

    localStorage.setItem('storeSettings', JSON.stringify(updatedSettings));
    alert('Settings saved successfully!');

    const liveStore = document.querySelector('[data-store-name]');
    const liveTagline = document.querySelector('[data-store-tagline]');
    if (liveStore) liveStore.textContent = updatedSettings.name;
    if (liveTagline) liveTagline.textContent = updatedSettings.tagline;

    applyLoginBackground();
  };

  if (loginBgFileInput && loginBgFileInput.files && loginBgFileInput.files[0]) {
    const file = loginBgFileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      loginBackgroundImage = reader.result || loginBackgroundImage;
      handleSave();
      if (loginBgFileInput) loginBgFileInput.value = '';
    };
    reader.readAsDataURL(file);
    return;
  }

  handleSave();
}

function checkAuthState() {
  const isLoggedIn = sessionStorage.getItem("isAdminLoggedIn") === "true";
  const loginSection = document.getElementById("login-section");
  const adminDashboard = document.getElementById("admin-dashboard");

  if (isLoggedIn) {
    if (loginSection) loginSection.classList.add("hidden");
    if (adminDashboard) adminDashboard.classList.remove("hidden");
    renderAdminProducts();
  } else {
    if (loginSection) loginSection.classList.remove("hidden");
    if (adminDashboard) adminDashboard.classList.add("hidden");
  }
}

function handleLogin(event) {
  event.preventDefault();
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    sessionStorage.setItem("isAdminLoggedIn", "true");
    checkAuthState();
  } else {
    alert("Invalid username or password!");
  }
}

function handleLogout() {
  sessionStorage.removeItem("isAdminLoggedIn");
  checkAuthState();
}

// Marquee Control Functions
function loadAdminMarqueeInput() {
  const input = document.getElementById("marquee-text-input");
  if (input) {
    input.value = localStorage.getItem("marqueeMessage") || "You are welcome";
  }
}

function saveMarqueeMessage() {
  const input = document.getElementById("marquee-text-input");
  if (!input) return;
  const val = input.value.trim() || "You are welcome";
  localStorage.setItem("marqueeMessage", val);
  alert("Marquee message updated successfully!");
}

// Image Source Dropdown Switching Logic
function handleImageSourceChange(value) {
  const urlContainer = document.getElementById('url-input-container');
  const fileContainer = document.getElementById('file-input-container');

  if (value === 'url') {
    urlContainer.classList.remove('hidden');
    fileContainer.classList.add('hidden');
    document.getElementById('prod-image-file').value = '';
  } else {
    fileContainer.classList.remove('hidden');
    urlContainer.classList.add('hidden');
    document.getElementById('prod-image-url').value = '';
  }
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

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
    id: Date.now(),
    name,
    category,
    price,
    originalPrice,
    color,
    description,
    image: imageSrc,
    inStock: true
  };

  try {
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    
    document.getElementById('add-product-form').reset();
    handleImageSourceChange('url');
    renderAdminProducts();
    alert('Product added successfully!');
  } catch (e) {
    alert('Storage limit reached! Please use Image URLs.');
    products.pop();
  }
}

function renderAdminProducts() {
  const tableBody = document.getElementById('admin-product-table');
  if (!tableBody) return;

  tableBody.innerHTML = '';

  if (products.length === 0) {
    // Note: colspan set to 7 to match the updated number of columns
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">No products in inventory.</td></tr>`;
    return;
  }

  products.forEach(p => {
    tableBody.innerHTML += `
      <tr>
        <td><img src="${p.image}" class="admin-thumb" alt="${p.name}"></td>
        <td><strong>${p.name}</strong></td>
        <td>${p.category || 'N/A'}</td>
        <td style="max-width: 200px; font-size: 12px; color: #555;">
          ${p.description ? p.description : '<em style="color:#999;">No description</em>'}
        </td>
        <td>₦${Number(p.price).toLocaleString()}</td>
        <td>
          <span style="color: ${p.inStock ? 'green' : 'red'}; font-weight: bold;">
            ${p.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </td>
        <td>
          <button class="toggle-btn" onclick="toggleStock(${p.id})">Toggle Stock</button>
          <button class="delete-btn" onclick="deleteProduct(${p.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function toggleStock(id) {
  products = products.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p);
  localStorage.setItem('products', JSON.stringify(products));
  renderAdminProducts();
}

function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    products = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    renderAdminProducts();
  }
}
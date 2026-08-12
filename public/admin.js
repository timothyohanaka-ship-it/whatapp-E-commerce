const ADMIN_USER = "Admin";
const ADMIN_PASS = "12345";

const defaultProducts = [
  {
    id: 1,
    name: "Digital Drawing Tablet with Stylus",
    category: "Computer Accessories",
    price: 43952,
    originalPrice: 71570,
    description: "High precision drawing pad with battery-free stylus.",
    color: "Black",
    image: "https://via.placeholder.com/300",
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
});

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
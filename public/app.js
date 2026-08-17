// Firebase Auth Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

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

// User Authentication Listener
document.addEventListener("DOMContentLoaded", () => {
  const userNameSpan = document.getElementById('user-display-name');
  const logoutBtn = document.getElementById('logout-btn');
  const signinLink = document.getElementById('signin-link');

  onAuthStateChanged(auth, (user) => {
    if (user && userNameSpan) {
      // Get user's display name or use email as fallback
      const displayName = user.displayName || user.email.split('@')[0];
      userNameSpan.innerText = `welcome, ${displayName}`;
      if (logoutBtn) logoutBtn.style.display = 'inline-block';
      if (signinLink) signinLink.style.display = 'none';
    } else {
      if (userNameSpan) userNameSpan.innerText = '';
      if (logoutBtn) logoutBtn.style.display = 'none';
      if (signinLink) signinLink.style.display = 'inline-block';
    }
  });

  // Logout Functionality
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      signOut(auth).then(() => {
        window.location.href = "index.html";
      }).catch((error) => {
        console.error("Signout Error:", error);
      });
    });
  }
});
// MUST BE IN INTERNATIONAL FORMAT WITHOUT '+' OR DASHES
const PHONE_NUMBER = "2349099772189"; 

const defaultProducts = [
  {
    id: 1,
    name: "Digital Drawing Tablet with Stylus",
    category: "Computer Accessories",
    price: 43952,
    originalPrice: 71570,
    description: "High precision drawing pad with battery-free stylus.",
    color: "Black",
    sales: "3.8K+ sold",
    rating: "★ 4.5",
    badge: "Battery-Free Pen",
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
    sales: "2.1K+ sold",
    rating: "★ 4.8",
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1678652878683-1b0cdef9c41d?auto=format&fit=crop&w=900&q=80",
    inStock: true
  },
  {
    id: 3,
    name: "Apple Watch Series 9",
    category: "Smartwatch",
    price: 560000,
    originalPrice: 670000,
    description: "Fitness-ready smartwatch with customizable watch faces.",
    color: "Silver",
    sales: "1.7K+ sold",
    rating: "★ 4.7",
    badge: "New Arrival",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
    inStock: true
  },
  {
    id: 4,
    name: "AirPods Pro 2",
    category: "AirPods",
    price: 260000,
    originalPrice: 320000,
    description: "Noise cancelling wireless earbuds with premium sound.",
    color: "White",
    sales: "4.6K+ sold",
    rating: "★ 4.9",
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=900&q=80",
    inStock: true
  },
  {
    id: 5,
    name: "Aviator Sunglasses",
    category: "Sunglasses",
    price: 72000,
    originalPrice: 98000,
    description: "Stylish polarized shades for everyday comfort and UV protection.",
    color: "Black",
    sales: "860 sold",
    rating: "★ 4.5",
    badge: "UV Protected",
    image: "https://images.unsplash.com/photo-1577803947579-9f5d4f69ea1d?auto=format&fit=crop&w=900&q=80",
    inStock: true
  },
  {
    id: 6,
    name: "Wireless Mechanical Keyboard",
    category: "Computer Accessories",
    price: 180000,
    originalPrice: 240000,
    description: "Low-latency wireless keyboard for desk setups and gaming.",
    color: "Black",
    sales: "1.2K+ sold",
    rating: "★ 4.6",
    badge: "RGB Lighting",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80",
    inStock: true
  },
  {
    id: 7,
    name: "14-inch UltraBook Pro",
    category: "Laptops",
    price: 1450000,
    originalPrice: 1700000,
    description: "Portable powerhouse laptop with all-day battery life.",
    color: "Space Gray",
    sales: "950 sold",
    rating: "★ 4.8",
    badge: "Ultra Thin",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
    inStock: true
  },
  {
    id: 8,
    name: "Studio Wireless Headphones",
    category: "Audio",
    price: 310000,
    originalPrice: 390000,
    description: "Immersive sound, deep bass, and long battery life.",
    color: "Midnight Blue",
    sales: "1.9K+ sold",
    rating: "★ 4.7",
    badge: "Bass Boost",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
    inStock: true
  }
];

let products = JSON.parse(localStorage.getItem('products')) || defaultProducts;
if (!localStorage.getItem('products')) {
  localStorage.setItem('products', JSON.stringify(products));
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedCategory = 'All';

function syncProductsFromStorage() {
  const savedProducts = JSON.parse(localStorage.getItem('products'));
  if (Array.isArray(savedProducts) && savedProducts.length) {
    products = savedProducts;
    renderProducts();
  }
}

function syncStoreState() {
  syncProductsFromStorage();
  loadStoreSettings();
  loadMarqueeMessage();
  updateCartBadge();
}

const defaultStoreSettings = {
  name: 'Store Name',
  tagline: 'Quality products delivered fast to your doorstep.'
};

function normalizeCategory(value) {
  return (value || '').toLowerCase().trim();
}

function loadStoreSettings() {
  const settings = JSON.parse(localStorage.getItem('storeSettings')) || defaultStoreSettings;
  const name = settings.name || defaultStoreSettings.name;
  const tagline = settings.tagline || defaultStoreSettings.tagline;

  document.querySelectorAll('[data-store-name]').forEach(el => {
    const text = el.dataset.storeNameOverride || name;
    el.textContent = text;
  });

  document.querySelectorAll('[data-store-tagline]').forEach(el => {
    el.textContent = tagline;
  });

  const pageTitle = document.title;
  if (pageTitle && pageTitle !== 'WhatsApp Storefront') {
    document.title = name;
  }
}

// Load Marquee Text from LocalStorage
function loadMarqueeMessage() {
  const savedMessage = localStorage.getItem('marqueeMessage');
  const marqueeEl = document.getElementById('store-marquee');
  if (marqueeEl) {
    marqueeEl.innerText = savedMessage || "You are welcome";
  }
}

function filterCategory(category) {
  selectedCategory = category;
  const selectedValue = normalizeCategory(category);

  document.querySelectorAll('.category-btn').forEach(btn => {
    const btnValue = normalizeCategory(btn.dataset.category || btn.textContent);
    const isActive = selectedValue === 'all'
      ? btnValue === 'all'
      : btnValue === selectedValue || btnValue.replace(/s$/, '') === selectedValue || btnValue === selectedValue.replace(/s$/, '');

    btn.classList.toggle('active', isActive);
  });

  renderProducts();
}

function renderProducts() {
  const searchInput = document.getElementById('search');
  const search = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const list = document.getElementById('product-list');
  if (!list) return;
  
  list.innerHTML = '';

  const filtered = products.filter(p => {
    const prodCat = normalizeCategory(p.category);
    const selCat = normalizeCategory(selectedCategory);

    const matchesCategory = selCat === 'all' ||
      prodCat === selCat ||
      prodCat.startsWith(selCat) ||
      selCat.startsWith(prodCat) ||
      prodCat.replace(/s$/, '') === selCat ||
      selCat.replace(/s$/, '') === prodCat;

    const matchesSearch = (p.name || '').toLowerCase().includes(search);
    return p.inStock && matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    list.innerHTML = `<div class="no-products">No products found in this category.</div>`;
    return;
  }

  filtered.forEach(p => {
    list.innerHTML += `
      <div class="card">
        <div class="card-image-wrapper">
          <img src="${p.image || 'https://via.placeholder.com/300'}" alt="${p.name}">
          ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
          ${p.description ? `<div class="card-hover-desc">${p.description}</div>` : ''}
        </div>
        <div class="card-body">
          <h3 class="card-title">${p.name}</h3>
          ${p.description ? `<p class="card-desc">${p.description}</p>` : ''}
          ${p.color ? `<span class="card-color-tag">Color: ${p.color}</span>` : ''}
          <div class="price-container">
            <span class="price-current">₦${Number(p.price).toLocaleString()}</span>
            ${p.originalPrice ? `<span class="price-original">₦${Number(p.originalPrice).toLocaleString()}</span>` : ''}
          </div>
          <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    `;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  
  const cartItem = cart.find(item => item.id === id);
  if (cartItem) {
    cartItem.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCartBadge();
}

function updateQty(id, change) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += change;
    if (item.qty <= 0) {
      removeFromCart(id);
      return;
    }
  }
  saveCart();
  renderCart();
  updateCartBadge();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
  updateCartBadge();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById('cart-count');
  if (badge) badge.innerText = totalCount;
}

function toggleCartView() {
  document.getElementById('store-view').classList.toggle('hidden');
  document.getElementById('cart-view').classList.toggle('hidden');
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cart-items');
  if (!container) return;
  container.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = `<p style="text-align:center; padding: 20px 0; color: #666;">Your cart is empty.</p>`;
    document.getElementById('cart-total').innerText = `Total: ₦0`;
    return;
  }

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    container.innerHTML += `
      <div class="cart-item">
        <div style="display:flex; align-items:center; gap:10px;">
          <img src="${item.image}" class="cart-thumb">
          <div>
            <h4 style="font-size: 14px; margin-bottom: 2px;">${item.name}</h4>
            <p style="font-size: 11px; color: #666;">Color: ${item.color || 'N/A'}</p>
            <p style="color: #e61d2b; font-weight: bold; font-size: 13px;">₦${Number(item.price).toLocaleString()}</p>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="qty-controls">
            <button onclick="updateQty(${item.id}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="updateQty(${item.id}, 1)">+</button>
          </div>
          <button class="remove-item-btn" onclick="removeFromCart(${item.id})">✕</button>
        </div>
      </div>
    `;
  });

  document.getElementById('cart-total').innerText = `Total: ₦${total.toLocaleString()}`;
}

function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "Hello! I would like to place an order:\n\n";
  let grandTotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    grandTotal += itemTotal;

    message += `*Item ${index + 1}:*\n`;
    message += `• *Name:* ${item.name}\n`;
    message += `• *Price:* ₦${Number(item.price).toLocaleString()} x${item.qty} = ₦${itemTotal.toLocaleString()}\n`;
    message += `• *Color:* ${item.color || 'N/A'}\n\n`;
  });

  message += `*GRAND TOTAL:* ₦${grandTotal.toLocaleString()}`;
  const cleanNumber = PHONE_NUMBER.replace(/[^0-9]/g, '');

  if (!cleanNumber) {
    alert('WhatsApp number is not configured yet.');
    return;
  }

  window.location.href = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(message)}`;
}

window.filterCategory = filterCategory;
window.renderProducts = renderProducts;
window.addToCart = addToCart;
window.updateQty = updateQty;
window.removeFromCart = removeFromCart;
window.toggleCartView = toggleCartView;
window.checkoutWhatsApp = checkoutWhatsApp;
window.addEventListener('storage', (event) => {
  if (event.key === 'products' || event.key === 'storeSettings' || event.key === 'marqueeMessage') {
    syncStoreState();
  }
});

setInterval(() => {
  const savedProducts = JSON.parse(localStorage.getItem('products'));
  if (Array.isArray(savedProducts) && JSON.stringify(savedProducts) !== JSON.stringify(products)) {
    products = savedProducts;
    renderProducts();
  }
}, 3000);

// Initialization
loadStoreSettings();
loadMarqueeMessage();
renderProducts();
updateCartBadge();
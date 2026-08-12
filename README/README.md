<!-- SECTION 1: index.html Breakdown -->


1. Document Setup (<!DOCTYPE html> & <head>)
<!DOCTYPE html>: Tells the web browser that this document is written in modern HTML5.

<html lang="en">: The root wrapper element for the entire page. lang="en" tells browsers and search engines the page is in English.

<head>: Holds invisible settings, metadata, and external file links used by the page.

<meta charset="UTF-8">: Sets character encoding so symbols, emojis, and special characters display correctly.

<meta name="viewport" content="width=device-width, initial-scale=1.0">: Ensures the page scales properly and looks responsive on mobile phones.

<title>: Sets the title text shown on the browser tab.

<link rel="stylesheet" href="styles.css">: Connects your HTML page to your CSS stylesheet (styles.css).

2. Header & Navigation Bar (<header>)
<header class="main-header">: Semantic container holding the top navigation bar.

<div class="logo-container">: A division container used to group and center the logo image.

<img src="logo.png" alt="Store Logo" class="site-logo">: Displays an image.

src: Path to the image file.

alt: Descriptive text if the image fails to load.

<div class="marquee-container">: Container styling the moving announcement banner.

<marquee id="store-marquee" behavior="scroll" direction="left" scrollamount="5">: HTML element that scrolls text across the screen.

id="store-marquee": Unique name used by app.js to dynamically change the welcome text.

behavior="scroll": Makes text move continuously across.

direction="left": Direction the text moves toward.

scrollamount="5": Speed of movement.

<div class="header-actions">: Holds the action buttons on the right side of the navbar.

<button class="cart-icon-btn" onclick="toggleCartView()">: Button opening the shopping cart view when clicked.

onclick: JavaScript event handler that triggers the toggleCartView() function.

<span class="cart-badge" id="cart-count">0</span>: Small badge displaying the total item count inside the cart. id="cart-count" is updated dynamically by app.js.

<a href="admin.html" class="admin-link">: Anchor tag creating a clickable hyperlink to admin.html.

3. Main Store Content (<main id="store-view">)
<main id="store-view">: The central content wrapper holding products and filters. id="store-view" lets JavaScript hide this section when the cart opens.

<div class="category-tabs">: Flexbox container holding filter buttons.

<button class="category-btn active" onmouseenter="filterCategory('All')" onclick="filterCategory('All')">: Category button.

class="category-btn active": Indicates styling for category buttons (active highlights the currently selected tab).

onmouseenter: Triggers category filtering when a mouse hovers over the button.

onclick: Triggers category filtering when clicked on mobile/touch screens.

<input type="text" id="search" class="search-bar" placeholder="..." onkeyup="renderProducts()">: Text input for searching products.

type="text": Standard text input field.

placeholder: Ghost text inside the input explaining what to type.

onkeyup: Listens for key presses and triggers renderProducts() instantly as you type.

<div class="grid" id="product-list"></div>: Empty container where app.js injects generated product cards dynamically.

4. Shopping Cart Drawer (<section id="cart-view">)
<section id="cart-view" class="cart-section hidden">: Wrapper holding cart details.

id="cart-view": Used by JS to toggle visibility.

class="cart-section hidden": Uses CSS .hidden { display: none; } to remain invisible by default.

<h2>: Header tag displaying section title ("Your Cart").

<div id="cart-items"></div>: Empty container populated with cart item rows by app.js.

<h3 id="cart-total">: Header element displaying calculated order total.

<button class="checkout-btn" onclick="checkoutWhatsApp()">: Triggers the WhatsApp checkout process.

5. Page Footer (<footer class="site-footer">)
<footer class="site-footer">: Semantic element wrapping bottom credits and social links.

<a href="..." target="_blank">: Hyperlink opening in a new browser tab (target="_blank").

<script src="app.js"></script>: Loads JavaScript functionality after HTML tags render.



<!-- SECTION 2: admin.html Breakdown -->


1. Login View (<main id="login-section">)
<main id="login-section" class="form-section admin-login-card">: Card container displaying the login interface before authentication.

<form id="login-form" onsubmit="handleLogin(event)">: Form element handling authentication.

onsubmit: Intercepts form submission and executes handleLogin(event).

<input type="text" id="username" placeholder="Username" required>: Username text input. required prevents submitting empty fields.

<input type="password" id="password" placeholder="Password" required>: Password input hiding characters on entry.

<a href="index.html" class="back-home-btn">: Link letting visitors easily return to the store homepage.

2. Admin Dashboard View (<main id="admin-dashboard">)
<main id="admin-dashboard" class="hidden">: Main admin console, hidden until valid credentials are provided.

<header class="admin-header">: Top navigation bar inside the dashboard.

<a href="index.html" target="_blank" class="store-link-btn">: Opens live storefront in a new tab for testing.

<button onclick="handleLogout()" class="logout-btn">: Triggers handleLogout() to clear sessions and log out.

<input type="text" id="marquee-text-input">: Input box allowing the admin to type custom marquee text.

<button onclick="saveMarqueeMessage()">: Saves the typed text to localStorage.

3. Add Product Form & Dropdown Ingestion
<select id="prod-category" required>: Dropdown menu forcing users to pick a category.

<option value="Phone">Phone</option>: Selectable choices inside a <select> menu. value is sent to JavaScript.

<select id="image-source-dropdown" onchange="handleImageSourceChange(this.value)">: Dropdown selecting image upload mode. onchange fires whenever a new option is chosen.

<div id="url-input-container">: Holds URL input box.

<div id="file-input-container" class="hidden">: Holds local file picker input (<input type="file" accept="image/*">).

accept="image/*": Restricts file selection exclusively to image formats (.jpg, .png, .webp, etc.).

<textarea id="prod-desc">: Multi-line text field used for entering longer product descriptions.

4. Admin Inventory Catalog Table (<table>)
<table>: Creates a structured tabular layout.

<thead>: Groups header rows (<tr>).

<th>: Table header cell defining column titles (Image, Name, Category, Description, Price, Status, Actions).

<tbody id="admin-product-table"></tbody>: Empty body element where admin.js renders product rows (<tr>) and cells (<td>).



<!-- SECTION 3: app.js Variables & Functions Breakdown -->


1. Variables Explained
PHONE_NUMBER: Holds your target WhatsApp phone number formatted string.

defaultProducts: Array holding seed product objects used when localStorage is empty.

products: Stores the active catalog array retrieved via JSON.parse(localStorage.getItem('products')).

cart: Array storing cart item objects saved under localStorage.getItem('cart').

selectedCategory: String keeping track of the currently active category filter tab (defaults to 'All').

2. Functions Explained
loadMarqueeMessage(): Reads localStorage.getItem('marqueeMessage') and updates #store-marquee.

filterCategory(category): Updates selectedCategory, applies active button styling, and re-renders the grid.

renderProducts(): Filters products using selectedCategory and search input text, generating HTML product cards dynamically.

addToCart(id): Searches products by id, increments quantity if present, or pushes a new object into cart.

updateQty(id, change): Increases or decreases item quantities inside the cart array.

removeFromCart(id): Filters out an item by id from cart.

saveCart(): Converts cart array to string (JSON.stringify) and commits it to localStorage.

updateCartBadge(): Calculates the total item sum in cart and updates #cart-count.

toggleCartView(): Swaps visibility between #store-view and #cart-view.

renderCart(): Generates HTML markup for items inside #cart-items and computes order totals.

checkoutWhatsApp(): Encodes order summary into URL-safe text (encodeURIComponent) and redirects to api.whatsapp.com.




<!-- SECTION 4: admin.js Variables & Functions Breakdown -->


1. Variables Explained
ADMIN_USER: Stores the required login username ("admin").

ADMIN_PASS: Stores the required login password ("12345").

products: Product array linked directly to localStorage.getItem('products').

2. Functions Explained
checkAuthState(): Checks sessionStorage.getItem("isAdminLoggedIn"). Shows #admin-dashboard if true; displays #login-section if false.

handleLogin(event): Validates form input against ADMIN_USER and ADMIN_PASS, updates sessionStorage, and refreshes view state.

handleLogout(): Clears sessionStorage and returns user to login view.

loadAdminMarqueeInput(): Pre-fills input box #marquee-text-input with existing stored marquee text.

saveMarqueeMessage(): Saves input value to localStorage.getItem("marqueeMessage").

handleImageSourceChange(value): Shows or hides input containers (#url-input-container vs #file-input-container) based on dropdown selection.

readFileAsDataURL(file): Uses JavaScript FileReader API inside an asynchronous Promise to convert uploaded image files into reusable Base64 data strings.

handleAddProduct(event): Processes form inputs, extracts image URL or Base64 file string, creates new product object with timestamp ID (Date.now()), updates localStorage, and calls renderAdminProducts().

renderAdminProducts(): Generates table rows (<tr>) inside #admin-product-table displaying product information (including the Description column).

toggleStock(id): Flips inStock boolean between true and false for a specific product.

deleteProduct(id): Confirms action with a dialog box, filters out selected product from array, and updates localStorage
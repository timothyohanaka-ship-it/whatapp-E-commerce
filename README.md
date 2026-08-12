# Responsive WhatsApp E-Commerce Storefront

A lightweight, fully responsive e-commerce web application with dynamic category filtering, a local storage shopping cart, WhatsApp checkout integration, and a protected admin portal.

## Features Overview

### Storefront (`index.html` & `app.js`)
* **Live Marquee Welcome Banner:** Displays custom announcements configured in the admin dashboard.
* **Category Filtering & Search:** Filter catalog by item type or live text query.
* **Shopping Cart & WhatsApp Checkout:** Aggregates item totals and formats order payloads directly to WhatsApp API (`2349099772189`).

### Admin Dashboard (`admin.html` & `admin.js`)
* **Access Control & Navigation:** Login-protected interface (`Admin`/`12345`) featuring a "Back to Store" exit link on the login screen.
* **Live Marquee Manager:** Update homepage marquee text stored via `localStorage`.
* **Flexible Image Ingestion:** Choose between **Image URL** links or **Local File Uploads** via a dynamic dropdown selector.
* **Inventory Catalog Table:** Interactive product list displaying product image, title, category, description, price, stock status, and delete/stock toggle controls.

## Project Structure
```text
├── index.html        # Main Storefront Layout
├── app.js            # Store Logic, Cart, Search, & WhatsApp Integration
├── admin.html        # Admin Login & Dashboard UI
├── admin.js          # Auth, Inventory Management, & Marquee Logic
├── styles.css        # Global Responsive Stylesheet
└── README.md         # Project Documentation



1. Storefront (index.html) — The Shop Window
Think of index.html like a physical store window. It sets up the layout and empty spots where everything goes:

The Header & Logo: Shows your store brand at the top.

The Marquee Banner: A moving text strip right next to your logo that welcomes customers.

Category Tabs & Search Bar: Simple buttons for customers to filter items (Phones, Smartwatches, etc.) or search by typing.

Product Grid: An empty space where products automatically display as cards.

Shopping Cart & Checkout: A hidden side area that opens when a customer clicks the cart icon to review items and hit the WhatsApp checkout button.

Footer: Displays your store details and social media links at the bottom.




2. Store Logic (app.js) — The Shop Manager
app.js is like an invisible worker running around behind the scenes to keep the store running smoothly:

Remembers Products & Cart: It reads your stored products and shopping cart using your browser's memory (localStorage).

Runs the Moving Banner: It fetches whatever welcome text you typed in the Admin panel and displays it in the marquee banner.

Handles Filtering: When a customer clicks "Phones", it hides all non-phone products and displays only phone items.

Calculates the Cart: When a customer clicks "Add to Cart", it updates the total price, counts the items, and updates the cart icon badge.

Sends Orders to WhatsApp: When a customer clicks "Checkout on WhatsApp", app.js formats all cart items into a clear text message and opens WhatsApp with your pre-configured phone number.




3. Admin Page (admin.html) — The Back Office Door
admin.html is the private back office of your store. It has two main screens:

The Login Screen: Protects your dashboard with a username and password (admin / 12345). It includes a "← Back to Store Home" link so customers who land there by accident can return to the main shop.

The Dashboard Screen: Unlocks after logging in. It gives you forms to add new products, control your homepage marquee message, and manage your inventory table.




4. Admin Logic (admin.js) — The Manager's Assistant
admin.js handles the rules and data updates inside the back office:

Security Check: Verifies your password and keeps you logged in using sessionStorage. Once logged in, it hides the login box and "Back to Home" button automatically.

Welcome Text Manager: Lets you type a custom announcement, saves it, and sends it straight to the storefront marquee.

Image Selector: Lets you pick how to add a product image via a dropdown:

Image URL: Paste a link from the web.

Upload File: Picks a photo directly from your computer, turns it into data code (Base64), and saves it to the store memory.

Inventory Catalog Table: Displays all items in a neat table showing their image, name, category, full description, price, and stock status. It allows you to toggle items in/out of stock or delete them with one click.
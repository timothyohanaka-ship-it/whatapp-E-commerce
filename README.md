# 🛍️ WhatsApp E-Commerce Storefront

A lightweight, fully responsive e-commerce application built for small businesses to sell products via WhatsApp. Customers browse, add to cart, and checkout directly through WhatsApp messages—no external payment processing needed.

**Built with:** HTML5 • CSS3 • Vanilla JavaScript • Firebase Authentication • Browser localStorage

---

## ✨ Key Features

### 🏪 Customer Storefront
- **Live Category Filtering:** Browse products by category (Phones, Smartwatches, Laptops, etc.)
- **Responsive Shopping Cart:** Add/remove items, adjust quantities
- **WhatsApp Checkout:** One-click order delivery to WhatsApp Business number
- **Customizable Marquee Banner:** Real-time announcements from admin
- **Mobile Optimized:** Fully responsive on phones, tablets, and desktops

### 🛠️ Admin Dashboard
- **Inventory Management:** Add, edit, delete products with images, prices, categories
- **Product Images:** Upload local images or link from URL
- **Stock Tracking:** Monitor remaining quantities per item
- **Branding Control:** Change store name, tagline, login background image
- **Marquee Editor:** Update the welcome announcement instantly
- **Protected Access:** Admin login (`Admin` / `12345`)

### 🔐 Authentication
- **Google Sign-In** ✅ (working)
- **Email/Password Login** ✅ (working)
- **Apple Sign-In** (requires Firebase + Apple Developer setup)
- **Password Reset:** Email-based recovery

---

## 🚀 Quick Start

### Option 1: Open Locally (File-Based)
1. Clone or download the repository
2. Open `public/home.html` in your browser
3. Click "Admin" link in the header → Login with `Admin` / `12345`
4. Start customizing!

**Note:** Authentication (Google/Apple) requires a server or Firebase Hosting. File URLs won't work for sign-in.

### Option 2: Run on Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if installed)
npx http-server

# Using PHP
php -S localhost:8000
```
Then open: `http://localhost:8000/public/home.html`

---

## 📋 Admin Dashboard Guide

### Login & First Steps
1. Click the **Admin** link in the top-right corner of the storefront
2. Enter credentials:
   - **Username:** `Admin`
   - **Password:** `12345`
3. Click **Log In**

### Customize Your Store
**Store Settings Section:**
- **Store Name:** Change your business name (displays in header)
- **Store Tagline:** Update the tagline below the store name
- **Login Background Image:** Add a URL or upload an image to the login page background

Click **Save Settings** after any changes.

### Manage Products
**Add a New Product:**
1. Fill in: Name, Category, Price, Original Price, Description, Color
2. Choose image source: **Image URL** or **Upload from Computer**
3. Click **Add Product**

**Edit or Delete:**
- View all products in the **Inventory Table** below
- Toggle **Stock Status** (In Stock / Out of Stock)
- Click **Delete** to remove a product

### Update Announcements
**Marquee Banner:**
1. Type your welcome message in the **Marquee Text** field
2. Click **Save** to update the homepage banner instantly

---

## 🎨 Customization Guide

### Change Store Name & Tagline
1. Go to Admin Dashboard
2. In "Store Settings," update:
   - **Store Name:** Your business name
   - **Store Tagline:** Your business motto or description
3. Click **Save Settings**
4. The changes appear instantly on the storefront header

### Update Login Page Background
1. In Admin Dashboard → **Store Settings**
2. Paste an image URL **OR** click **Upload Image**
3. Choose your image file and click **Save Settings**
4. Customers will see the new background when they sign in

### Adjust Logo & Brand Sizing
Edit `styles.css` (around line 200–250):
```css
.site-logo {
  max-width: 60px;      /* Increase to make logo bigger */
  height: auto;
}

.store-brand-name {
  font-size: 24px;      /* Increase for larger text */
  font-weight: 800;
}
```

**Mobile:** Changes near `@media (max-width: 768px)` apply to phones.

### Add Your WhatsApp Number
Edit `public/app.js` (line ~150):
```javascript
const WHATSAPP_NUMBER = "2349099772189"; // Replace with your number
```
Use format: country code (234) + number without +

### Modify Product Categories
Edit `public/app.js` around line ~80 (defaultProducts array):
```javascript
{
  name: "Your Product Name",
  category: "Your Category",    // Change category names here
  price: 50000,
  // ... rest of product data
}
```

---

## 🔐 Firebase & Apple Sign-In Setup

### Why Apple Sign-In Isn't Working Yet
The code is ready, but Apple sign-in requires:
1. Firebase Authentication enabled for Apple provider
2. Apple Developer account configuration
3. HTTPS hosting (or localhost)

### Step-by-Step Setup

#### Step 1: Enable Apple in Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **e-commance-3d365**
3. Navigate to **Authentication** → **Sign-in method**
4. Find **Apple** and click **Enable**
5. Click **Save** (don't fill the fields yet)

#### Step 2: Get Firebase Callback URL
1. While on the Apple provider settings page, look for:
   - **Authorized Domains** (copy this URL)
   - Or your Firebase domain: `e-commance-3d365.firebaseapp.com`
2. Copy this URL—you'll need it for Apple Developer

#### Step 3: Create Apple Services ID
1. Go to [Apple Developer Account](https://developer.apple.com/account)
2. Select **Certificates, Identifiers & Profiles**
3. Go to **Identifiers** → Click the **+** icon → Select **Services IDs** → Click **Continue**
4. For **Register a Services ID:**
   - **Description:** "E-Commerce Store Sign-In"
   - **Identifier:** `com.yourstore.ecommerce` (use a reverse domain format)
5. Click **Continue** → **Register** → **Done**

#### Step 4: Enable Sign in with Apple
1. In **Identifiers**, click your newly created Services ID
2. Check the box for **Sign In with Apple**
3. Click **Configure**
4. For **Web Authentication Configuration:**
   - **Primary App ID:** Select your main app (or create one first if needed)
   - **Domains & Subdomains:** Paste the Firebase domain from Step 2
   - **Return URLs:** `https://e-commance-3d365.firebaseapp.com/__/auth/handler`
5. Click **Save** → **Done**

#### Step 5: Create a Private Key
1. In **Certificates, Identifiers & Profiles**, go to **Keys**
2. Click the **+** icon → Select **Sign in with Apple**
3. **Key Name:** "E-Commerce Apple Key"
4. Check **Sign in with Apple** → Click **Configure**
5. Select your **Services ID** from Step 3
6. Click **Save** → **Continue** → **Register**
7. **Download** the private key file (`.p8`) — save it somewhere safe
8. Copy the **Key ID** and **Team ID** (shown on the key page)

#### Step 6: Add Apple Provider to Firebase
1. Return to Firebase Console → **Authentication** → **Sign-in method** → **Apple**
2. Fill in the fields:
   - **Services ID:** `com.yourstore.ecommerce` (from Step 4)
   - **Team ID:** (from Step 5, usually 10 characters)
   - **Key ID:** (from Step 5, usually 10 characters)
   - **Private Key:** Open the `.p8` file from Step 5, copy the entire content
3. Click **Save**

#### Step 7: Deploy to HTTPS
1. Option A: **Firebase Hosting** (recommended)
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   firebase deploy
   ```
2. Option B: **Vercel, Netlify, or GitHub Pages**
   - All support automatic HTTPS

#### Step 8: Test Apple Sign-In
1. Open your live site (HTTPS)
2. Click **Log in with Apple** on the login page
3. Follow Apple's prompt

---

## 🌐 Deployment Options

### Option 1: Firebase Hosting (Easiest)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to your Firebase account
firebase login

# Initialize Firebase in your project
firebase init hosting

# Deploy
firebase deploy
```
Your site will be live at: `https://e-commance-3d365.web.app`

### Option 2: Vercel (Very Easy)
1. Push your repo to GitHub
2. Go to [Vercel.com](https://vercel.com) → Click **New Project**
3. Import your GitHub repo
4. Click **Deploy**
5. Automatic HTTPS enabled

### Option 3: Netlify (Very Easy)
1. Go to [Netlify.com](https://netlify.com) → **New site from Git**
2. Connect GitHub repo
3. Deploy settings:
   - **Publish directory:** `public`
4. Click **Deploy**

### Option 4: GitHub Pages (Free)
1. Go to repo Settings → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main`, folder: `/public`
4. Save
5. Your site will be at: `https://yourusername.github.io/whatapp-E-commerce`

---

## 📁 Project Structure
```text
whatapp-E-commerce/
├── public/
│   ├── index.html          # Login & sign-in page
│   ├── signin.html         # Sign-up page
│   ├── home.html           # Customer storefront
│   ├── admin.html          # Admin dashboard
│   ├── app.js              # Storefront logic
│   ├── admin.js            # Admin logic
│   ├── styles.css          # All styles (responsive)
│   ├── logo.svg            # Default logo
│   └── picss/              # Image assets folder
├── README.md               # This file
├── firebase.json           # Firebase config
└── .gitignore              # Git ignore rules
```

---

## 🔧 Troubleshooting

### Cart Not Working?
- **Issue:** Add to cart button doesn't add items
- **Fix:** Clear browser cache, open DevTools (F12), check Console for errors

### Images Not Showing?
- **Issue:** Product images display broken
- **Fix:** Check image URL is publicly accessible, or upload local image

### Apple Sign-In Fails?
- **Issue:** "Operation not allowed" or "Invalid credentials"
- **Fix:** Follow the Apple setup guide above—Firebase Apple provider must be enabled first

### Categories Not Filtering?
- **Issue:** Category buttons don't filter products
- **Fix:** Ensure product categories match exactly (case-sensitive)

### Marquee Not Updating?
- **Issue:** Banner text doesn't change after saving
- **Fix:** Refresh the storefront page after saving in admin

---

## 💡 Pro Tips

### For Store Owner
- **Change admin password:** Edit `public/admin.js` line 1 (`ADMIN_PASS`)
- **Update WhatsApp number:** Edit `public/app.js` line ~150 (`WHATSAPP_NUMBER`)
- **Add more categories:** Add new product categories in admin, they appear automatically
- **Bulk import products:** Manually add products through the admin dashboard one by one

### For Developers
- All data is stored in `localStorage`—no backend database needed
- Firebase is only for authentication (Google/Apple/Email)
- Modify `app.js` for custom logic
- Modify `styles.css` for design changes
- Mobile responsiveness tested at 480px, 768px, and 1024px breakpoints

---

## 📞 Support & Next Steps

### Completed Features ✅
- ✅ Responsive storefront
- ✅ Category filtering
- ✅ Shopping cart
- ✅ WhatsApp checkout
- ✅ Admin dashboard
- ✅ Product management
- ✅ Store branding (customizable)
- ✅ Login page background
- ✅ Google sign-in
- ✅ Email/password auth
- ✅ Password reset
- ✅ Stock tracking

### Optional Enhancements
- 🔄 Analytics dashboard (track orders, customers)
- 🔄 Product reviews & ratings
- 🔄 Wishlist feature
- 🔄 Coupon codes
- 🔄 Multi-currency support

---

## 📄 License
This project is open-source. Feel free to use, modify, and share.

## 🙋 Questions?
Refer to this README or the detailed breakdown in `/README/README.md` for code walkthroughs.



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
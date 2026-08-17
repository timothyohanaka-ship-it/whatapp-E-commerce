# 🔥 Firestore Setup Guide - Shared Database Implementation

## 🎯 What Changed

Your e-commerce app has been **refactored to use Firebase Firestore** instead of localStorage. This means:

✅ **All customers see the same products** in real-time  
✅ **When admin uploads a product**, every customer viewing the store sees it **immediately** (no refresh needed)  
✅ **Products stored in a shared database** (not just the admin's browser)  
✅ **All store settings (name, tagline, background) are shared** across all users  
✅ **Marquee announcement is global** for all customers  

---

## 🚀 Step-by-Step Firestore Setup

### **Step 1: Go to Firebase Console**
1. Visit: https://console.firebase.google.com/
2. Select your project: **e-commance-3d365**
3. Click on **Build** in the left sidebar
4. Select **Firestore Database**

### **Step 2: Create Firestore Database**
1. Click **Create Database**
2. Choose: **Start in production mode** (we'll add security rules later)
3. Select region: **us-central1** (or closest to your location)
4. Click **Create**

### **Step 3: Create Collections**

Firestore will now be active. You need to create these 4 collections:

#### **Collection 1: products**
1. Click **+ Start collection**
2. Collection ID: `products`
3. Click **Next**
4. Click **Add Document** (leave document ID auto-generated)
5. Add these fields:
   - `name` (string) — product name
   - `category` (string) — category name
   - `price` (number) — product price
   - `description` (string) — product details
   - `image` (string) — image URL or data URL
   - `color` (string) — product color
   - `originalPrice` (number) — original price (optional)
   - `createdAt` (timestamp) — when created
6. Click **Save**
7. You can now delete this test document (or keep it)

**Products Document Structure:**
```json
{
  "name": "iPhone 15 Pro",
  "category": "Phone",
  "price": 980000,
  "description": "Premium smartphone",
  "image": "https://...",
  "color": "Natural Titanium",
  "originalPrice": 1180000,
  "createdAt": "2024-08-17T10:00:00Z"
}
```

#### **Collection 2: storeSettings**
1. Click **+ Add collection**
2. Collection ID: `storeSettings`
3. Click **Next**
4. Document ID: `default`
5. Add these fields:
   - `name` (string) — store name (e.g., "FGP Electronics")
   - `tagline` (string) — store tagline
   - `loginBackgroundImage` (string) — URL to background image
6. Click **Save**

**Store Settings Document:**
```json
{
  "name": "FGP Electronics",
  "tagline": "Quality products delivered fast to your doorstep.",
  "loginBackgroundImage": "https://images.unsplash.com/..."
}
```

#### **Collection 3: marqueeMessage**
1. Click **+ Add collection**
2. Collection ID: `marqueeMessage`
3. Click **Next**
4. Document ID: `default`
5. Add field:
   - `text` (string) — the welcome announcement
6. Click **Save**

**Marquee Document:**
```json
{
  "text": "You are welcome! Shop our latest products."
}
```

#### **Collection 4: users** (Optional - for tracking customer info)
1. Click **+ Add collection**
2. Collection ID: `users`
3. Click **Next** (you can add documents later when needed)
4. Click **Save**

---

### **Step 4: Set Up Admin Access**

#### **Option A: Email-Based Admin (Recommended)**

1. Open `public/admin.js` in your code editor
2. Find this section (around line 25-30):
```javascript
const ADMIN_EMAILS = [
  "admin@example.com",
  "owner@example.com"
  // Add more admin emails as needed
];
```

3. **Replace with your admin email(s):**
```javascript
const ADMIN_EMAILS = [
  "your-email@gmail.com",      // Your email
  "boss@yourstore.com"          // Other admins
];
```

4. **Important:** The user must sign in with Firebase Auth (Google/Apple/Email) using one of these emails

---

### **Step 5: Enable Firestore Security Rules**

1. In Firebase Console, go to **Firestore Database**
2. Click the **Rules** tab
3. Replace the entire content with:

```firestore-rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // PUBLIC: Anyone can read products, storeSettings, marqueeMessage
    match /products/{document=**} {
      allow read: if true;
      allow write: if false; // Only admin dashboard writes (via admin SDK later)
    }
    
    match /storeSettings/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    match /marqueeMessage/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    // Users collection - users can read/write their own data
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }
  }
}
```

4. Click **Publish**

---

## 📱 How It Works Now

### **For Customers:**
1. Open the storefront (`home.html`)
2. Products load from Firestore in real-time
3. When admin adds a product → customer sees it instantly
4. Cart is still stored locally (only for that customer)
5. Uses Firebase Auth (Google/Apple/Email)

### **For Admin:**
1. Click **Admin Panel** link
2. Sign in with Firebase Auth using your email from `ADMIN_EMAILS`
3. Admin dashboard appears
4. Add products → saved to Firestore `products` collection
5. Products appear on storefront instantly

---

## 🔐 Security Notes

**Current Setup:**
- ✅ Customers can **READ** all products (public)
- ❌ Customers **CANNOT** write to Firestore
- ✅ Admin can add/update products (via application logic)

**For Production:**
1. Set up Admin SDK on a backend server (Node.js/Python)
2. Only backend can modify Firestore data
3. Add proper authentication tokens

---

## 🐛 Troubleshooting

### **Products not showing up?**
- Check Firestore Console → make sure `products` collection exists
- Verify document structure matches requirements
- Check browser console for errors (F12)

### **Admin dashboard says "You do not have admin access"?**
- Make sure you're signed in with an email in `ADMIN_EMAILS` list
- Sign out and sign back in
- Check admin.js to verify your email is listed

### **New products not appearing for customers?**
- Make sure you're on the storefront (`home.html`)
- Products load in real-time - should appear within 1-2 seconds
- Refresh the page if needed
- Check Firestore that the product was actually saved

### **Store settings/marquee not updating?**
- Make sure `storeSettings` and `marqueeMessage` collections exist
- Check Firestore that the document was saved
- Refresh the page

---

## 📊 Firestore Data Structure Summary

```
firestore/
├── products/ (collection)
│   ├── auto-id-1 {name, category, price, description, image, color, ...}
│   ├── auto-id-2 {...}
│   └── ...
├── storeSettings/ (collection)
│   └── default {name, tagline, loginBackgroundImage}
├── marqueeMessage/ (collection)
│   └── default {text}
└── users/ (collection)
    └── userId {displayName, email, createdAt, ...}
```

---

## ✅ Verification Checklist

After completing setup, verify:

- [ ] Firestore Database is created and active
- [ ] `products` collection exists (empty or with test data)
- [ ] `storeSettings` collection exists with `default` document
- [ ] `marqueeMessage` collection exists with `default` document
- [ ] Your admin email is in `ADMIN_EMAILS` list in `admin.js`
- [ ] Security rules are published
- [ ] You can sign in to admin dashboard with your email
- [ ] You can add a product and see it appear on storefront instantly

---

## 🎓 What's Different from Before

| Feature | Before | After |
|---------|--------|-------|
| Product Storage | localStorage (local browser) | Firestore (cloud database) |
| All Users See Same Products | ❌ No | ✅ Yes |
| Real-Time Updates | ❌ No (need refresh) | ✅ Yes (instant) |
| Admin Authentication | Hardcoded username/password | Firebase Auth with email list |
| Store Settings | localStorage | Firestore |
| Marquee Message | localStorage | Firestore |

---

## 🚀 Next Steps

1. ✅ Complete Firestore setup above
2. ✅ Add your admin email(s) to `admin.js`
3. ✅ Test by adding a product in admin dashboard
4. ✅ Verify product appears on storefront instantly
5. Deploy to Firebase Hosting or your server
6. Share the storefront link with customers

---

**Questions?** Refer to the main [README.md](README.md) for general guidance.

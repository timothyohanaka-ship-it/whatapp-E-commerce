# Firebase Realtime Database Setup

This project now uses **Firebase Authentication + Firebase Realtime Database**. Authentication remains unchanged. Products, store settings, and the marquee are shared through RTDB and update live for every customer.

## 1. Enable Realtime Database

1. Open https://console.firebase.google.com/
2. Select project `e-commance-3d365`.
3. Open **Build > Realtime Database**.
4. Click **Create Database**.
5. Choose a location close to your customers.
6. Choose **Start in locked mode** and click **Enable**.
7. Open the **Rules** tab.
8. Paste the contents of `database.rules.json` from this project.
9. Click **Publish**.

The current rules allow public reads and permit writes only when the signed-in Firebase account email is `ohanakatimothy6@gmail.com`. The same email is also checked in `public/admin.js` before showing the dashboard.

## 2. Confirm the database URL

In the Realtime Database **Data** tab, copy the database URL. It normally looks like:

```text
https://e-commance-3d365-default-rtdb.firebaseio.com
```

The URL is configured in both:

- `public/app.js`
- `public/admin.js`

Find this line and replace it if Firebase shows a different URL:

```js
databaseURL: "https://e-commance-3d365-default-rtdb.firebaseio.com"
```

This is the main code location to edit when connecting the app to your RTDB instance.

## 3. Create the initial data

The admin page creates these paths automatically when you save data:

```text
products/
  generated-product-id/
    name
    category
    price
    originalPrice
    color
    description
    image
    createdAt
    inStock
    quantity
storeSettings/
  name
  tagline
  loginBackgroundImage
marqueeMessage/
  text
```

You do not need to create test products manually. Sign in to `admin.html`, add a product, and confirm it appears under **Data > products**. Open `home.html` in another browser tab to see the live update.

## 4. Set the admin email

Open `public/admin.js` and replace the placeholder addresses:

```js
const ADMIN_EMAILS = [
  "your-real-email@gmail.com"
];
```

The email must match the Firebase Auth account used to open the admin dashboard. Do not leave `admin@example.com` or `owner@example.com` in the file.

## 5. Enable Authentication providers

In Firebase Console:

1. Open **Build > Authentication**.
2. Click **Get started** if Authentication is not enabled.
3. Open **Sign-in method**.
4. Enable **Email/Password**.
5. Enable **Google** and configure the support email.
6. Enable Apple only after completing the Apple Developer setup.
7. Under **Settings > Authorized domains**, add your deployed domain and `localhost` for local testing.

## 6. Test locally

Use a local web server. Firebase sign-in will not work reliably from a `file:///` URL.

From the project folder, use one of these commands:

```powershell
npx.cmd http-server . -p 8000
```

or, if Python is installed:

```powershell
py -m http.server 8000
```

Open:

```text
http://localhost:8000/public/home.html
```

Test this sequence:

1. Home page opens first.
2. Add a product from the admin page.
3. Product appears on the storefront without a refresh.
4. Guest adds an item and clicks checkout.
5. Guest is sent to `index.html?login=1`.
6. After login, return to the storefront and checkout.
7. Logout returns to `home.html`.

## 7. Important migration note

RTDB and Firestore are different databases. Existing products saved under Firestore `products` will not automatically appear in RTDB. Add the products again through the admin page or export/import them into the RTDB `products` path.

The cart remains in browser `localStorage` by design, so each customer's cart is private to that browser.

# 🏠 NoBrokerNoCry — Frontend

> **Live Demo**: [https://storied-brigadeiros-76e5b9.netlify.app](https://storied-brigadeiros-76e5b9.netlify.app)

React + Vite frontend for **NoBrokerNoCry** — a modern real estate platform for Chennai that cuts out brokers and connects you directly with verified agents, AI insights, and a seamless Razorpay booking flow.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏘️ Property Listings | Browse, search, and filter properties by type, location & price |
| 🗺️ Interactive Map | Leaflet-powered map view showing all listed properties |
| ⚖️ Property Comparison | Compare up to 3 properties side-by-side |
| ✨ AI Neighborhood Insights | Gemini-powered locality analysis on property detail pages |
| 💳 Secure Booking | Razorpay payment integration for booking tokens (₹500) |
| 📅 Appointment Scheduling | Book property viewings directly with agents |
| 💬 AI Chat Assistant | Floating chat bubble powered by Gemini AI |
| ❤️ Favorites | Save and manage favorite properties in localStorage |
| 🔐 Auth | JWT-based login, register, forgot password, reset password |
| 📊 Rent vs Buy Calculator | Compare the long-term cost of renting vs buying |
| 👤 Agent Dashboard | Agents can view and manage their handled properties |

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite 5
- **Styling**: TailwindCSS 3
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Maps**: Leaflet + react-leaflet
- **Payments**: Razorpay Checkout (loaded via CDN)

---

## 🚀 Local Setup

### Prerequisites
- Node.js ≥ 18.x
- The **backend server** running at `http://localhost:5000`

### Steps

```bash
# 1. Clone this repo
git clone https://github.com/YOUR_USERNAME/real-estate-client.git
cd real-estate-client

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Then edit .env with your values

# 4. Start the dev server
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 🔑 Environment Variables

Create a `.env` file in the root of this directory:

```env
# Backend API URL (no trailing slash)
VITE_API_URL=http://localhost:5000/api

# Razorpay Test Key (from your Razorpay dashboard)
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
```

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | ✅ Yes | Base URL for the backend API |
| `VITE_RAZORPAY_KEY_ID` | Optional | Razorpay publishable test key. Falls back to mock mode if omitted. |

---

## 🏗️ Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── assets/          # Logo image
│   ├── components/      # Reusable UI components
│   │   ├── BookProperty.jsx    # Razorpay payment component
│   │   ├── PropertyCard.jsx
│   │   ├── MapView.jsx
│   │   ├── Filters.jsx
│   │   ├── ContactForm.jsx
│   │   ├── AppointmentForm.jsx
│   │   ├── AIChatBubble.jsx
│   │   └── Modal.jsx
│   ├── context/
│   │   └── Auth.jsx     # JWT auth context
│   ├── lib/
│   │   └── api.js       # Axios instance
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── AgentDashboard.jsx
│   │   ├── Compare.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   ├── App.jsx          # Root component with all routes
│   └── main.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 💳 Payment Flow (Razorpay)

1. User clicks **Book Property** on a property detail page
2. Frontend calls `POST /api/payment/order` on the backend
3. Backend creates a Razorpay order and returns `order_id`
4. Frontend opens the **Razorpay Checkout modal**
5. On payment success, frontend calls `POST /api/payment/verify` to verify the signature
6. Backend verifies using HMAC-SHA256 and updates the booking record

> **Mock Mode**: If `VITE_RAZORPAY_KEY_ID` is not set or the backend has no Razorpay secret, mock mode activates — a "Simulate Success" button lets you test the full flow without real payments.

---

## 🌐 Deployment (Netlify)

1. **Connect** your GitHub repo to Netlify
2. Set **Build Command**: `npm run build`  
3. Set **Publish Directory**: `dist`
4. Add the **environment variables** in Netlify dashboard → Site Settings → Environment Variables
5. Add a `netlify.toml` redirect rule for React Router SPA navigation:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## 📄 License

MIT © 2025 Nagulan

# 🏠 NoBrokerNoCry — Backend API

> **Live API**: [https://real-estate-api.onrender.com](https://real-estate-api.onrender.com)  
> **Health Check**: `GET /api/health`

Express + MongoDB REST API for **NoBrokerNoCry** — a modern real estate platform. Handles authentication, property & agent data, AI insights, appointments, inquiries, and Razorpay payment processing.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+ with ES Modules
- **Framework**: Express 4
- **Database**: MongoDB via Mongoose 8
- **Auth**: JWT (jsonwebtoken) + bcryptjs
- **AI**: Google Generative AI (Gemini)
- **Payments**: Razorpay Node SDK
- **Email**: Nodemailer
- **Validation**: Zod
- **Logging**: Morgan

---

## 🚀 Local Setup

### Prerequisites
- Node.js ≥ 18.x
- MongoDB (local or Atlas connection string)

### Steps

```bash
# 1. Clone this repo
git clone https://github.com/YOUR_USERNAME/real-estate-server.git
cd real-estate-server

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Then edit .env with your values

# 4. Start development server
npm run dev
```

The API will be available at **http://localhost:5000**

---

## 🔑 Environment Variables

Create a `.env` file in the root of this directory:

```env
# ---- Server ----
PORT=5000

# ---- Database ----
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/real-estate

# ---- Auth ----
JWT_SECRET=your_super_secret_jwt_key

# ---- Frontend (for CORS + email links) ----
FRONTEND_URL=http://localhost:5173

# ---- Payments (Razorpay) ----
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# ---- AI ----
GEMINI_API_KEY=your_google_generative_ai_key

# ---- Email ----
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

| Variable | Required | Description |
|---|---|---|
| `PORT` | Optional | Server port (default: `5000`) |
| `MONGODB_URI` | ✅ Yes | MongoDB connection string |
| `JWT_SECRET` | ✅ Yes | Secret for signing JWT tokens |
| `FRONTEND_URL` | ✅ Yes | Frontend URL for CORS and email links |
| `RAZORPAY_KEY_ID` | Optional | Razorpay test key ID |
| `RAZORPAY_KEY_SECRET` | Optional | Razorpay test key secret |
| `GEMINI_API_KEY` | Optional | Google Gemini AI key |
| `EMAIL_USER` | Optional | Gmail address for password reset emails |
| `EMAIL_PASS` | Optional | Gmail App Password |

> **Note**: If Razorpay keys are missing, the server automatically falls back to **mock mode** and returns simulated orders — useful for testing without real credentials.

---

## 📡 API Reference

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | — | Register a new user |
| `POST` | `/api/auth/login` | — | Login and receive JWT token |
| `POST` | `/api/auth/forgot-password` | — | Send password reset email |
| `POST` | `/api/auth/reset-password/:token` | — | Reset password using token |

### Properties — `/api/properties`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/properties` | — | List all properties (supports filters: `type`, `location`, `minPrice`, `maxPrice`) |
| `GET` | `/api/properties/:id` | — | Get a single property by ID |
| `POST` | `/api/properties` | ✅ JWT | Create a new property (agent/admin) |
| `PATCH` | `/api/properties/:id` | ✅ JWT | Update property |
| `DELETE` | `/api/properties/:id` | ✅ JWT | Delete property |

### Agents — `/api/agents`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/agents` | — | List all agents |
| `GET` | `/api/agents/:id` | — | Get agent + handled properties |

### Inquiries — `/api/inquiries`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/inquiries` | — | Submit a property inquiry |

### Appointments — `/api/appointments`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/appointments` | — | Book a viewing appointment |

### Payment (Razorpay) — `/api/payment`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/payment/order` | ✅ JWT | Create a Razorpay order |
| `POST` | `/api/payment/verify` | ✅ JWT | Verify signature after payment |

### AI — `/api`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/locality-insights` | — | Get AI-generated neighborhood insights |
| `POST` | `/api/chat` | — | Chat with the AI assistant |

### Admin — `/api/admin`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/admin/bookings` | ✅ Admin | View all bookings |

---

## 💳 Payment Integration (Razorpay)

### How It Works

```
Client                          Server                        Razorpay
  │── POST /api/payment/order ──►│── orders.create(amount) ──►│
  │◄── { order_id, amount } ─────│◄─── { id, amount } ────────│
  │
  │ [User pays in Razorpay modal]
  │
  │── POST /api/payment/verify ──►│── HMAC-SHA256 verify ──────│
  │◄── { success: true } ─────────│── Booking updated in DB ───│
```

**Signature Verification** (server-side):
```js
const expectedSignature = crypto
  .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
  .update(`${razorpay_order_id}|${razorpay_payment_id}`)
  .digest("hex");
const isAuthentic = expectedSignature === razorpay_signature;
```

### Mock Mode
If `RAZORPAY_KEY_ID` or `RAZORPAY_KEY_SECRET` are absent, the server returns a **mock order** (`mock: true`) and accepts mock verifications, allowing full end-to-end testing without Razorpay credentials.

---

## 🏗️ Project Structure

```
server/
├── src/
│   ├── config/
│   │   ├── database.js     # MongoDB connection
│   │   ├── seed.js         # DB seed logic
│   │   └── mockData.js     # In-memory fallback data
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── propertyController.js
│   │   ├── agentController.js
│   │   ├── paymentController.js
│   │   ├── adminController.js
│   │   ├── aiController.js
│   │   ├── appointmentController.js
│   │   └── inquiryController.js
│   ├── middleware/
│   │   └── auth.js         # JWT auth middleware
│   ├── models/
│   │   ├── User.js
│   │   ├── Property.js
│   │   ├── Agent.js
│   │   ├── Booking.js
│   │   └── Inquiry.js
│   ├── routes/             # Express routers
│   └── index.js            # App entry point
├── .env
├── package.json
└── README.md
```

---

## 🌐 Deployment (Render)

1. **Connect** your GitHub repo to [Render](https://render.com)
2. Set **Environment**: `Node`
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `npm start`
5. Add all **environment variables** in the Render dashboard → Environment
6. Make sure your MongoDB Atlas cluster allows connections from `0.0.0.0/0` (or Render's IP)

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Nodemon (auto-restart) |
| `npm start` | Start production server |

---

## 📄 License

MIT © 2025 Nagulan

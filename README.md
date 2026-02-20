# 🏠 NoBrokerNoCry — Real Estate Platform

A full-stack MERN real estate application for Chennai. This repository is a **monorepo** — the frontend and backend are maintained as **separate, self-contained applications** with their own GitHub repositories and deployments.

---

## 📂 Repository Structure

```
real-estate-app/          ← This monorepo (development workspace)
├── client/               → Frontend app (React + Vite + TailwindCSS)
│   └── README.md         ← Frontend-specific docs
├── server/               → Backend API (Node.js + Express + MongoDB)
│   └── README.md         ← Backend-specific docs
└── README.md             ← You are here
```

---

## 🔗 Separate Repositories

| Repo | Description | Deploy |
|---|---|---|
| [real-estate-client](https://github.com/YOUR_USERNAME/real-estate-client) | React frontend | [![Netlify](https://img.shields.io/badge/Netlify-Live-00C7B7?logo=netlify)](https://storied-brigadeiros-76e5b9.netlify.app) |
| [real-estate-server](https://github.com/YOUR_USERNAME/real-estate-server) | Express backend | [![Render](https://img.shields.io/badge/Render-Live-46E3B7?logo=render)](https://real-estate-api.onrender.com) |

---

## ✨ Features at a Glance

- 🏘️ Property listings with advanced filters
- 🗺️ Leaflet interactive map view
- ⚖️ Side-by-side property comparison
- ✨ Gemini AI neighborhood insights & chat assistant
- 💳 **Razorpay** payment integration for booking tokens
- 📅 Appointment scheduling with agents
- 🔐 JWT authentication (register, login, password reset)
- 👤 Agent dashboard

---

## 🚀 Quick Start (Local Development)

```bash
# Terminal 1 — Backend
cd server
npm install
cp .env.example .env   # fill in your values
npm run dev            # http://localhost:5000

# Terminal 2 — Frontend
cd client
npm install
cp .env.example .env   # fill in your values
npm run dev            # http://localhost:5173
```

---

## 📖 Detailed Docs

- **Frontend setup & env vars** → [client/README.md](./client/README.md)
- **Backend API reference & env vars** → [server/README.md](./server/README.md)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, TailwindCSS, React Router v6, Axios |
| Backend | Node.js, Express 4, Mongoose |
| Database | MongoDB Atlas |
| Auth | JWT + bcryptjs |
| Payments | Razorpay |
| AI | Google Gemini |
| Maps | Leaflet + react-leaflet |
| Deployment | Netlify (frontend) · Render (backend) |

---

## 📄 License

MIT © 2025 Nagulan · Crafted with ❤️ in Chennai, India

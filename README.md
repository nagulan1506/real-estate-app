# NoBrokerNoCry - Real Estate Application

A modern, full-stack real estate application built with React and Node.js, designed to help users find their dream homes in Chennai, India.

## 🏗️ Project Structure

This project is organized into two separate repositories:

### Frontend Repository (`client/`)
- **Technology**: React 18, Vite, Tailwind CSS
- **Location**: `client/` directory
- **Purpose**: User-facing web application

### Backend Repository (`server/`)
- **Technology**: Node.js, Express, MongoDB
- **Location**: `server/` directory
- **Purpose**: RESTful API server following MVC architecture

## 🚀 Features

- **Property Listings**: Browse comprehensive property listings with detailed information
- **Interactive Map View**: Visualize properties on an interactive map
- **AI-Powered Insights**: Get AI-generated neighborhood insights using Google Gemini
- **Property Comparison**: Compare up to 3 properties side-by-side
- **Agent Management**: Connect with verified real estate agents
- **User Authentication**: Secure registration and login system
- **Booking System**: Schedule property viewings and make bookings
- **Payment Integration**: Secure payment processing with Razorpay
- **About Section**: Detailed information about the platform and its mission
- **Favorites**: Save and manage favorite properties
- **Advanced Filters**: Filter properties by location, price, type, and rooms

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

### Frontend Setup

```bash
cd client
npm install
```

### Backend Setup

```bash
cd server
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Frontend Environment Variables

Create a `.env` file in the `client/` directory:

```env
VITE_API_BASE=http://localhost:5000/api
```

## 🚀 Running the Application

### Development Mode

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### Production Build

**Frontend:**
```bash
cd client
npm run build
```

**Backend:**
```bash
cd server
npm start
```

## 📁 Backend Architecture (MVC Pattern)

The backend follows the Model-View-Controller (MVC) architecture:

```
server/
├── src/
│   ├── config/
│   │   ├── database.js      # Database connection
│   │   └── seed.js          # Database seeding
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── propertyController.js
│   │   ├── agentController.js
│   │   ├── inquiryController.js
│   │   ├── appointmentController.js
│   │   ├── aiController.js
│   │   ├── paymentController.js
│   │   └── adminController.js
│   ├── middleware/          # Middleware functions
│   │   └── auth.js          # Authentication middleware
│   ├── models/              # Database models
│   │   ├── User.js
│   │   ├── Property.js
│   │   ├── Agent.js
│   │   ├── Inquiry.js
│   │   └── Booking.js
│   ├── routes/              # Route definitions
│   │   ├── authRoutes.js
│   │   ├── propertyRoutes.js
│   │   ├── agentRoutes.js
│   │   ├── inquiryRoutes.js
│   │   ├── appointmentRoutes.js
│   │   ├── aiRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── adminRoutes.js
│   └── index.js             # Application entry point
└── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Properties
- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create property (Agent only)
- `PATCH /api/properties/:id` - Update property (Agent only)
- `DELETE /api/properties/:id` - Delete property (Agent only)

### Agents
- `GET /api/agents` - Get all agents
- `GET /api/agents/:id` - Get agent by ID

### Inquiries
- `POST /api/inquiries` - Create inquiry

### Appointments
- `POST /api/appointments` - Schedule appointment

### AI Services
- `POST /api/locality-insights` - Get AI-generated locality insights
- `POST /api/chat` - AI chat assistant

### Payments
- `POST /api/payment/order` - Create payment order
- `POST /api/payment/verify` - Verify payment

### Admin
- `GET /api/admin/summary` - Get admin summary (Admin only)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## 🧪 Testing

### Backend Health Check
```bash
curl http://localhost:5000/api/health
```

## 📝 User Roles

- **User**: Browse properties, make inquiries, book viewings
- **Agent**: Create and manage properties, view inquiries
- **Admin**: Access admin dashboard and statistics

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT-based authentication
- CORS protection
- Input validation
- Secure payment processing

## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

### Backend Deployment
The backend can be deployed to:
- Render
- Heroku
- AWS
- DigitalOcean
- Any Node.js hosting service

## 🔄 Maintaining Separate Repositories

Keep frontend and backend as two independent repositories to simplify deployments and CI/CD.

- Create two GitHub repositories, for example:
  - frontend: NoBrokerNoCry-frontend
  - backend: NoBrokerNoCry-backend
- Initialize and push each subfolder independently:

```bash
# Frontend
cd client
git init
git remote add origin <your-frontend-repo-url>
git add -A
git commit -m "Initialize frontend"
git push -u origin main

# Backend
cd ../server
git init
git remote add origin <your-backend-repo-url>
git add -A
git commit -m "Initialize backend"
git push -u origin main
```

Tip: Keep the API base URL in client/.env (VITE_API_BASE) pointing to your backend deployment.

## 💳 Payment Setup

This project integrates Razorpay for bookings. For development without keys, the backend now supports a mock order flow.

- Production: set these in server/.env
  - RAZORPAY_KEY_ID
  - RAZORPAY_KEY_SECRET
- Frontend: set VITE_RAZORPAY_KEY_ID in client/.env for the checkout key
- Mock mode: if keys are absent, the backend returns a mock order (id starts with order_mock_) and the flow completes via signature-less verification

## 📄 License

This project is private and proprietary.

## 👥 Contributing

This is a private project. For contributions, please contact the project maintainers.

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

**Note**: This project maintains separate repositories for frontend and backend. Each repository should be independently deployable and maintainable.



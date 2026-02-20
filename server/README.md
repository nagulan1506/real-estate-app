# NoBrokerNoCry - Backend API

RESTful API server for the NoBrokerNoCry real estate platform, built with Node.js, Express, and MongoDB following the MVC (Model-View-Controller) architecture pattern.

## 🏗️ Architecture

This backend follows the **MVC (Model-View-Controller)** pattern:

- **Models**: Database schemas and data models
- **Views**: Not applicable (API-only, no views)
- **Controllers**: Business logic and request handling
- **Routes**: API endpoint definitions
- **Middleware**: Authentication and other middleware functions

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root of the `server/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/realestate
JWT_SECRET=your_super_secret_jwt_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
GEMINI_API_KEY=your_google_gemini_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Development

```bash
npm run dev
```

The server will start on http://localhost:5000

### Production

```bash
npm start
```

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   ├── database.js          # MongoDB connection configuration
│   │   └── seed.js              # Database seeding script
│   ├── controllers/             # Business logic (MVC Controllers)
│   │   ├── adminController.js
│   │   ├── agentController.js
│   │   ├── aiController.js
│   │   ├── appointmentController.js
│   │   ├── authController.js
│   │   ├── inquiryController.js
│   │   ├── paymentController.js
│   │   └── propertyController.js
│   ├── middleware/              # Middleware functions
│   │   └── auth.js             # JWT authentication middleware
│   ├── models/                  # Database models (MVC Models)
│   │   ├── Agent.js
│   │   ├── Booking.js
│   │   ├── Inquiry.js
│   │   ├── Property.js
│   │   └── User.js
│   ├── routes/                  # API routes (MVC Routes)
│   │   ├── adminRoutes.js
│   │   ├── agentRoutes.js
│   │   ├── aiRoutes.js
│   │   ├── appointmentRoutes.js
│   │   ├── authRoutes.js
│   │   ├── inquiryRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── propertyRoutes.js
│   └── index.js                 # Application entry point
└── package.json
```

## 🎯 MVC Pattern Implementation

### Models (`src/models/`)
Define the database schemas using Mongoose:
- `User.js` - User authentication and profile
- `Property.js` - Property listings
- `Agent.js` - Real estate agents
- `Inquiry.js` - Property inquiries
- `Booking.js` - Property bookings and payments

### Controllers (`src/controllers/`)
Contain the business logic for handling requests:
- `authController.js` - Authentication (register, login, password reset)
- `propertyController.js` - Property CRUD operations
- `agentController.js` - Agent information
- `inquiryController.js` - Property inquiries
- `appointmentController.js` - Appointment scheduling
- `aiController.js` - AI-powered features (chat, insights)
- `paymentController.js` - Payment processing
- `adminController.js` - Admin dashboard

### Routes (`src/routes/`)
Define API endpoints and connect them to controllers:
- Each route file exports an Express router
- Routes are mounted in `index.js`
- Controllers handle the actual logic

### Middleware (`src/middleware/`)
- `auth.js` - JWT authentication and authorization

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password with token

### Properties (`/api/properties`)
- `GET /` - Get all properties (with query filters)
- `GET /:id` - Get property by ID
- `POST /` - Create property (Agent only, requires auth)
- `PATCH /:id` - Update property (Agent only, requires auth)
- `DELETE /:id` - Delete property (Agent only, requires auth)

### Agents (`/api/agents`)
- `GET /` - Get all agents
- `GET /:id` - Get agent by ID with handled properties

### Inquiries (`/api/inquiries`)
- `POST /` - Create property inquiry

### Appointments (`/api/appointments`)
- `POST /` - Schedule property viewing appointment

### AI Services (`/api`)
- `POST /locality-insights` - Get AI-generated neighborhood insights
- `POST /chat` - AI chat assistant for property queries

### Payments (`/api/payment`)
- `POST /order` - Create Razorpay payment order
- `POST /verify` - Verify payment signature

### Admin (`/api/admin`)
- `GET /summary` - Get admin dashboard summary (Admin only, requires auth)

### Health Check
- `GET /api/health` - Server health status

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require the token in the Authorization header:

```
Authorization: Bearer <token>
```

### User Roles
- **user**: Regular users (default)
- **agent**: Real estate agents
- **admin**: Administrators

## 🛡️ Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token-based authentication
- CORS protection
- Input validation
- Secure payment processing with Razorpay
- Password reset with secure tokens

## 📊 Database

### MongoDB Collections
- `users` - User accounts
- `properties` - Property listings
- `agents` - Real estate agents
- `inquiries` - Property inquiries
- `bookings` - Property bookings and payments

### Database Seeding
The application automatically seeds sample data on startup (agents and properties) if the database is empty.

## 🔧 Dependencies

### Core
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variables
- `cors` - CORS middleware
- `morgan` - HTTP request logger

### Authentication
- `jsonwebtoken` - JWT tokens
- `bcryptjs` - Password hashing

### External Services
- `@google/generative-ai` - Google Gemini AI
- `razorpay` - Payment gateway
- `nodemailer` - Email sending

## 🧪 Testing

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"user"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🚀 Deployment

### Environment Setup
1. Set all required environment variables
2. Ensure MongoDB is accessible
3. Configure CORS for your frontend domain

### Recommended Platforms
- **Render**: Easy deployment with automatic SSL
- **Heroku**: Traditional PaaS option
- **AWS**: EC2, Elastic Beanstalk, or Lambda
- **DigitalOcean**: App Platform or Droplets

### Production Checklist
- [ ] Set secure `JWT_SECRET`
- [ ] Configure production MongoDB URI
- [ ] Set `FRONTEND_URL` to production domain
- [ ] Enable HTTPS
- [ ] Configure CORS for production domain
- [ ] Set up email service credentials
- [ ] Configure Razorpay production keys
- [ ] Set up Gemini API key
- [ ] Enable logging and monitoring

## 📝 Error Handling

The API returns standardized error responses:

```json
{
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict (e.g., email already exists)
- `500` - Internal Server Error

## 🔄 Database Migrations

Currently, the application uses Mongoose's automatic schema management. For production, consider implementing proper migration scripts.

## 📄 License

Private and proprietary.

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify `MONGODB_URI` is correct
- Check MongoDB is running
- Verify network connectivity

### JWT Errors
- Ensure `JWT_SECRET` is set
- Check token expiration
- Verify token format in requests

### Email Sending Issues
- Verify email credentials
- Check app password for Gmail
- Review email service logs

## 📞 Support

For issues or questions, please contact the development team or open an issue in the repository.


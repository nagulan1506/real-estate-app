# NoBrokerNoCry - Frontend

Modern React-based frontend application for the NoBrokerNoCry real estate platform.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root of the `client/` directory:

```env
VITE_API_BASE=http://localhost:5000/api
```

For production, update this to your backend API URL.

### Development

```bash
npm run dev
```

The application will be available at http://localhost:5173

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
client/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── AIChatBubble.jsx
│   │   ├── AppointmentForm.jsx
│   │   ├── BookProperty.jsx
│   │   ├── ContactForm.jsx
│   │   ├── Debug.jsx
│   │   ├── Filters.jsx
│   │   ├── MapView.jsx
│   │   ├── Modal.jsx
│   │   └── PropertyCard.jsx
│   ├── context/             # React Context providers
│   │   └── Auth.jsx
│   ├── lib/                 # Utility libraries
│   │   └── api.js           # Axios API client
│   ├── pages/               # Page components
│   │   ├── About.jsx
│   │   ├── AgentDashboard.jsx
│   │   ├── Compare.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ResetPassword.jsx
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json
├── vite.config.js          # Vite configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## 🎨 Technologies Used

- **React 18**: UI library
- **React Router**: Client-side routing
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **Leaflet**: Interactive maps
- **React Leaflet**: React bindings for Leaflet

## 🎯 Features

### User Features
- Browse property listings with filters
- View properties on interactive map
- Compare up to 3 properties
- Save favorite properties
- AI-powered chat assistant
- AI-generated neighborhood insights
- User authentication (register/login)
- Password reset functionality
- Contact agents and schedule viewings
- Book properties with payment integration

### Agent Features
- Agent dashboard
- Create and manage properties
- View inquiries

## 🔌 API Integration

The frontend communicates with the backend API through the `api.js` utility. All API calls are centralized in this file.

### API Base URL
The API base URL is configured via the `VITE_API_BASE` environment variable. Defaults to `/api` if not set.

## 🎨 Styling

The application uses Tailwind CSS for styling. Custom configuration is in `tailwind.config.js`.

### Color Scheme
- Primary: Sky blue (#87CEEB)
- Background: Dark slate (gray-900)
- Accent: Emerald green

## 🧩 Key Components

### PropertyCard
Displays property information in a card format with image, title, location, price, and action buttons.

### MapView
Interactive map showing all properties with markers. Uses Leaflet for rendering.

### Filters
Advanced filtering component for properties by location, price range, type, and number of rooms.

### AIChatBubble
Floating chat bubble for AI-powered property assistance.

### Modal
Reusable modal component for forms and detailed views.

## 🔐 Authentication

Authentication is handled through the `Auth` context provider. The token is stored in localStorage and automatically included in API requests.

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist/` directory to Netlify
3. Configure environment variables in Netlify dashboard
4. Set up redirects (see `public/_redirects`)

### Vercel
1. Connect your repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Configure environment variables

### Other Platforms
The built files in `dist/` can be deployed to any static hosting service.

## 🐛 Troubleshooting

### API Connection Issues
- Verify `VITE_API_BASE` is set correctly
- Check CORS settings on backend
- Ensure backend server is running

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

## 📝 Development Notes

- The app uses React Router v6 for routing
- State management is handled through React Context and local state
- API calls use Axios with interceptors for authentication
- Maps require Leaflet CSS to be imported (handled in main.jsx)

## 🔄 State Management

- **Global State**: Auth context for user authentication
- **Local State**: Component-level state using React hooks
- **Persistent State**: localStorage for favorites and compare list

## 📄 License

Private and proprietary.



# Repository Structure Guide

This document explains how to maintain separate repositories for the frontend and backend of the NoBrokerNoCry application.

## 📦 Separate Repository Strategy

The application is designed to be split into two independent repositories:

1. **Frontend Repository** - React application
2. **Backend Repository** - Node.js/Express API

## 🗂️ Current Structure

```
real-estate-app/
├── client/          # Frontend repository (should be separate)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── server/          # Backend repository (should be separate)
│   ├── src/
│   ├── package.json
│   └── README.md
└── README.md        # Main project README
```

## 🔀 How to Split into Separate Repositories

### Option 1: Create New Repositories (Recommended)

#### Frontend Repository Setup

1. **Create a new GitHub repository** named `nobrokernocry-frontend`
2. **Initialize and push frontend code:**
   ```bash
   cd client
   git init
   git add .
   git commit -m "Initial commit: Frontend application"
   git remote add origin https://github.com/yourusername/nobrokernocry-frontend.git
   git push -u origin main
   ```

3. **Add `.gitignore`** (if not present):
   ```
   node_modules/
   dist/
   .env
   .env.local
   .vite/
   *.log
   ```

#### Backend Repository Setup

1. **Create a new GitHub repository** named `nobrokernocry-backend`
2. **Initialize and push backend code:**
   ```bash
   cd server
   git init
   git add .
   git commit -m "Initial commit: Backend API"
   git remote add origin https://github.com/yourusername/nobrokernocry-backend.git
   git push -u origin main
   ```

### Option 2: Use Git Submodules

If you want to keep a main repository that references both:

```bash
# Main repository
git init
git submodule add https://github.com/yourusername/nobrokernocry-frontend.git client
git submodule add https://github.com/yourusername/nobrokernocry-backend.git server
```

## 📋 Repository-Specific Files

### Frontend Repository (`nobrokernocry-frontend`)

**Should include:**
- `client/` directory contents
- `README.md` (frontend-specific)
- `.gitignore` (frontend-specific)
- `.github/workflows/` (if using CI/CD)
- `netlify.toml` or `vercel.json` (deployment config)

**Should NOT include:**
- `server/` directory
- Backend-related files

### Backend Repository (`nobrokernocry-backend`)

**Should include:**
- `server/` directory contents
- `README.md` (backend-specific)
- `.gitignore` (backend-specific)
- `.github/workflows/` (if using CI/CD)
- `render.yaml` or deployment configs

**Should NOT include:**
- `client/` directory
- Frontend-related files

## 🔧 Development Workflow

### Local Development

1. **Clone both repositories:**
   ```bash
   git clone https://github.com/yourusername/nobrokernocry-frontend.git
   git clone https://github.com/yourusername/nobrokernocry-backend.git
   ```

2. **Set up frontend:**
   ```bash
   cd nobrokernocry-frontend
   npm install
   npm run dev
   ```

3. **Set up backend:**
   ```bash
   cd nobrokernocry-backend
   npm install
   npm run dev
   ```

### Environment Configuration

Each repository should have its own `.env` file:

**Frontend `.env`:**
```env
VITE_API_BASE=http://localhost:5000/api
```

**Backend `.env`:**
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
# ... other backend env vars
```

## 🚀 Deployment

### Frontend Deployment

Deploy the frontend repository independently:

- **Netlify**: Connect GitHub repo, set build command `npm run build`, output `dist`
- **Vercel**: Connect GitHub repo, auto-detects Vite
- **GitHub Pages**: Use GitHub Actions to build and deploy

### Backend Deployment

Deploy the backend repository independently:

- **Render**: Connect GitHub repo, set start command `npm start`
- **Heroku**: Connect GitHub repo, auto-detects Node.js
- **AWS/DigitalOcean**: Deploy via CI/CD or manually

## 🔗 Connecting Frontend and Backend

### Development
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Frontend API base: `http://localhost:5000/api`

### Production
- Update `VITE_API_BASE` in frontend to production backend URL
- Configure CORS on backend to allow frontend domain
- Use environment variables for different environments

## 📝 Version Control Best Practices

### Frontend Repository
- Commit frontend-specific changes
- Use semantic versioning for releases
- Tag releases: `v1.0.0`, `v1.1.0`, etc.

### Backend Repository
- Commit backend-specific changes
- Use semantic versioning for releases
- Tag releases: `v1.0.0`, `v1.1.0`, etc.

### Synchronization
- Keep API contracts in sync
- Document breaking changes
- Use API versioning if needed (`/api/v1/`)

## 🔐 Security Considerations

### Separate Secrets
- Frontend: Only public environment variables
- Backend: All sensitive secrets (JWT_SECRET, API keys, etc.)

### CORS Configuration
Backend should only allow requests from:
- Frontend development URL (localhost:5173)
- Frontend production URL (your deployed domain)

## 📊 CI/CD Setup

### Frontend CI/CD
```yaml
# .github/workflows/deploy-frontend.yml
name: Deploy Frontend
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      # Deploy to Netlify/Vercel
```

### Backend CI/CD
```yaml
# .github/workflows/deploy-backend.yml
name: Deploy Backend
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test  # If you have tests
      # Deploy to Render/Heroku
```

## 🎯 Benefits of Separate Repositories

1. **Independent Deployment**: Deploy frontend and backend separately
2. **Team Collaboration**: Different teams can work on each repository
3. **Version Control**: Independent versioning and release cycles
4. **Security**: Better isolation of secrets and credentials
5. **Scalability**: Scale each service independently
6. **Technology Flexibility**: Can use different technologies/versions

## 📞 Support

For questions about repository structure or setup, please contact the development team.



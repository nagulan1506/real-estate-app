# Deployment Guide

## Frontend (Netlify)

The frontend is deployed at: https://storied-brigadeiros-76e5b9.netlify.app/

### Environment Variables

You need to set the following environment variable in Netlify:

1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add a new variable:
   - **Key**: `VITE_API_BASE`
   - **Value**: `https://real-estate-app-h0om.onrender.com/api`

5. **Redeploy** your site after adding the environment variable

### Alternative: Set in netlify.toml

The `netlify.toml` file has been updated to include the backend URL, but you should also set it as an environment variable in Netlify dashboard for better control.

## Backend (Render)

The backend is deployed at: https://real-estate-app-h0om.onrender.com

### Environment Variables Required

Set these in your Render dashboard:

- `PORT` (usually auto-set by Render)
- `MONGODB_URI` (your MongoDB connection string)
- `JWT_SECRET` (your secret key for JWT tokens)
- `FRONTEND_URL` (should be: `https://storied-brigadeiros-76e5b9.netlify.app`)
- `GEMINI_API_KEY` (optional, for AI features)
- `RAZORPAY_KEY_ID` (optional, for payments)
- `RAZORPAY_KEY_SECRET` (optional, for payments)
- `EMAIL_USER` (optional, for email features)
- `EMAIL_PASS` (optional, for email features)

### CORS Configuration

The backend CORS is configured to allow all origins. For production, you may want to restrict it to your Netlify domain:

```javascript
app.use(cors({
  origin: ['https://storied-brigadeiros-76e5b9.netlify.app', 'http://localhost:5173']
}));
```

## Troubleshooting

### Frontend not showing listings/agents

1. **Check API Base URL**: 
   - Open browser console (F12)
   - Look for "API Base URL: ..." log message
   - Should show: `https://real-estate-app-h0om.onrender.com/api`

2. **Check Network Tab**:
   - Open browser DevTools → Network tab
   - Try to load the page
   - Check if requests to `/api/properties` or `/api/agents` are failing
   - Look for CORS errors or 404 errors

3. **Verify Backend is Running**:
   - Visit: https://real-estate-app-h0om.onrender.com/api/health
   - Should return: `{"status":"ok","dbConnected":true/false}`

4. **Check Environment Variables**:
   - In Netlify dashboard, verify `VITE_API_BASE` is set correctly
   - Redeploy after setting environment variables

### Backend not responding

1. **Check Render Dashboard**:
   - Verify the service is running (not sleeping)
   - Check logs for errors

2. **Check Health Endpoint**:
   - Visit: https://real-estate-app-h0om.onrender.com/api/health
   - If it times out, the service might be sleeping (free tier)

3. **Wake Up Service**:
   - Free tier services on Render sleep after inactivity
   - First request may take 30-60 seconds to wake up
   - Subsequent requests should be fast

## Quick Fix for Current Deployment

To fix the current Netlify deployment:

1. **Option 1: Set Environment Variable in Netlify**
   - Go to Netlify dashboard
   - Site settings → Environment variables
   - Add: `VITE_API_BASE` = `https://real-estate-app-h0om.onrender.com/api`
   - Trigger a new deployment

2. **Option 2: Rebuild with Updated Code**
   - The code has been updated to auto-detect production
   - Push changes to your repository
   - Netlify will auto-deploy
   - The frontend will automatically use the Render backend URL

## Testing

After deployment, test these endpoints:

- Frontend: https://storied-brigadeiros-76e5b9.netlify.app/
- Backend Health: https://real-estate-app-h0om.onrender.com/api/health
- Backend Properties: https://real-estate-app-h0om.onrender.com/api/properties
- Backend Agents: https://real-estate-app-h0om.onrender.com/api/agents



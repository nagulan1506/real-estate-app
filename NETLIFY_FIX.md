# Quick Fix for Netlify Deployment

## Problem
The frontend on Netlify (https://storied-brigadeiros-76e5b9.netlify.app/) is not showing listings and agents because it's trying to connect to `/api` (relative URL) instead of the deployed backend on Render.

## Solution

The code has been updated to automatically detect production and use the correct backend URL. You have two options:

### Option 1: Set Environment Variable in Netlify (Recommended)

1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your site: `storied-brigadeiros-76e5b9`
3. Go to **Site settings** → **Environment variables**
4. Click **Add variable**
5. Add:
   - **Key**: `VITE_API_BASE`
   - **Value**: `https://real-estate-app-h0om.onrender.com/api`
6. Click **Save**
7. Go to **Deploys** tab
8. Click **Trigger deploy** → **Deploy site**

### Option 2: Push Updated Code (Automatic Fix)

The code has been updated to automatically detect when it's running on Netlify and use the Render backend URL. Just:

1. Commit and push the updated code to your repository
2. Netlify will automatically redeploy
3. The frontend will now connect to the correct backend

## Verify It's Working

After deployment:

1. Open https://storied-brigadeiros-76e5b9.netlify.app/
2. Open browser console (F12)
3. Look for log message: `API Base URL: https://real-estate-app-h0om.onrender.com/api`
4. Check Network tab - API calls should go to Render backend
5. Listings and agents should now appear

## Backend Status

Make sure your backend on Render is running:
- Backend URL: https://real-estate-app-h0om.onrender.com
- Health check: https://real-estate-app-h0om.onrender.com/api/health
- Properties: https://real-estate-app-h0om.onrender.com/api/properties
- Agents: https://real-estate-app-h0om.onrender.com/api/agents

If the backend is sleeping (free tier), the first request may take 30-60 seconds to wake up.



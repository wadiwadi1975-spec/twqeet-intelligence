# منصتي MINASATI - Deployment Guide

## Local Usage
1. Double-click `تشغيل-الموقع.bat` to start
2. Open http://localhost:3000
3. Double-click `إيقاف-الموقع.bat` to stop

## Deploy to Internet (Free)

### Frontend (Vercel)
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import `twqeet-intelligence` repo
5. Set Root Directory to `frontend`
6. Deploy

### Backend (Render)
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New Web Service"
4. Import `twqeet-intelligence` repo
5. Set Root Directory to `backend`
6. Build Command: `npm install && npm run build`
7. Start Command: `node dist/main.js`
8. Deploy

### After Deployment
1. Update `.env.production` with your Render backend URL
2. Redeploy Vercel frontend

## Login
- Email: admin@twqeet.com
- Password: admin123

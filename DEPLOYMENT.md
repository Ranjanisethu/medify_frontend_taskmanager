# Deploying Your PERN Stack App

This guide walks you through deploying your Task Management Application.
We will deploy the **Database** to Supabase, the **Backend** to Render, and the **Frontend** to Vercel.

## 1. Prerequisites
- GitHub Account
- [Supabase Account](https://supabase.com/) (Free)
- [Render Account](https://render.com/) (Free)
- [Vercel Account](https://vercel.com/) (Free)

## 2. Push Code to GitHub
Ensure your code is pushed to a fresh GitHub repository.
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## 3. Database Setup (Supabase)
1.  Create a new project in Supabase.
2.  Go to **Project Settings** -> **Database**.
3.  Copy the **Connection String** (use the "Nodejs" tab).
    *   It looks like: `postgres://postgres.xxxx:password@aws-0-region.pooler.supabase.com:5432/postgres`
    *   *Tip: Use the "Transaction Mode" port (6543) if you encounter timeout issues, but port 5432 is standard.*
    *   **Important**: Save your database password!

## 4. Backend Deployment (Render)
1.  Dashboard -> **New +** -> **Web Service**.
2.  Connect your GitHub repo.
3.  **Root Directory**: `backend`
4.  **Runtime**: `Node`
5.  **Build Command**: `npm install`
6.  **Start Command**: `npm start`
7.  **Environment Variables**:
    *   `DATABASE_URL`: Paste your Supabase connection string.
    *   `JWT_SECRET`: Enter a secure random string (e.g., `my_secret_123`).
    *   `PORT`: `10000` (Render uses this default, but Express will bind to it).
8.  Click **Create Web Service**.
9.  Wait for deployment. Copy your **Service URL** (e.g., `https://my-api.onrender.com`).

## 5. Frontend Deployment (Vercel)
1.  Dashboard -> **Add New...** -> **Project**.
2.  Import your GitHub repo.
3.  **Framework Preset**: Vite
4.  **Root Directory**: Edit -> Select `frontend`.
5.  **Environment Variables**:
    *   `VITE_API_URL`: Paste your **Render Backend URL** (e.g., `https://my-api.onrender.com/api`).
    *   *Note: Do NOT add a trailing slash, and ensure `/api` is included if your backend routes are prefixed with it.*
6.  Click **Deploy**.

## 6. Verify
1.  Open your Vercel URL.
2.  Register a new user.
    *   *If it works, your Frontend -> Backend -> Database connection is solid!* 🎉

---

### Troubleshooting
*   **CORS Error**: If you see CORS errors in the browser console, go to `backend/src/app.js` and ensure `cors()` is enabled. For production, you might need to set `origin: 'https://your-vercel-app.vercel.app'`.
*   **Database Error**: Check Render logs. If connection fails, ensure you allowed "All IP addresses" (0.0.0.0/0) in Supabase Network settings (default is usually allowed).

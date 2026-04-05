# Deployment Guide

This project is split into two apps:

- `Frontend/` is the React UI
- `Backend/` is the Node.js API that talks to MongoDB and OpenRouter

## 1. Push to GitHub

- Make sure `.env` files are not committed.
- Commit the source code, `package.json`, and the env example files only.

## 2. Set up MongoDB Atlas

- Create a MongoDB Atlas cluster.
- Create a database user.
- Copy the connection string into `Backend/.env` as `MONGODB_URI`.

## 3. Deploy the backend

Recommended platforms:

- Render
- Railway
- Fly.io

Backend environment variables:

- `MONGODB_URI`
- `OPENROUTER_API_KEY`
- `CORS_ORIGIN`
- `PORT` if your platform requires it

Backend start command:

```bash
npm start
```

## 4. Deploy the frontend

Recommended platforms:

- Vercel
- Netlify

Frontend environment variables:

- `VITE_API_BASE_URL`

Set it to your deployed backend URL, for example:

```bash
https://your-backend.onrender.com
```

## 5. Security checklist

- Keep `OPENROUTER_API_KEY` only on the backend.
- Restrict `CORS_ORIGIN` to your frontend domain.
- Use a separate key for production.
- Add rate limiting before opening the app to a large audience.
- Set spend limits or usage alerts on the API provider if available.

## 6. Local development

Frontend:

```bash
cd Frontend
npm run dev
```

Backend:

```bash
cd Backend
npm start
```

If you keep the frontend env file unset locally, Vite proxying will send `/chat` requests to `http://localhost:3000`.

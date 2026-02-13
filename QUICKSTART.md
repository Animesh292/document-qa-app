# Quick Start Guide - 5 Minutes to Running App

## ⚡ Fast Setup (Local Development)

### Step 1: Backend Setup (2 minutes)

```bash
cd backend
npm install
```

Create `.env` file in `backend/` directory:
```
OPENAI_API_KEY=your_new_api_key_here
PORT=5000
```

Start backend:
```bash
npm start
```

✅ Backend running at `http://localhost:5000`

---

### Step 2: Frontend Setup (2 minutes)

Open a NEW terminal:

```bash
cd frontend
npm install
npm start
```

✅ Frontend running at `http://localhost:3000`

---

### Step 3: Test It! (1 minute)

1. Browser opens automatically at `http://localhost:3000`
2. Click "Upload" → select a .txt file → Upload
3. Click "Ask Questions" → type a question → Get Answer
4. Check "Status" page for system health

---

## 🚀 Deployment (Production)

### Backend - Deploy to Render

1. Push code to GitHub
2. Go to [Render.com](https://render.com)
3. Create new "Web Service"
4. Connect your repo → select `backend` folder
5. Set environment variables:
   - `OPENAI_API_KEY` = your_key
6. Deploy!

Your backend URL: `https://your-app.onrender.com`

---

## 📝 Before You Submit

### 1. Update ABOUTME.md
- Add your name, email, resume
- Fill in your information

### 2. Test Everything
- Upload a document ✓
- Ask a question ✓
- Check status page ✓
- Delete a document ✓

### 3. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Document Q&A System"
git remote add origin https://github.com/yourusername/document-qa-app.git
git push -u origin main
```

---

## 🎯 Submission Checklist

- [ ] Backend deployed and running
- [ ] Frontend deployed and running
- [ ] Status page shows all services healthy
- [ ] Can upload documents
- [ ] Can ask questions and get answers
- [ ] ABOUTME.md filled out
- [ ] GitHub repo link ready
- [ ] Live app link ready

---

## 🐛 Quick Troubleshooting

**Backend won't start:**
```bash
# Check if .env exists
ls backend/.env

# Check API key is set
cat backend/.env | grep OPENAI_API_KEY
```

**Frontend can't connect:**
```bash
# Check backend is running
curl http://localhost:5000/api/health
```

**LLM unhealthy:**
- Check API key is correct
- Verify you have OpenAI credits
- Test API key at https://platform.openai.com/

---

## 💡 Tips for Fast Completion

1. **Use the uploaded API key SECURELY** - keep it in .env only
2. **Don't customize too much** - the app works as-is
3. **Test locally first** before deploying
4. **Deploy backend first**, then frontend
5. **Keep it simple** - focus on functionality over features

---

**Total Time: ~30 minutes including deployments**

Good luck! 🚀

# Deployment Guide for Render

This guide will help you deploy the Document Q&A application to Render.

## Prerequisites

- GitHub account with your code pushed to a repository
- Render account (free tier works fine)
- Google Gemini API key

## Backend Deployment (Already Complete ✓)

Your backend is already deployed at: `https://document-qa-app-jeq7.onrender.com/`

## Frontend Deployment Steps

### Step 1: Update Frontend Environment Variable

In your Render dashboard for the frontend service:

1. Go to your frontend service: `document-qa-frontend-qy5h`
2. Click on **Environment** in the left sidebar
3. Add a new environment variable:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://document-qa-app-jeq7.onrender.com`
4. Click **Save Changes**

### Step 2: Trigger a Redeploy

After adding the environment variable:

1. Go to the **Manual Deploy** section
2. Click **Deploy latest commit** or **Clear build cache & deploy**
3. Wait for the build to complete (this will take a few minutes)

The build should now complete without ESLint warnings since we've fixed all the React Hook dependency issues.

### Step 3: Verify Deployment

Once deployed, visit your frontend URL: `https://document-qa-frontend-qy5h.onrender.com`

1. **Check Status Page**: Navigate to the Status page and verify all three components show as "Healthy":
   - Backend Server ✓
   - Database ✓
   - LLM Connection ✓

2. **Test Upload**: Go to Upload page and upload a `.txt` file

3. **Test Q&A**: Go to Ask Questions page and ask a question about your uploaded document

## Troubleshooting

### Frontend shows "Failed to connect to backend"
- Verify the `REACT_APP_API_URL` environment variable is set correctly
- Make sure you redeployed after adding the environment variable
- Check that the backend URL is accessible: `https://document-qa-app-jeq7.onrender.com/api/health`

### Backend shows "LLM Connection Unhealthy"
- Verify your `GOOGLE_API_KEY` is set correctly in the backend environment variables
- Check that your Google Gemini API key is valid and has credits

### Files not uploading
- Check browser console for errors
- Verify the backend `/api/upload` endpoint is working
- Ensure file size is under 5MB and file type is `.txt`

## Using Render's Auto-Deploy

To enable automatic deployments when you push to GitHub:

1. In your Render service settings
2. Go to **Settings** → **Build & Deploy**
3. Enable **Auto-Deploy**
4. Select your branch (usually `main` or `master`)

Now every time you push to GitHub, Render will automatically rebuild and deploy your application!

## Cost

Both services can run on Render's free tier:
- Free tier services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- Upgrade to paid tier ($7/month per service) for always-on instances

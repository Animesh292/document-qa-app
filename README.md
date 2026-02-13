# Document Q&A System

A full-stack web application that allows users to upload text documents and ask questions about them using AI-powered analysis. The system uses Gemini's flash-2.5 to find relevant information and provide answers with source citations.

## Features

- **Document Upload**: Upload multiple .txt files (up to 5MB each)
- **AI-Powered Q&A**: Ask natural language questions about uploaded documents
- **Source Citation**: Get answers with references to specific documents and relevant text excerpts
- **System Health Monitoring**: Real-time status checks for backend, database, and LLM connection
- **User-Friendly Interface**: Clean, responsive React-based UI

## Tech Stack

**Frontend:**
- React.js 18
- React Router for navigation
- Axios for API calls
- CSS3 for styling

**Backend:**
- Node.js with Express.js
- Multer for file upload handling
- Google's Gemini (Flash-2.5)
- File system for document storage

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google's gemini flash API key

## Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd document-qa-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```
GOOGLE_API_KEY=googleai_api_key_here
PORT=5000
```

Start the backend server:

```bash
npm start
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory (optional for local development):

```
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm start
```

Frontend will run on `http://localhost:3000`

## How to Use

### Step 1: Upload Documents
1. Navigate to the "Upload" page
2. Select a .txt file from your computer
3. Click "Upload File"
4. Repeat for multiple documents

### Step 2: Ask Questions
1. Go to the "Ask Questions" page
2. Type your question in the text area
3. Click "Get Answer"
4. View the answer with source citation and relevant text excerpt

### Step 3: Monitor System Status
1. Visit the "Status" page
2. Check the health of:
   - Backend server
   - Database (file storage)
   - LLM connection

## Project Structure

```
document-qa-app/
├── backend/
│   ├── server.js              # Express server
│   ├── llmService.js          # OpenAI integration
│   ├── documentService.js     # Document operations
│   ├── uploads/               # Uploaded documents
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.js
│   │   │   ├── UploadPage.js
│   │   │   ├── QAPage.js
│   │   │   └── StatusPage.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── README.md
├── AI_NOTES.md
├── ABOUTME.md
└── PROMPTS_USED.md
```

## Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect your repository to Render or Railway
3. Set environment variables (GOOGLE_API_KEY)
4. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project to Vercel
3. Set environment variable: `REACT_APP_API_URL=<backend-url>`
4. Deploy

## What's Implemented

- Document upload functionality (with validation)
- File storage system
- Gemini integration for Q&A
- Source citation and text extraction
- System health monitoring
- Responsive UI with clear navigation
- Error handling and validation
- Document management (view and delete)

## What's Not Implemented

- PDF/DOCX support (currently only .txt files)
- User authentication
- Database persistence (uses file system)
- Advanced document chunking/embedding
- Multi-language support
- Document versioning

##  Security Notes

- Never commit `.env` files
- Keep your OpenAI API key private
- Add `.env` to `.gitignore`
- Use environment variables for sensitive data

## API Endpoints

**Backend API:**

- `GET /api/health` - System health check
- `POST /api/upload` - Upload document
- `GET /api/documents` - List all documents
- `DELETE /api/documents/:filename` - Delete document
- `POST /api/ask` - Ask a question

## Troubleshooting

**Backend not starting:**
- Check if PORT 5000 is available
- Verify Gemini API key is set correctly in `.env`

**Frontend can't connect to backend:**
- Ensure backend is running on port 5000
- Check CORS settings if needed

**LLM connection unhealthy:**
- Verify Google API key is valid
- Check internet connection
- Ensure you have API credits

##  License

MIT

##  Author

See [ABOUTME.md](ABOUTME.md) for author information.

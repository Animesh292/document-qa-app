require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { askQuestion, checkLLMConnection } = require('./llmService');
const { getDocuments, getDocumentContent, deleteDocument } = require('./documentService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept only .txt files
    if (file.mimetype === 'text/plain' || path.extname(file.originalname).toLowerCase() === '.txt') {
      cb(null, true);
    } else {
      cb(new Error('Only .txt files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

// Routes

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const backendStatus = 'healthy';
  const databaseStatus = fs.existsSync(uploadsDir) ? 'healthy' : 'unhealthy';
  
  let llmStatus = 'unknown';
  try {
    const llmCheck = await checkLLMConnection();
    llmStatus = llmCheck ? 'healthy' : 'unhealthy';
  } catch (error) {
    llmStatus = 'unhealthy';
  }

  res.json({
    backend: backendStatus,
    database: databaseStatus,
    llm: llmStatus,
    timestamp: new Date().toISOString()
  });
});

// Upload document
app.post('/api/upload', upload.single('document'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({
      message: 'File uploaded successfully',
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      path: req.file.path
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all uploaded documents
app.get('/api/documents', (req, res) => {
  try {
    const documents = getDocuments();
    res.json({ documents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a document
app.delete('/api/documents/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const result = deleteDocument(filename);
    if (result.success) {
      res.json({ message: 'Document deleted successfully' });
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ask a question
app.post('/api/ask', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim() === '') {
      return res.status(400).json({ error: 'Question is required' });
    }

    const documents = getDocuments();
    
    if (documents.length === 0) {
      return res.status(400).json({ error: 'No documents uploaded. Please upload documents first.' });
    }

    // Get content from all documents
    const documentContents = documents.map(doc => ({
      filename: doc.originalName,
      content: getDocumentContent(doc.filename)
    }));

    // Ask question using LLM
    const answer = await askQuestion(question, documentContents);

    res.json({
      question,
      answer: answer.answer,
      source: answer.source,
      relevantText: answer.relevantText
    });

  } catch (error) {
    console.error('Error in /api/ask:', error);
    res.status(500).json({ error: error.message });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Document Q&A API is running' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File is too large. Maximum size is 5MB.' });
    }
  }
  res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Upload directory: ${uploadsDir}`);
});

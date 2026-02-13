# Prompts Used During Development

This document records the prompts used with AI assistants during the development of this project.

---

## Backend Development

**Prompt 1: OpenAI Integration**
```
Help me in implementing Google Gemini API integration for document Q&A:
- Read all uploaded documents
- Create context from document contents
- Ask flash-2.5 to answer questions based only on document content
- Return answer with source citation and relevant text excerpt
- Handle JSON parsing and errors
```

**Prompt 4: Document Service**
```
Now that we've implemented open AI integration help me in implementing document service module that handles:
- Getting list of all uploaded documents
- Reading document content
- Deleting documents
- File system operations with proper error handling
```

---

## Frontend Development

**Prompt 5: React App Structure**
```
Create a React app with:
- React Router for navigation
- HomePage with clear step-by-step instructions
- UploadPage for file uploads
- QAPage for asking questions
- StatusPage for health monitoring
- Clean, modern UI with gradient background
```

**Prompt 6: Upload Component**
```
Create an UploadPage component that:
- Allows file selection with validation (.txt only, max 5MB)
- Shows upload progress
- Displays list of uploaded documents
- Allows deletion of documents
- Shows success/error messages
- Handles all edge cases
```

**Prompt 7: Q&A Component**
```
Create a QAPage component that:
- Has a textarea for questions
- Shows loading state while processing
- Displays answers with source information
- Shows relevant text excerpts highlighted
- Handles empty documents state
- Provides helpful tips for better results
```

**Prompt 8: Status Page**
```
Create a StatusPage that:
- Checks backend, database, and LLM health
- Shows color-coded status indicators
- Auto-refreshes every 30 seconds
- Has manual refresh button
- Shows last checked timestamp
- Handles connection errors gracefully
```

---

## Styling and UX

**Prompt 9: CSS Styling**
```
Create comprehensive CSS with:
- Modern gradient background
- Card-based layouts
- Responsive design for mobile
- Smooth transitions and hover effects
- Loading spinners
- Alert components (success, error, info)
- Status indicators
- Clean typography
```

**Prompt 10: Error Handling UX**
```
Improve user experience by:
- Adding clear error messages for all failure cases
- Showing helpful guidance when documents are missing
- Validating inputs before submission
- Providing loading indicators for async operations
- Making all error messages user-friendly
```

---

## Testing and Refinement

**Prompt 11: File Upload Testing**
```
Test file upload with:
- Valid .txt files
- Invalid file types
- Files larger than 5MB
- Empty file selections
- Multiple rapid uploads
```

**Prompt 12: Q&A Testing**
```
Test question answering with:
- Simple factual questions
- Questions requiring inference
- Questions with no answer in documents
- Empty question submissions
- Very long questions
```

---

## Documentation

**Prompt 13: README Creation**
```
Create a comprehensive README.md with:
- Project overview and features
- Tech stack
- Installation instructions for both backend and frontend
- Usage guide
- Project structure
- Deployment instructions
- What's implemented and what's not
- Troubleshooting section
```

**Prompt 14: AI Notes Documentation**
```
Document AI usage including:
- Which LLM provider and model used
- What AI was used for (code generation, etc.)
- What was manually reviewed/implemented
- Testing performed
- Limitations encountered
- Manual adjustments made
- Best practices followed
```

---

## Prompt Engineering for Gemini

**Prompt 15: System Prompt for Document Q&A**
```
You are a helpful assistant that answers questions based on provided documents.

Below are the documents:
[DOCUMENTS]

Question: [USER_QUESTION]

Instructions:
1. Answer the question based ONLY on the information in the documents above
2. Identify which document contains the answer
3. Quote the relevant text from that document
4. If the answer is not in the documents, say "I cannot find the answer in the provided documents"

Respond in the following JSON format:
{
  "answer": "your answer here",
  "source": "filename of the document",
  "relevantText": "exact quote from the document that supports your answer"
}
```

---

## Debugging and Fixes

**Prompt 16: JSON Parsing Fix**
```
The OpenAI API sometimes returns responses wrapped in markdown code blocks.
Add logic to clean the response by removing ```json and ``` before parsing.
```

**Prompt 17: File Naming Improvement**
```
Improve file naming to avoid conflicts:
- Add timestamp prefix to uploaded files
- Store original filename for display
- Handle duplicate names gracefully
```

**Prompt 18: CORS Configuration**
```
Add CORS configuration to Express server to allow frontend requests from localhost:3000
during development and from deployed frontend URL in production.
```

---

## Deployment Preparation

**Prompt 19: Environment Variables**
```
Set up environment variables for:
- Backend: OPENAI_API_KEY, PORT
- Frontend: REACT_APP_API_URL
- Create .env.example files
- Add .env to .gitignore
```

**Prompt 20: Production Build**
```
Prepare for deployment:
- Update API_URL to use environment variable
- Test production build: npm run build
- Ensure all routes work in production
- Verify error handling in production mode
```

---

## Notes

- All prompts were iterative; responses were reviewed and refined
- Security considerations were double-checked manually
- Testing was performed after each major feature implementation
- Code was reviewed for best practices and potential vulnerabilities
- Environment variables were never exposed in prompts or code

---

*This document contains only the prompts used, not the AI responses or any sensitive information like API keys.*

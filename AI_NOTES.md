# AI Usage Notes

This document outlines what AI assistance was used for and what was manually reviewed/implemented.

## LLM Provider Used

**Provider:** Gemini  
**Model:** gemini-2.5-flash  
**Reason for Choice:**
- Completely Free
- Fast response times
- Good performance for document Q&A tasks
- Reliable JSON output formatting
- Easy to use

## What AI Was Used For

### 1. Code Generation (with Claude AI)
- React component structure
- CSS styling framework
- API endpoint implementations in frontend


### 3. Frontend Components
-  React component scaffolding
-  Form handling logic
-  State management patterns
-  JSON format extraction from LLM responses

### 4. Documentation
-  README structure
-  Setup instructions

## What Was Manually Reviewed/Implemented

### 1. Code Implementation
-  Initial project structure setup
-  Backend Express server boilerplate
-  Multer configuration for file uploads
-  OpenAI API integration code

### 2. Document Processing Logic
-  File validation logic (file type, size)
-  Document storage and retrieval functions
-  Context building for LLM prompts


### 3. LLM Integration
-  Prompt engineering for Q&A
-  Response parsing and error handling

### 4. Code Review
-  Reviewed all generated code for correctness
-  Tested file upload functionality manually
-  Verified error handling edge cases
-  Checked security concerns (file size limits, input validation)

### 5. API Integration
-  Tested Gemini API calls with various prompts
-  Validated response formats and error cases
-  Adjusted temperature and max_tokens for optimal results

### 6. Testing
- Manual testing of all features:
- File upload with various file types
- Question answering with different documents
- Error scenarios (no documents, empty questions)
- Health check endpoints
- Responsive design testing on different screen sizes

### 7. Configuration
-  Environment variable setup verified
-  CORS configuration tested
-  Port configuration validated

### 8. Prompt Engineering
-   Refined LLM prompts based on testing
-   Added JSON format instructions for structured responses
-   Improved source citation accuracy through prompt tuning

### 9. Error Handling
-   Added custom error messages for better UX
-   Implemented fallback mechanisms for LLM failures
-   Added validation for all user inputs

## AI Limitations Encountered

1. **Initial JSON parsing issues** - AI-generated responses sometimes included markdown code blocks; added cleaning logic
2. **Generic error messages** - Customized error handling for better user experience
3. **CSS organization** - Refactored AI-generated styles for maintainability

## Manual Adjustments Made

1. **Prompt optimization** - Adjusted system prompts for better source citation
2. **File naming** - Improved uploaded file naming to include timestamps
3. **UI refinements** - Enhanced visual feedback for loading states
4. **Error messages** - Made error messages more user-friendly
5. **Status page polling** - Added 30-second auto-refresh for health checks

## Best Practices Followed

- Never committed API keys to version control
- Used environment variables for configuration
- Added comprehensive error handling
- Implemented input validation on both frontend and backend
- Followed REST API conventions
- Used semantic HTML and accessible components
- Maintained clean code structure with separation of concerns

## Learning Points

1. **LLM Response Variability**: LLM responses aren't always perfectly formatted; robust parsing is essential
2. **File Upload Security**: Always validate file types and sizes on the backend
3. **Error Handling**: User-facing errors should be informative but not expose system internals
4. **API Key Management**: Critical to keep keys out of version control from the start
5. **Testing**: Manual testing revealed edge cases that weren't initially considered

## Future Improvements

1. Add unit tests for backend services
2. Implement document chunking for better context management
3. Add support for PDF and DOCX files
4. Implement caching to reduce API calls
5. Add rate limiting for API endpoints
6. Use vector embeddings for more accurate document retrieval

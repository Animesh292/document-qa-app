import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QAPage() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState('');
  const [documents, setDocuments] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/documents`);
      setDocuments(response.data.documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    if (documents.length === 0) {
      setError('No documents uploaded. Please upload documents first.');
      return;
    }

    setLoading(true);
    setError('');
    setAnswer(null);

    try {
      const response = await axios.post(`${API_URL}/api/ask`, {
        question: question.trim()
      });

      setAnswer(response.data);
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to get answer. Please try again.');
      setAnswer(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuestion('');
    setAnswer(null);
    setError('');
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Ask Questions</h1>
      <p className="page-subtitle">
        Ask questions about your uploaded documents and get AI-powered answers with source citations.
      </p>

      {documents.length === 0 && (
        <div className="alert alert-info">
          No documents uploaded yet. Please upload documents first from the{' '}
          <a href="/upload" style={{ color: '#0c5460', fontWeight: 'bold' }}>Upload page</a>.
        </div>
      )}

      {documents.length > 0 && (
        <div className="alert alert-info">
          {documents.length} document{documents.length !== 1 ? 's' : ''} available for Q&A
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="question-input">
              Your Question
            </label>
            <textarea
              id="question-input"
              className="form-textarea"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., What is the main topic discussed in the documents?"
              disabled={loading || documents.length === 0}
              rows="4"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading || !question.trim() || documents.length === 0}
            >
              {loading ? (
                <>
                  <span className="loading"></span> Processing...
                </>
              ) : (
                'Get Answer'
              )}
            </button>

            {(question || answer) && (
              <button 
                type="button"
                onClick={handleClear}
                className="btn btn-secondary"
                disabled={loading}
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>

      {answer && (
        <div className="answer-container">
          <div className="answer-label">Answer:</div>
          <div className="answer-text">{answer.answer}</div>

          {answer.source && answer.source !== 'Unknown' && (
            <div className="source-info">
              <div className="source-label">
                <strong>Source Document:</strong> {answer.source}
              </div>
              
              {answer.relevantText && answer.relevantText !== 'Unable to extract specific text' && (
                <div style={{ marginTop: '1rem' }}>
                  <div className="source-label">
                    <strong>Relevant Text from Document:</strong>
                  </div>
                  <div className="relevant-text">
                    "{answer.relevantText}"
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {documents.length > 0 && (
        <div className="card" style={{ marginTop: '2rem', background: '#f0f7ff' }}>
          <h3 style={{ color: '#333', marginBottom: '1rem' }}>Tips for Better Results</h3>
          <ul style={{ 
            listStyle: 'disc',
            paddingLeft: '1.5rem',
            color: '#666',
            lineHeight: '1.8'
          }}>
            <li>Ask specific questions about the content in your documents</li>
            <li>Use clear and concise language</li>
            <li>Questions about facts, definitions, or specific information work best</li>
            <li>The AI will only answer based on the uploaded documents</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default QAPage;

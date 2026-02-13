import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Welcome to Document Q&A System</h1>
      <p className="page-subtitle">
        Upload your text documents and ask questions to get instant answers with source citations.
      </p>

      <div className="steps-container">
        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>How it works:</h2>
        
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: '#667eea',
              minWidth: '40px'
            }}>
              1
            </div>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>Upload Documents</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Go to the Upload page and upload your .txt files. You can upload multiple documents.
              </p>
              <Link to="/upload">
                <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Go to Upload
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: '#667eea',
              minWidth: '40px'
            }}>
              2
            </div>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>Ask Questions</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Once documents are uploaded, navigate to the Ask Questions page and type your question.
                Our AI will search through your documents and provide an answer with the source citation.
              </p>
              <Link to="/qa">
                <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Ask Questions
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: '#667eea',
              minWidth: '40px'
            }}>
              3
            </div>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>Check System Status</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Monitor the health of the backend, database, and LLM connection from the Status page.
              </p>
              <Link to="/status">
                <button className="btn btn-secondary" style={{ marginTop: '1rem' }}>
                  View Status
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem', background: '#f0f7ff' }}>
        <h3 style={{ color: '#333', marginBottom: '1rem' }}>Features</h3>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0,
          display: 'grid',
          gap: '0.75rem'
        }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#667eea' }}>✓</span>
            <span>Upload multiple .txt documents</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#667eea' }}>✓</span>
            <span>Ask natural language questions</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#667eea' }}>✓</span>
            <span>Get answers with source citations</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#667eea' }}>✓</span>
            <span>View relevant text excerpts from documents</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#667eea' }}>✓</span>
            <span>Real-time system health monitoring</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;

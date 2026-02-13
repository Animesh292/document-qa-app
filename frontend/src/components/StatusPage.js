import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StatusPage() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastChecked, setLastChecked] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    checkStatus();
    // Refresh status every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkStatus = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`${API_URL}/api/health`);
      setStatus(response.data);
      setLastChecked(new Date());
      setError('');
    } catch (err) {
      setError('Failed to connect to backend. Please check if the server is running.');
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <span className="status-indicator status-healthy"></span>;
      case 'unhealthy':
        return <span className="status-indicator status-unhealthy"></span>;
      default:
        return <span className="status-indicator status-unknown"></span>;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'healthy':
        return 'Healthy';
      case 'unhealthy':
        return 'Unhealthy';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return '#28a745';
      case 'unhealthy':
        return '#dc3545';
      default:
        return '#ffc107';
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">System Status</h1>
      <p className="page-subtitle">
        Monitor the health of backend server, database, and LLM connection in real-time.
      </p>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {lastChecked && !error && (
        <div className="alert alert-info">
          Last checked: {lastChecked.toLocaleTimeString()}
        </div>
      )}

      {loading && !status ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="loading" style={{ 
            width: '40px', 
            height: '40px',
            borderWidth: '4px',
            borderTopColor: '#667eea'
          }}></div>
          <p style={{ marginTop: '1rem', color: '#666' }}>Checking system status...</p>
        </div>
      ) : status ? (
        <>
          <div className="card">
            <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Component Status</h2>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '6px'
              }}>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    Backend Server
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    Express.js API server
                  </div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontWeight: '600',
                  color: getStatusColor(status.backend)
                }}>
                  {getStatusIcon(status.backend)}
                  {getStatusText(status.backend)}
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '6px'
              }}>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    Database
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    File storage system
                  </div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontWeight: '600',
                  color: getStatusColor(status.database)
                }}>
                  {getStatusIcon(status.database)}
                  {getStatusText(status.database)}
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '6px'
              }}>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    LLM Connection
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    Google Gemini API (gemini-2.5-flash)
                  </div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontWeight: '600',
                  color: getStatusColor(status.llm)
                }}>
                  {getStatusIcon(status.llm)}
                  {getStatusText(status.llm)}
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>Status Legend</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="status-indicator status-healthy"></span>
                <span><strong>Healthy:</strong> Component is working correctly</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="status-indicator status-unhealthy"></span>
                <span><strong>Unhealthy:</strong> Component has issues</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="status-indicator status-unknown"></span>
                <span><strong>Unknown:</strong> Status cannot be determined</span>
              </div>
            </div>
          </div>

          <button 
            onClick={checkStatus} 
            className="btn btn-primary"
            disabled={loading}
            style={{ marginTop: '1rem' }}
          >
            {loading ? 'Refreshing...' : 'Refresh Status'}
          </button>
        </>
      ) : null}
    </div>
  );
}

export default StatusPage;

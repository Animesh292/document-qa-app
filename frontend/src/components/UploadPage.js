import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [documents, setDocuments] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const fetchDocuments = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/documents`);
      setDocuments(response.data.documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setSelectedFile(null);
      setMessage({ type: '', text: '' });
      return;
    }

    // Validate file type
    if (!file.name.endsWith('.txt')) {
      setMessage({
        type: 'error',
        text: 'Only .txt files are allowed'
      });
      setSelectedFile(null);
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({
        type: 'error',
        text: 'File size must be less than 5MB'
      });
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setMessage({ type: '', text: '' });
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setMessage({
        type: 'error',
        text: 'Please select a file first'
      });
      return;
    }

    setUploading(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('document', selectedFile);

    try {
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage({
        type: 'success',
        text: `File "${response.data.originalName}" uploaded successfully!`
      });
      setSelectedFile(null);

      // Reset file input
      document.getElementById('file-input').value = '';

      // Refresh document list
      fetchDocuments();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to upload file'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename) => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/documents/${filename}`);
      setMessage({
        type: 'success',
        text: 'Document deleted successfully'
      });
      fetchDocuments();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to delete document'
      });
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Upload Documents</h1>
      <p className="page-subtitle">
        Upload .txt files to build your document library. Maximum file size: 5MB
      </p>

      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="card">
        <form onSubmit={handleUpload}>
          <div className="form-group">
            <label className="form-label" htmlFor="file-input">
              Select a .txt file
            </label>
            <input
              id="file-input"
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="form-input"
              disabled={uploading}
            />
            {selectedFile && (
              <p style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
                Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!selectedFile || uploading}
          >
            {uploading ? (
              <>
                <span className="loading"></span> Uploading...
              </>
            ) : (
              'Upload File'
            )}
          </button>
        </form>
      </div>

      {documents.length > 0 && (
        <div className="document-list">
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>
            Uploaded Documents ({documents.length})
          </h2>

          {documents.map((doc) => (
            <div key={doc.filename} className="document-item">
              <div className="document-info">
                <div className="document-name">
                  📄 {doc.originalName}
                </div>
                <div className="document-meta">
                  {formatFileSize(doc.size)} • Uploaded {formatDate(doc.uploadedAt)}
                </div>
              </div>
              <button
                onClick={() => handleDelete(doc.filename)}
                className="btn btn-danger"
                style={{ padding: '0.5rem 1rem' }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {documents.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem', background: '#f8f9fa' }}>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            No documents uploaded yet. Upload your first document to get started!
          </p>
        </div>
      )}
    </div>
  );
}

export default UploadPage;

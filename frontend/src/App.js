import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import UploadPage from './components/UploadPage';
import QAPage from './components/QAPage';
import StatusPage from './components/StatusPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              📄 Document Q&A
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/upload" className="nav-link">Upload</Link>
              </li>
              <li className="nav-item">
                <Link to="/qa" className="nav-link">Ask Questions</Link>
              </li>
              <li className="nav-item">
                <Link to="/status" className="nav-link">Status</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/qa" element={<QAPage />} />
            <Route path="/status" element={<StatusPage />} />
          </Routes>
        </div>

        <footer className="footer">
          <p>Document Q&A System © 2026</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

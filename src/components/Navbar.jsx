import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand" style={{cursor:'pointer'}} onClick={() => navigate('/') }>
          <img src="/logo.png" alt="PiForce Academy Logo" className="nav-logo" />
          <span>Pi Force Academy</span>
        </div>
        {/* Desktop Navigation - hidden on mobile/tablet by CSS */}
        <div className="nav-links desktop-nav">
          <button onClick={() => navigate('/')}>
            <i className="fas fa-home"></i> Home
          </button>
          <button onClick={() => navigate('/about')}>
            <i className="fas fa-info-circle"></i> About
          </button>
          <button onClick={() => navigate('/resources')}>
            <i className="fas fa-book"></i> Resources
          </button>
          <button onClick={() => navigate('/gpa')}>
            <i className="fas fa-calculator"></i> GPA
          </button>
          <button onClick={() => navigate('/chatbot')}>
            <i className="fas fa-robot"></i> AI Chat
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
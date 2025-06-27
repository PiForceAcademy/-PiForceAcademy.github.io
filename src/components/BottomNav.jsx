import React from 'react';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { key: 'home', icon: 'fas fa-home', label: 'Home', path: '/' },
  { key: 'about', icon: 'fas fa-info-circle', label: 'About', path: '/about' },
  { key: 'resources', icon: 'fas fa-book', label: 'Resources', path: '/resources' },
  { key: 'gpa', icon: 'fas fa-calculator', label: 'GPA', path: '/gpa' },
  { key: 'chatbot', icon: 'fas fa-robot', label: 'AI Chat', path: '/chatbot' },
];

const BottomNav = () => {
  const navigate = useNavigate();
  return (
    <nav className="bottom-nav">
      {navItems.map(item => (
        <button
          key={item.key}
          className={`bottom-nav-btn`}
          onClick={() => navigate(item.path)}
          aria-label={item.label}
        >
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav; 
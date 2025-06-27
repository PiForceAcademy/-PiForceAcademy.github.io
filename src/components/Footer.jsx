import React from 'react';

const Footer = ({ setCurrentPage }) => (
  <footer className="footer">
    <div className="footer-main">
      <div className="footer-brand-contact">
        <h3 className="footer-brand">PiForce Academy</h3>
        <p className="footer-desc">
          Fueling Minds, Shaping Futures
        </p>
        <div className="social-links">
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="https://x.com/PiForceAcademy" target="_blank" rel="noopener noreferrer" aria-label="X"><i className="fab fa-x-twitter"></i></a>
          <a href="https://www.instagram.com/piforce.academy/" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          <a href="https://www.youtube.com/channel/UCKSFhaNy26FKt9XDI94KTDA" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          <a href="https://www.tiktok.com/@piforce.academy" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
          <a href="mailto:piforceacademy@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Gmail"><i className="fas fa-envelope"></i></a>
        </div>
      </div>
      <div className="footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li><button type="button" onClick={() => { setCurrentPage('resources'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>Resources</button></li>
          <li><button type="button" onClick={() => { setCurrentPage('about'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>About</button></li>
          <li><button type="button" onClick={() => { setCurrentPage('gpa'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>GPA Calculator</button></li>
          <li><button type="button" onClick={() => { setCurrentPage('chatbot'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>AI Assistant</button></li>
          <li><button type="button" disabled style={{opacity:0.7, cursor:'not-allowed'}}>COUNTDOWN</button></li>
          <li><button type="button" disabled style={{opacity:0.7, cursor:'not-allowed'}}>NEWS</button></li>
        </ul>
      </div>
      <div className="footer-levels">
        <h4>Education Levels</h4>
        <ul>
          <li><button type="button" onClick={() => setCurrentPage('ble')}>Basic Level Examination – BLE</button></li>
          <li><button type="button" onClick={() => setCurrentPage('see')}>Secondary Education Examination – SEE</button></li>
          <li><button type="button" onClick={() => setCurrentPage('plus2')}>Higher Secondary Education – +2</button></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2025 PiForce Academy. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer; 
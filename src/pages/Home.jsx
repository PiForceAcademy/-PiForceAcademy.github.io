import React from 'react';
import { useNavigate } from 'react-router-dom';

const academicLevels = [
  {
    icon: <i className="fas fa-graduation-cap"></i>,
    level: 'BLE',
    fullName: 'Basic Level Examination (Grade 8)',
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies'],
    button: 'Grade 8',
    buttonColor: 'linear-gradient(90deg, #6a5af9 0%, #705df2 100%)',
  },
  {
    icon: <i className="fas fa-book"></i>,
    level: 'SEE',
    fullName: 'Secondary Education Examination (Grade 10)',
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Computer'],
    button: 'Grade 10',
    buttonColor: 'linear-gradient(90deg, #6a5af9 0%, #705df2 100%)',
  },
  {
    icon: <i className="fas fa-university"></i>,
    level: '+2',
    fullName: 'Higher Secondary Education (Grade 11-12)',
    subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science'],
    button: 'Grade 11-12',
    buttonColor: 'linear-gradient(90deg, #6a5af9 0%, #705df2 100%)',
  },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to PiForce Academy</h1>
          <p>Your comprehensive academic resource platform for BLE, SEE, and +2 students</p>
        </div>
      </div>

      {/* Academic Levels Card Grid */}
      <section className="academic-levels-section">
        <h2 className="academic-levels-title">Academic Levels</h2>
        <div className="academic-levels-grid">
          {academicLevels.map((level, idx) => (
            <div className="academic-level-card" key={level.level}>
              <div className="academic-level-icon">{level.icon}</div>
              <div className="academic-level-name">{level.level}</div>
              <div className="academic-level-full">{level.fullName}</div>
              <button
                className="academic-level-btn"
                style={{ background: level.buttonColor }}
                onClick={() => {
                  if (level.level === 'BLE') navigate('/resources/ble');
                  else if (level.level === 'SEE') navigate('/resources/see');
                  else if (level.level === '+2') navigate('/resources/plus2');
                }}
              >
                {level.button}
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="features-section">
        <h2>Platform Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-book-open"></i></div>
            <h3>Latest Curriculum</h3>
            <p>Access the most up-to-date curriculum for all levels and subjects.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-file-alt"></i></div>
            <h3>Model Question</h3>
            <p>Practice with model questions designed for exam preparation.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-archive"></i></div>
            <h3>PYQ Question Banks</h3>
            <p>Explore a comprehensive bank of previous years' questions (PYQ).</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-calculator"></i></div>
            <h3>GPA Calculator</h3>
            <p>Calculate your Grade Point Average easily for SEE and +2 levels.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-sticky-note"></i></div>
            <h3>Notes and Summaries</h3>
            <p>Access concise notes and summaries for quick revision.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-key"></i></div>
            <h3>Solution and Answer Keys</h3>
            <p>Find solutions and answer keys for model and past questions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 
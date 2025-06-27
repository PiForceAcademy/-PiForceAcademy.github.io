import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const academicLevels = [
  {
    icon: <i className="fas fa-graduation-cap"></i>,
    level: 'BLE',
    fullName: 'Basic Level Examination (Grade 8)',
    button: 'Grade 8',
    buttonColor: 'linear-gradient(90deg, #6a5af9 0%, #705df2 100%)',
  },
  {
    icon: <i className="fas fa-book"></i>,
    level: 'SEE',
    fullName: 'Secondary Education Examination (Grade 10)',
    button: 'Grade 10',
    buttonColor: 'linear-gradient(90deg, #6a5af9 0%, #705df2 100%)',
  },
  {
    icon: <i className="fas fa-university"></i>,
    level: '+2',
    fullName: 'Higher Secondary Education (Grade 11-12)',
    button: 'Grade 11-12',
    buttonColor: 'linear-gradient(90deg, #6a5af9 0%, #705df2 100%)',
  },
];

const bleResourceOptions = [
  { label: 'PYQ', value: 'pyq' },
  { label: 'Notes', value: 'notes' },
  { label: 'Model Collection', value: 'model-collection' },
];

const Resources = ({ initialGrade }) => {
  const [selectedGrade, setSelectedGrade] = useState(initialGrade || 'BLE');
  const [bleResourceType, setBleResourceType] = useState('pyq-notes');
  const navigate = useNavigate();

  return (
    <div className="resources-page">
      <section className="academic-levels-section">
        <h2 className="academic-levels-title">Choose Your Level</h2>
        <div className="academic-levels-grid">
          {academicLevels.map((level) => (
            <div
              className="academic-level-card"
              key={level.level}
              style={{
                border: selectedGrade === level.level ? '2.5px solid #5C33CF' : undefined,
                boxShadow: selectedGrade === level.level ? '0 8px 32px rgba(92, 51, 207, 0.13)' : undefined,
              }}
            >
              <div className="academic-level-icon">{level.icon}</div>
              <div className="academic-level-name">{level.level}</div>
              <div className="academic-level-full">{level.fullName}</div>
              <button
                className="academic-level-btn"
                style={{ background: level.buttonColor, opacity: selectedGrade === level.level ? 1 : 0.85 }}
                onClick={() => {
                  setSelectedGrade(level.level);
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
    </div>
  );
};

export default Resources; 
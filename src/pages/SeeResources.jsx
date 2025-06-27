import React, { useState } from 'react';

const seeResourceOptions = [
  { label: 'PYQ', value: 'pyq' },
  { label: 'Notes', value: 'notes' },
  { label: 'Model Collection', value: 'model-collection' },
];

const seeNotesCards = [
  { name: 'CDC ENGLISH BOOK CLASS 10', url: 'https://drive.google.com/file/d/1icI8Vakr-Tp6IoTUBnMD2Bj5Lm1mywjG/view?usp=sharing' },
  { name: 'CDC MATHEMATICS BOOK CLASS 10', url: 'https://drive.google.com/file/d/1pR3k1iZ3uvaBoAj-6N9bs8KM_WC5v5Q3/view?usp=drive_link' },
  { name: 'CDC NEPALI BOOK CLASS 10', url: 'https://drive.google.com/file/d/1iU6eOdEZb9y3odo2QZtOSbjn6dEO1wJq/view?usp=sharing' },
  { name: 'CDC SOCIAL BOOK CLASS 10', url: 'https://drive.google.com/file/d/1f1JVw-TJ90g1RDCkt6ziP6UWn39FF45p/view?usp=sharing' },
  { name: 'CDC SCIENCE ENGLISH MEDIUM CLASS 10', url: 'https://drive.google.com/file/d/1iVCcvHp3G_rgK2zjislFO0NFKiKEyb2Q/view?usp=sharing' },
  { name: 'CDC SCIENCE NEPALI MEDIUM CLASS 10', url: 'https://drive.google.com/file/d/1pEBGuDmhX-GAdZVG4-szVr2Bed8tvlUY/view?usp=sharing' },
  { name: 'CDC MATHEMATICS NEPALI MEDIUM CLASS 10', url: 'https://drive.google.com/file/d/1bNK7StSZq9U79mJKyL4ZWOd6VVSFjkH2/view?usp=sharing' },
];

const SeeResources = () => {
  const [selectedOption, setSelectedOption] = useState('pyq');

  return (
    <div className="see-resources-page">
      <h2>SEE Resources</h2>
      <div style={{ margin: '2rem 0', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        {seeResourceOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedOption(option.value)}
            style={{
              padding: '0.5rem 1.2rem',
              borderRadius: '20px',
              border: selectedOption === option.value ? '2px solid #5C33CF' : '1px solid #ccc',
              background: selectedOption === option.value ? '#f3f0ff' : '#fff',
              color: selectedOption === option.value ? '#5C33CF' : '#333',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h3>Selected: {seeResourceOptions.find(opt => opt.value === selectedOption).label}</h3>
        {/* Display resources for the selected option here */}
        {selectedOption === 'pyq' && (
          <div style={{ marginTop: '2.5rem', color: '#aaa', fontSize: '1.25rem', fontWeight: 600 }}>
            Coming soon...
          </div>
        )}
        {selectedOption === 'notes' && (
          <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '2.2rem', justifyContent: 'center' }}>
            {seeNotesCards.map(card => (
              <div key={card.name} style={{
                background: 'rgba(255,255,255,0.55)',
                borderRadius: '24px',
                boxShadow: '0 8px 32px rgba(92, 51, 207, 0.18)',
                padding: '2.2rem 2.4rem',
                minWidth: '220px',
                maxWidth: '260px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2.5px solid',
                borderImage: 'linear-gradient(90deg, #6a5af9 0%, #705df2 100%) 1',
                transition: 'box-shadow 0.25s, transform 0.2s',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseOver={e => {
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(92, 51, 207, 0.22)';
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.04)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(92, 51, 207, 0.18)';
                e.currentTarget.style.transform = 'none';
              }}
              >
                <div style={{
                  background: 'linear-gradient(135deg, #6a5af9 0%, #705df2 100%)',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.1rem',
                  boxShadow: '0 2px 8px rgba(92, 51, 207, 0.10)',
                }}>
                  <i className="fas fa-book-open" style={{ color: '#fff', fontSize: '1.4rem' }}></i>
                </div>
                <span style={{ fontWeight: 700, fontSize: '1.08rem', marginBottom: '0.2rem', color: '#5C33CF', letterSpacing: '0.5px', textAlign: 'center' }}>
                  <span style={{ color: '#6a5af9', fontWeight: 800, fontSize: '1.12rem', letterSpacing: '1px' }}>CDC</span>
                  {card.name.replace('CDC', '')}
                </span>
                <div style={{ display: 'flex', gap: '1.1rem', marginTop: '1.1rem' }}>
                  <a href={card.url} target="_blank" rel="noopener noreferrer" style={{
                    color: '#fff',
                    background: 'linear-gradient(90deg, #6a5af9 0%, #705df2 100%)',
                    padding: '0.45rem 1.2rem',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(92, 51, 207, 0.13)',
                    border: 'none',
                    fontSize: '0.98rem',
                    letterSpacing: '0.2px',
                    transition: 'background 0.2s',
                  }}>View</a>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedOption === 'model-collection' && (
          <div style={{ marginTop: '2.5rem', color: '#aaa', fontSize: '1.25rem', fontWeight: 600 }}>
            Coming soon...
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeResources; 
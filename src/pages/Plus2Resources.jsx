import React, { useState } from 'react';

const plus2ResourceOptions = [
  { label: 'PYQ', value: 'pyq' },
  { label: 'Notes', value: 'notes' },
  { label: 'Model Collection', value: 'model-collection' },
];

const Plus2Resources = () => {
  const [selectedOption, setSelectedOption] = useState('pyq');

  return (
    <div className="plus2-resources-page">
      <h2>+2 Resources</h2>
      <div style={{ margin: '2rem 0', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        {plus2ResourceOptions.map((option) => (
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
        <h3>Selected: {plus2ResourceOptions.find(opt => opt.value === selectedOption).label}</h3>
        {/* Display resources for the selected option here */}
        {selectedOption === 'pyq' && (
          <div style={{ marginTop: '2.5rem', color: '#aaa', fontSize: '1.25rem', fontWeight: 600 }}>
            Coming soon...
          </div>
        )}
        {selectedOption === 'notes' && (
          <div style={{ marginTop: '2.5rem', color: '#aaa', fontSize: '1.25rem', fontWeight: 600 }}>
            Coming soon...
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

export default Plus2Resources; 
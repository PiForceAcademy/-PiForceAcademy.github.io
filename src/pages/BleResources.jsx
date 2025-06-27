import React, { useState } from 'react';

const bleResourceOptions = [
  { label: 'PYQ', value: 'pyq' },
  { label: 'Notes', value: 'notes' },
  { label: 'Model Collection', value: 'model-collection' },
];

const pyqPdfs = [
  { name: 'Science 2081 BLE', url: 'https://drive.google.com/file/d/14q87JFMhyVvvXTG2ZczBa270X8NW2PKl/view?usp=sharing' },
  { name: 'Math 2081 BLE', url: 'https://drive.google.com/file/d/1EJHLiCB-UYZ8X3SHvus4daPxuXzA7xhQ/view?usp=sharing' },
  { name: 'Nepali 2081 BLE', url: 'https://drive.google.com/file/d/11n0HBs1DlvpmbBnrj-gsQHl3FixP_lFJ/view?usp=sharing' },
  { name: 'English 2081 BLE', url: 'https://drive.google.com/file/d/1zxGj3JYfAXUyrgXSsRUVfPI_sQGTEEL9/view?usp=sharing' },
  { name: 'Social 2081 BLE', url: 'https://drive.google.com/file/d/18vWDaWgKkAWbFmmeXOBgIqlaxZ4w6u1i/view?usp=sharing' },
];

const BleResources = () => {
  const [selectedOption, setSelectedOption] = useState('pyq');

  return (
    <div className="ble-resources-page">
      <h2>BLE Resources</h2>
      <div style={{ margin: '2rem 0', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        {bleResourceOptions.map((option) => (
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
        <h3>Selected: {bleResourceOptions.find(opt => opt.value === selectedOption).label}</h3>
        {/* Display resources for the selected option here */}
        {selectedOption === 'pyq' && (
          <div style={{ marginTop: '1.5rem' }}>
            <h4>Past Year Question Papers (PYQ)</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.2rem', justifyContent: 'center' }}>
              {pyqPdfs.map((pdf, idx) => (
                <div key={pdf.url} style={{
                  background: 'rgba(255,255,255,0.55)',
                  borderRadius: '24px',
                  boxShadow: '0 8px 32px rgba(92, 51, 207, 0.18)',
                  padding: '2.2rem 2.4rem',
                  minWidth: '250px',
                  maxWidth: '300px',
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
                  {/* Decorative PDF icon */}
                  <div style={{
                    background: 'linear-gradient(135deg, #6a5af9 0%, #705df2 100%)',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.1rem',
                    boxShadow: '0 2px 8px rgba(92, 51, 207, 0.10)',
                  }}>
                    <i className="fas fa-file-pdf" style={{ color: '#fff', fontSize: '1.6rem' }}></i>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '1.18rem', marginBottom: '1.3rem', color: '#5C33CF', letterSpacing: '0.5px', textAlign: 'center' }}>{pdf.name}</span>
                  <div style={{ display: 'flex', gap: '1.3rem' }}>
                    <a href={pdf.url} target="_blank" rel="noopener noreferrer" style={{
                      color: '#fff',
                      background: 'linear-gradient(90deg, #6a5af9 0%, #705df2 100%)',
                      padding: '0.55rem 1.4rem',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      fontWeight: 700,
                      boxShadow: '0 2px 8px rgba(92, 51, 207, 0.13)',
                      border: 'none',
                      fontSize: '1.05rem',
                      letterSpacing: '0.2px',
                      transition: 'background 0.2s',
                    }}>View</a>
                  </div>
                </div>
              ))}
            </div>
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

export default BleResources; 
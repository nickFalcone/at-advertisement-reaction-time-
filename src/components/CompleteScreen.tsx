import React from 'react';

interface CompleteScreenProps {
  onExport: () => void;
}

const CompleteScreen: React.FC<CompleteScreenProps> = ({ onExport }) => {
  return (
    <div className="complete-screen" style={{ textAlign: 'center' }}>
      <h1>Thank you!</h1>
      <p>You have completed all trials.</p>
      <button 
        onClick={onExport}
        style={{
          padding: '12px 24px',
          fontSize: '18px',
          borderRadius: '4px',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Export Results
      </button>
    </div>
  );
};

export default CompleteScreen;

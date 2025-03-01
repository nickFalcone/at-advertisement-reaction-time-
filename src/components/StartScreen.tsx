import React from 'react';

interface StartScreenProps {
  onStart: () => void;
  hasPartialResults: boolean;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, hasPartialResults }) => {
  return (
    <div className="start-screen" style={{ textAlign: 'center' }}>
      <h1>Reaction Time Test</h1>
      {hasPartialResults && (
        <p>You have incomplete test data. Starting will create a new test.</p>
      )}
      <button 
        onClick={onStart}
        style={{
          padding: '12px 24px',
          fontSize: '18px',
          borderRadius: '4px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Start
      </button>
    </div>
  );
};

export default StartScreen;

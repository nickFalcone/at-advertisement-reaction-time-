import React from 'react';

interface StartScreenProps {
  onStart: () => void;
  hasPartialResults?: boolean;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, hasPartialResults = false }) => {
  return (
    <div className="start-screen">
      <h1>Reaction Time Test</h1>
      <p>After clicking start, focus on the cross. You will see a series of images appear.</p>
      <p>As soon as you see an image appear, press the up arrow or down arrow on your keyboard.</p>
      {hasPartialResults && (
        <em>You have incomplete test data. Starting will create a new test.</em>
      )}
      <p></p>
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

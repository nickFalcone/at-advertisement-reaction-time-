import React from 'react';
import CrossDisplay from './CrossDisplay';

interface TestScreenProps {
  isImageShown: boolean;
  currentImage: { id: string; src: string } | null;
}

const TestScreen: React.FC<TestScreenProps> = ({ isImageShown, currentImage }) => {
  return (
    <div className="test-screen" style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      height: '550px'
    }}>
      {isImageShown && currentImage ? (
        <img 
          src={currentImage.src} 
          alt={currentImage.id} 
          style={{ maxHeight: '550px', maxWidth: '550px' }}
        />
      ) : (
        <CrossDisplay />
      )}
    </div>
  );
};

export default TestScreen;

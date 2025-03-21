import React from 'react';
import { useReactionTest } from './hooks/useReactionTest';
import StartScreen from './components/StartScreen';
import TestScreen from './components/TestScreen';
import CompleteScreen from './components/CompleteScreen';
import './app.css';

const App: React.FC = () => {
  const { 
    state, 
    startTest, 
    isImageShown, 
    currentImage, 
    exportResults 
  } = useReactionTest();

  return (
    <div className="app" style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100vh'
    }}>
      {state === 'start' && (
        <StartScreen 
          onStart={startTest} 
        />
      )}
      
      {state === 'testing' && (
        <TestScreen 
          isImageShown={isImageShown} 
          currentImage={currentImage} 
        />
      )}
      
      {state === 'complete' && (
        <CompleteScreen onExport={exportResults} />
      )}
    </div>
  );
};

export default App;

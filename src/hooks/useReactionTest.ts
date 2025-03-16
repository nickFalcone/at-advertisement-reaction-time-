import { useState, useEffect, useCallback, useRef } from 'react';
import { AppState, TestResult, ArrowPress } from '../types';
import { saveResults, getResults, clearResults } from '../utils/storage';
import { downloadCSV } from '../utils/csv';
import { shuffleImages, getRandomDelay } from '../utils/image';

export const useReactionTest = () => {
  // Clear any partial results on initial load
  useEffect(() => {
    clearResults();
  }, []);

  const [state, setState] = useState<AppState>('start');
  const [results, setResults] = useState<TestResult[]>([]);
  const [currentTrial, setCurrentTrial] = useState<number>(0);
  const [isImageShown, setIsImageShown] = useState<boolean>(false);
  const [shuffledImages, setShuffledImages] = useState(shuffleImages());
  
  // Refs to track timing
  const imageShowTimeRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  
  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Handle key presses
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isImageShown || state !== 'testing') return;
      
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        const now = Date.now();
        const arrowPress: ArrowPress = event.key === 'ArrowUp' ? 'Up' : 'Down';
        
        if (imageShowTimeRef.current) {
          // Calculate reaction time in seconds
          const reactionTime = (now - imageShowTimeRef.current) / 1000;
          
          // Store result
          const newResult: TestResult = {
            image: shuffledImages[currentTrial].id,
            arrowPress,
            reactionTime
          };
          
          const updatedResults = [...results, newResult];
          setResults(updatedResults);
          saveResults(updatedResults);
          
          // Move to next trial or complete
          if (currentTrial < shuffledImages.length - 1) {
            setIsImageShown(false);
            setCurrentTrial(prev => prev + 1);
            scheduleNextImage();
          } else {
            setState('complete');
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isImageShown, state, currentTrial, results, shuffledImages]);

  // Function to schedule the next image display
  const scheduleNextImage = useCallback(() => {
    const delay = getRandomDelay();
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = window.setTimeout(() => {
      setIsImageShown(true);
      imageShowTimeRef.current = Date.now();
    }, delay);
  }, []);

  // Start the test
  const startTest = useCallback(() => {
    setShuffledImages(shuffleImages());
    setCurrentTrial(0);
    setState('testing');
    scheduleNextImage();
  }, [scheduleNextImage]);

  // Export results and reset
  const exportResults = useCallback(() => {
    downloadCSV(results);
    setResults([]);
    clearResults();
    setState('start');
  }, [results]);

  return {
    state,
    startTest,
    results,
    currentTrial,
    isImageShown,
    currentImage: currentTrial < shuffledImages.length ? shuffledImages[currentTrial] : null,
    exportResults
  };
};

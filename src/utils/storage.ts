import { TestResult } from '../types';

const STORAGE_KEY = 'reactionTestResults';

export const saveResults = (results: TestResult[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch (error) {
    console.error('Error saving results to localStorage:', error);
  }
};

export const getResults = (): TestResult[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving results from localStorage:', error);
    return [];
  }
};

export const clearResults = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing results from localStorage:', error);
  }
};

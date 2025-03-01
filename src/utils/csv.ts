import { TestResult } from '../types';

export const generateCSV = (results: TestResult[]): string => {
  const headers = 'image,arrowPress,reactionTime\n';
  
  const rows = results.map(result => 
    `${result.image},${result.arrowPress},${result.reactionTime}`
  ).join('\n');
  
  return headers + rows;
};

export const downloadCSV = (results: TestResult[]): void => {
  const csvContent = generateCSV(results);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'reaction_test_results.csv');
  document.body.appendChild(link);
  
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

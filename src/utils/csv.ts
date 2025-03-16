import { TestResult } from '../types';

const imageMap: { [key: string]: string } = {
  'image1': 'Chipotle 1',
  'image2': 'Chipotle 2',
  'image3': 'HM 2',
  'image4': 'iPhone 1',
  'image5': 'iPhone 3',
  'image6': 'Lenovo 1',
  'image7': 'Lenovo 3',
  'image8': 'Levis 1',
  'image9': 'Levis 2',
  'image10': 'McDonalds 2',
  'image11': 'Chipotle 3',
  'image12': 'HM 1',
  'image13': 'HM 3',
  'image14': 'iPhone 2',
  'image15': 'Lenovo 2',
  'image16': 'Levis 3',
  'image17': 'McDonalds 1',
  'image18': 'McDonalds 3',
};

export const generateCSV = (results: TestResult[]): string => {
  const headers = 'image,arrowPress,reactionTime\n';
  
  const rows = results.map(result => 
    `${imageMap[result.image] || result.image},${result.arrowPress},${result.reactionTime}`
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

// Add typings for Vite's import.meta.glob
/// <reference types="vite/client" />

// Use Vite's import.meta.glob to load images
const imageModules = import.meta.glob('../images/*.jpg', { eager: true });

// Create an array of image objects from the modules
export const images = Object.entries(imageModules).map(([path, module]) => {
  // Extract image number from path (e.g., "../images/12.jpg" -> "12")
  const id = path.split('/').pop()?.replace('.jpg', '') || '';
  return {
    id: `image${id}`,
    src: (module as any).default
  };
});

// Fisher-Yates shuffle algorithm to randomize image order
export const shuffleImages = () => {
  const shuffled = [...images];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate a random delay between 1-10 seconds (in milliseconds)
export const getRandomDelay = (): number => {
  return (Math.floor(Math.random() * 9000) + 1000); // 1000-10000ms (1-10s)
};

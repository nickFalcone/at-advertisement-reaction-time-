// Create an array of 10 placeholder image paths
// In a real app, you'd import actual images
export const images = Array.from({ length: 10 }, (_, i) => ({
  id: `image${i + 1}`,
  src: `https://via.placeholder.com/300?text=Image+${i + 1}`
}));

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

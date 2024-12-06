// Generate realistic random growth rates based on time period
export const getRandomGrowth = (days) => {
  // Shorter periods tend to have higher daily growth rates
  const baseRate = days <= 7 ? 0.02 : days <= 30 ? 0.015 : 0.01;
  
  // Add some randomness but keep it consistent for the same time period
  const variance = 0.005;
  const randomFactor = Math.random() * variance;
  
  return baseRate + randomFactor;
};
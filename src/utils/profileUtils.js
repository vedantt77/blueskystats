import { getRandomGrowth } from './mockDataUtils';

export const calculateGrowthMetrics = (profile, timeRange = 30) => {
  // Generate realistic historical data based on current values
  const calculatePreviousValue = (currentValue, days) => {
    const dailyGrowth = getRandomGrowth(days);
    let previousValue = currentValue;
    
    // Work backwards to calculate previous value
    for (let i = 0; i < days; i++) {
      previousValue = Math.floor(previousValue / (1 + dailyGrowth));
    }
    
    return Math.max(0, previousValue);
  };

  return {
    followers: {
      current: profile.followersCount,
      previous: calculatePreviousValue(profile.followersCount, timeRange)
    },
    following: {
      current: profile.followsCount,
      previous: calculatePreviousValue(profile.followsCount, timeRange)
    },
    posts: {
      current: profile.postsCount,
      previous: calculatePreviousValue(profile.postsCount, timeRange)
    }
  };
};
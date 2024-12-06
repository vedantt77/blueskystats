export const calculateGrowthMetrics = (profile, days = 30) => {
  // Calculate previous values based on the selected time range
  const calculatePreviousValue = (current, days) => {
    // Simulate historical data with a decay factor based on time range
    const decayFactor = days === 7 ? 0.05 : days === 30 ? 0.1 : 0.15;
    const reduction = Math.floor(current * decayFactor);
    return Math.max(0, current - reduction);
  };

  return {
    followers: {
      current: profile.followersCount,
      previous: calculatePreviousValue(profile.followersCount, days)
    },
    following: {
      current: profile.followsCount,
      previous: calculatePreviousValue(profile.followsCount, days)
    },
    posts: {
      current: profile.postsCount,
      previous: calculatePreviousValue(profile.postsCount, days)
    }
  };
};
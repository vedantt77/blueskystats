export const calculateGrowthMetrics = (profile) => {
  // In a real application, you would compare with historical data
  // For now, we'll simulate previous values for demonstration
  const simulatePreviousValue = (current) => {
    const reduction = Math.floor(current * 0.1);
    return Math.max(0, current - reduction);
  };

  return {
    followers: {
      current: profile.followersCount,
      previous: simulatePreviousValue(profile.followersCount)
    },
    following: {
      current: profile.followsCount,
      previous: simulatePreviousValue(profile.followsCount)
    },
    posts: {
      current: profile.postsCount,
      previous: simulatePreviousValue(profile.postsCount)
    }
  };
};
export const processActivityData = (data) => {
  const today = new Date();
  const weeks = [];
  const monthlyStats = {};
  const days = [];

  // Process last 365 days in reverse (oldest to newest)
  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateKey = date.toISOString().split('T')[0];
    const count = data[dateKey] || 0;
    
    // Add to days array
    days.push({ date, count });

    // Add to monthly stats
    const monthKey = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    monthlyStats[monthKey] = (monthlyStats[monthKey] || 0) + count;

    // Group into weeks (7 days each)
    if (days.length % 7 === 0) {
      weeks.push(days.slice(-7));
    }
  }

  // Convert monthly stats to sorted array
  const sortedMonthlyStats = Object.entries(monthlyStats)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => {
      const [aMonth, aYear] = a.month.split(' ');
      const [bMonth, bYear] = b.month.split(' ');
      if (aYear !== bYear) return parseInt(bYear) - parseInt(aYear);
      return new Date(Date.parse(`${aMonth} 1 ${aYear}`)) - new Date(Date.parse(`${bMonth} 1 ${aYear}`));
    })
    .slice(0, 6); // Last 6 months

  return {
    processedData: { weeks, days },
    monthlyStats: sortedMonthlyStats
  };
};

export const calculateStreak = (days) => {
  let currentStreak = 0;
  let longestStreak = 0;
  let streak = 0;

  // Calculate streaks from newest to oldest
  for (let i = days.length - 1; i >= 0; i--) {
    const today = new Date().toISOString().split('T')[0];
    const dayDate = days[i].date.toISOString().split('T')[0];
    
    if (days[i].count > 0) {
      streak++;
      // Only update current streak if we're still counting consecutive days up to today
      if (i === days.length - 1 || dayDate === today) {
        currentStreak = streak;
      }
      longestStreak = Math.max(longestStreak, streak);
    } else {
      // Break the streak
      if (i === days.length - 1) {
        currentStreak = 0;
      }
      streak = 0;
    }
  }

  return { currentStreak, longestStreak };
};
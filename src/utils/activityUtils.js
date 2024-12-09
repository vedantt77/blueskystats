export const processActivityData = (data) => {
  const today = new Date();
  const weeks = [];
  const monthlyStats = new Map();
  const days = [];

  // Process last 365 days
  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateKey = date.toISOString().split('T')[0];
    const count = data[dateKey] || 0;
    
    days.push({ date, count });

    // Add to monthly stats
    const monthKey = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    const currentCount = monthlyStats.get(monthKey) || 0;
    monthlyStats.set(monthKey, currentCount + count);

    // Group into weeks
    if (days.length % 7 === 0) {
      weeks.push(days.slice(-7));
    }
  }

  // Convert monthly stats to sorted array
  const sortedMonthlyStats = Array.from(monthlyStats.entries())
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => {
      const [aMonth, aYear] = a.month.split(' ');
      const [bMonth, bYear] = b.month.split(' ');
      return new Date(Date.parse(`${bMonth} 1 ${bYear}`)) - new Date(Date.parse(`${aMonth} 1 ${aYear}`));
    });

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
    if (days[i].count > 0) {
      streak++;
      // Update current streak only for the most recent continuous streak
      if (i === days.length - 1 || streak === 1) {
        currentStreak = streak;
      }
      longestStreak = Math.max(longestStreak, streak);
    } else {
      streak = 0;
    }
  }

  return { currentStreak, longestStreak };
};

export const scrollToCurrentMonth = () => {
  const currentMonthElement = document.querySelector('[data-current-month="true"]');
  if (currentMonthElement) {
    currentMonthElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
};
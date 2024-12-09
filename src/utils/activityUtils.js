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
  let lastPostDate = null;

  // Calculate streaks from newest to oldest
  for (let i = days.length - 1; i >= 0; i--) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const postDate = new Date(days[i].date);
    postDate.setHours(0, 0, 0, 0);

    if (days[i].count > 0) {
      // Check if this is part of a continuous streak
      if (lastPostDate === null || 
          (lastPostDate - postDate) / (1000 * 60 * 60 * 24) === 1) {
        streak++;
        // Update current streak only if it's an active streak (includes today or yesterday)
        if (i === days.length - 1 || 
            (today - postDate) / (1000 * 60 * 60 * 24) <= 1) {
          currentStreak = streak;
        }
        longestStreak = Math.max(longestStreak, streak);
      } else {
        streak = 1;
      }
      lastPostDate = postDate;
    } else {
      // Break the streak if there's a gap
      streak = 0;
      lastPostDate = null;
    }
  }

  return { 
    currentStreak, 
    longestStreak,
    isCurrentlyStreaking: currentStreak > 0 
  };
};

export const scrollToCurrentMonth = () => {
  const currentMonthElement = document.querySelector('[data-current-month="true"]');
  if (currentMonthElement) {
    currentMonthElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
};
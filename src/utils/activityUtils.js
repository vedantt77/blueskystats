export const processActivityData = (data) => {
  const today = new Date();
  const weeks = [];
  const days = [];
  let currentWeek = [];
  
  // Process last 365 days
  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const count = data[date.toISOString().split('T')[0]] || 0;
    
    const dayData = { date, count };
    days.push(dayData);
    
    currentWeek.push(dayData);
    if (currentWeek.length === 7) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  }

  // Calculate monthly stats
  const monthlyStats = [];
  const months = {};
  
  days.forEach(({ date, count }) => {
    const monthKey = date.toLocaleString('default', { month: 'long' });
    months[monthKey] = (months[monthKey] || 0) + count;
  });

  // Sort months chronologically starting from current month
  const currentMonth = today.getMonth();
  const monthNames = Object.keys(months);
  const sortedMonths = monthNames.sort((a, b) => {
    const monthA = new Date(Date.parse(`${a} 1, 2000`)).getMonth();
    const monthB = new Date(Date.parse(`${b} 1, 2000`)).getMonth();
    
    const adjustedMonthA = (monthA - currentMonth + 12) % 12;
    const adjustedMonthB = (monthB - currentMonth + 12) % 12;
    
    return adjustedMonthA - adjustedMonthB;
  });

  sortedMonths.forEach(month => {
    monthlyStats.push({
      month,
      count: months[month]
    });
  });

  return {
    processedData: { weeks, days },
    monthlyStats: monthlyStats.slice(0, 6) // Show last 6 months
  };
};

export const calculateStreak = (days) => {
  let currentStreak = 0;
  let longestStreak = 0;
  let streak = 0;

  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) {
      streak++;
      if (i === days.length - 1) {
        currentStreak = streak;
      }
      longestStreak = Math.max(longestStreak, streak);
    } else {
      if (i === days.length - 1) {
        currentStreak = 0;
      }
      streak = 0;
    }
  }

  return { currentStreak, longestStreak };
};
import React from 'react';

const ContributionGraph = ({ data, loading }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getIntensityColor = (count) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (count <= 2) return 'bg-blue-100 dark:bg-blue-900';
    if (count <= 5) return 'bg-blue-300 dark:bg-blue-700';
    if (count <= 10) return 'bg-blue-500 dark:bg-blue-500';
    return 'bg-blue-700 dark:bg-blue-300';
  };

  const generateCalendarData = () => {
    const today = new Date();
    const calendar = [];
    for (let i = 365; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const count = data[date.toISOString().split('T')[0]] || 0;
      calendar.push({ date, count });
    }
    return calendar;
  };

  const calendarData = generateCalendarData();
  const currentStreak = calculateCurrentStreak(calendarData);
  const longestStreak = calculateLongestStreak(calendarData);

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Posting Streak
        </h3>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Current streak: </span>
            <span className="font-bold text-blue-500">{currentStreak} days</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Longest streak: </span>
            <span className="font-bold text-blue-500">{longestStreak} days</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin text-blue-500">⌛</div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="flex">
              <div className="w-8">
                {days.map((day, i) => (
                  <div key={day} className="h-4 text-xs text-gray-400 text-center">
                    {i % 2 === 0 ? day : ''}
                  </div>
                ))}
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 52 }, (_, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }, (_, dayIndex) => {
                      const dataIndex = weekIndex * 7 + dayIndex;
                      const dayData = calendarData[dataIndex];
                      return (
                        <div
                          key={dayIndex}
                          className={`w-4 h-4 rounded-sm ${getIntensityColor(
                            dayData?.count || 0
                          )} transition-colors duration-200`}
                          title={`${dayData?.date.toDateString()}: ${
                            dayData?.count || 0
                          } posts`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex mt-2">
              <div className="w-8" />
              <div className="flex justify-between flex-1 text-xs text-gray-400">
                {months.map((month) => (
                  <div key={month}>{month}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function calculateCurrentStreak(calendarData) {
  let streak = 0;
  for (let i = calendarData.length - 1; i >= 0; i--) {
    if (calendarData[i].count > 0) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function calculateLongestStreak(calendarData) {
  let currentStreak = 0;
  let longestStreak = 0;

  for (const day of calendarData) {
    if (day.count > 0) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return longestStreak;
}

export default ContributionGraph;

import React from 'react';
import { calculateStreak } from '../utils/activityUtils';

const ContributionGraph = ({ data, loading }) => {
  const generateCalendarData = () => {
    const today = new Date();
    const calendar = [];
    
    for (let i = 365; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      const count = data[dateKey] || 0;
      calendar.push({ date, count });
    }
    
    return calendar;
  };

  const getIntensityColor = (count) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    if (count <= 2) return 'bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800';
    if (count <= 5) return 'bg-blue-200 dark:bg-blue-800/60 border-blue-300 dark:border-blue-700';
    if (count <= 10) return 'bg-blue-300 dark:bg-blue-700/80 border-blue-400 dark:border-blue-600';
    return 'bg-blue-400 dark:bg-blue-600 border-blue-500 dark:border-blue-500';
  };

  const calendarData = generateCalendarData();
  const { longestStreak } = calculateStreak(calendarData);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin text-blue-500">⌛</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Posting Activity
        </h3>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-300">Longest streak: </span>
            <span className="font-bold text-blue-500 dark:text-blue-400">{longestStreak} days</span>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="w-full">
          <div className="flex">
            <div className="w-6">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                <div key={day} className="h-3 text-[10px] text-gray-500 dark:text-gray-400 text-center">
                  {i % 2 === 0 ? day.slice(0, 1) : ''}
                </div>
              ))}
            </div>
            <div className="flex gap-[2px] flex-1">
              {Array.from({ length: 52 }, (_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[2px] flex-1">
                  {Array.from({ length: 7 }, (_, dayIndex) => {
                    const dataIndex = weekIndex * 7 + dayIndex;
                    const dayData = calendarData[dataIndex];
                    return (
                      <div
                        key={dayIndex}
                        className={`w-full h-3 rounded-[2px] border ${getIntensityColor(dayData?.count || 0)} transition-colors duration-200`}
                        title={`${dayData?.date.toDateString()}: ${dayData?.count || 0} posts`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="flex mt-2">
            <div className="w-6" />
            <div className="flex justify-between flex-1 text-[10px] text-gray-500 dark:text-gray-400">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                .map(month => (
                  <div key={month} className="flex-1 text-center">{month}</div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;
import React from 'react';

const StreakInfo = ({ currentStreak, longestStreak }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 text-sm mb-6">
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 border border-gray-100 dark:border-gray-600 flex-1">
        <div className="text-gray-600 dark:text-gray-300 mb-1">Current Streak</div>
        <div className="text-xl font-bold text-blue-500 dark:text-blue-400">
          {currentStreak} days
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 border border-gray-100 dark:border-gray-600 flex-1">
        <div className="text-gray-600 dark:text-gray-300 mb-1">Longest Streak</div>
        <div className="text-xl font-bold text-blue-500 dark:text-blue-400">
          {longestStreak} days
        </div>
      </div>
    </div>
  );
};

export default StreakInfo;
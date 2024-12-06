import React from 'react';

const MonthlyStats = ({ stats }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-100 dark:border-gray-600">
      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
        Monthly Statistics
      </h4>
      <div className="space-y-3">
        {stats.map(({ month, count }) => (
          <div key={month} className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">{month}</span>
            <span className="text-sm font-medium text-blue-500 dark:text-blue-400">
              {count} posts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyStats;
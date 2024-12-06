import React from 'react';

const GrowthMetric = ({ label, current, previous, period }) => {
  const growth = current - previous;
  const percentage = previous !== 0 ? ((growth / previous) * 100).toFixed(1) : '0.0';
  const isPositive = growth > 0;
  const isNeutral = growth === 0;

  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-100 dark:border-gray-600">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
        <span className={`text-sm font-medium ${
          isPositive ? 'text-green-600 dark:text-green-400' :
          isNeutral ? 'text-gray-600 dark:text-gray-400' :
          'text-red-600 dark:text-red-400'
        }`}>
          {isPositive ? '↑' : isNeutral ? '−' : '↓'} {Math.abs(percentage)}%
        </span>
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        {current.toLocaleString()}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {growth > 0 ? '+' : ''}{growth.toLocaleString()} in {period}
      </div>
    </div>
  );
};

export default GrowthMetric;
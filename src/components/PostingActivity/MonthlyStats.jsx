import React, { useEffect, useRef } from 'react';

const MonthlyStats = ({ stats }) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Scroll to current month on mount
    const currentMonthElement = containerRef.current?.querySelector('[data-current-month="true"]');
    if (currentMonthElement) {
      currentMonthElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [stats]);

  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-100 dark:border-gray-600">
      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
        Monthly Statistics
      </h4>
      <div className="space-y-3 max-h-[300px] overflow-y-auto" ref={containerRef}>
        {stats.map(({ month, count }) => {
          const isCurrentMonth = month === new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
          return (
            <div
              key={month}
              className={`flex justify-between items-center ${isCurrentMonth ? 'bg-blue-50 dark:bg-blue-900/20 p-2 rounded' : ''}`}
              data-current-month={isCurrentMonth}
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">{month}</span>
              <span className="text-sm font-medium text-blue-500 dark:text-blue-400">
                {count} posts
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyStats;
import React from 'react';

const ActivityHeatmap = ({ data }) => {
  const getIntensityColor = (count) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    if (count <= 2) return 'bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800';
    if (count <= 5) return 'bg-blue-200 dark:bg-blue-800/60 border-blue-300 dark:border-blue-700';
    if (count <= 10) return 'bg-blue-300 dark:bg-blue-700/80 border-blue-400 dark:border-blue-600';
    return 'bg-blue-400 dark:bg-blue-600 border-blue-500 dark:border-blue-500';
  };

  return (
    <div className="w-full">
      <div className="flex">
        <div className="w-6">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={day} className="h-3 text-[10px] text-gray-500 dark:text-gray-400 text-center">
              {i % 2 === 0 ? day : ''}
            </div>
          ))}
        </div>
        <div className="flex gap-[2px] flex-1">
          {data.weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[2px] flex-1">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`w-full h-3 rounded-[2px] border ${getIntensityColor(day.count)} 
                    transition-colors duration-200`}
                  title={`${day.date.toDateString()}: ${day.count} posts`}
                />
              ))}
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
  );
};

export default ActivityHeatmap;
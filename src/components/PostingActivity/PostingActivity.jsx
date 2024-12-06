import React from 'react';
import ActivityHeatmap from './ActivityHeatmap';
import MonthlyStats from './MonthlyStats';
import StreakInfo from './StreakInfo';
import { calculateStreak, processActivityData } from '../../utils/activityUtils';

const PostingActivity = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin text-blue-500">⌛</div>
        </div>
      </div>
    );
  }

  const { processedData, monthlyStats } = processActivityData(data);
  const { currentStreak, longestStreak } = calculateStreak(processedData.days);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Posting Activity
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <StreakInfo currentStreak={currentStreak} longestStreak={longestStreak} />
          <ActivityHeatmap data={processedData} />
        </div>
        
        <div className="lg:col-span-1">
          <MonthlyStats stats={monthlyStats} />
        </div>
      </div>
    </div>
  );
};

export default PostingActivity;
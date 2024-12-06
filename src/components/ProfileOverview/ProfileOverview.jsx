import React, { useState } from 'react';
import TimeRangeSelect from './TimeRangeSelect';
import MetricsGrid from './MetricsGrid';
import { calculateGrowthMetrics } from '../../utils/profileUtils';

const ProfileOverview = ({ profile, loading }) => {
  const [timeRange, setTimeRange] = useState('30');

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin text-blue-500">⌛</div>
        </div>
      </div>
    );
  }

  const metrics = calculateGrowthMetrics(profile, parseInt(timeRange));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Profile Overview
        </h3>
        <TimeRangeSelect value={timeRange} onChange={setTimeRange} />
      </div>
      <MetricsGrid metrics={metrics} timeRange={timeRange} />
    </div>
  );
};

export default ProfileOverview;
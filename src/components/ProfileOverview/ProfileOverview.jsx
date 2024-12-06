import React, { useState, useEffect } from 'react';
import TimeRangeSelect from './TimeRangeSelect';
import MetricsGrid from './MetricsGrid';
import { calculateGrowthMetrics } from '../../utils/profileUtils';

const ProfileOverview = ({ profile, loading }) => {
  const [timeRange, setTimeRange] = useState('30');
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    if (profile) {
      const newMetrics = calculateGrowthMetrics(profile, parseInt(timeRange));
      setMetrics(newMetrics);
    }
  }, [profile, timeRange]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin text-blue-500">⌛</div>
        </div>
      </div>
    );
  }

  if (!metrics) return null;

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
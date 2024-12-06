import React from 'react';
import GrowthMetric from './GrowthMetric';
import { calculateGrowthMetrics } from '../../utils/profileUtils';

const ProfileOverview = ({ profile, loading }) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin text-blue-500">⌛</div>
        </div>
      </div>
    );
  }

  const metrics = calculateGrowthMetrics(profile);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Profile Overview
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GrowthMetric
          label="Followers"
          current={metrics.followers.current}
          previous={metrics.followers.previous}
          period="this month"
        />
        <GrowthMetric
          label="Following"
          current={metrics.following.current}
          previous={metrics.following.previous}
          period="this month"
        />
        <GrowthMetric
          label="Posts"
          current={metrics.posts.current}
          previous={metrics.posts.previous}
          period="this month"
        />
      </div>
    </div>
  );
};

export default ProfileOverview;
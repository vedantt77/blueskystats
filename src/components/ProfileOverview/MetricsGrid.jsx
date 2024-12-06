import React from 'react';
import GrowthMetric from './GrowthMetric';

const MetricsGrid = ({ metrics, timeRange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <GrowthMetric
        label="Followers"
        current={metrics.followers.current}
        previous={metrics.followers.previous}
        period={`${timeRange} days`}
      />
      <GrowthMetric
        label="Following"
        current={metrics.following.current}
        previous={metrics.following.previous}
        period={`${timeRange} days`}
      />
      <GrowthMetric
        label="Posts"
        current={metrics.posts.current}
        previous={metrics.posts.previous}
        period={`${timeRange} days`}
      />
    </div>
  );
};

export default MetricsGrid;
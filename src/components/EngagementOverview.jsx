import React, { useState, useMemo } from 'react';
import TopPost from './TopPost';
import EngagementStats from './EngagementStats';
import { filterPostsByTimeRange, calculateEngagementMetrics } from '../utils/engagementUtils';

const EngagementOverview = ({ posts, loading }) => {
  const [timeRange, setTimeRange] = useState('30');

  const filteredPosts = useMemo(() => {
    return filterPostsByTimeRange(posts, timeRange);
  }, [posts, timeRange]);

  const metrics = useMemo(() => {
    return calculateEngagementMetrics(filteredPosts);
  }, [filteredPosts]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin text-blue-500">⌛</div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="text-center text-gray-500 dark:text-gray-400">
          No engagement data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Engagement Overview
        </h3>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-100 dark:border-gray-600">
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
            Overall Engagement ({timeRange} days)
          </h4>
          <EngagementStats metrics={metrics} />
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-100 dark:border-gray-600">
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
            Top Performing Posts
          </h4>
          <div className="space-y-4">
            {metrics.topPosts.length > 0 ? (
              metrics.topPosts.map((post) => (
                <TopPost key={post.uri} post={post} />
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                No posts in this time range
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementOverview;
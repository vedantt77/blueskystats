import React from 'react';
import { formatNumber } from '../../utils/formatUtils';

const PerformanceMetrics = ({ post }) => {
  return (
    <div className="flex gap-4 mb-2">
      <div className="flex items-center gap-1">
        <span className="text-gray-600 dark:text-gray-400">👥</span>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {formatNumber(post.totalReach)} reach
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-gray-600 dark:text-gray-400">⚡</span>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {formatNumber(post.engagement)} engagement
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-gray-600 dark:text-gray-400">📈</span>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {post.engagementRate}% rate
        </span>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
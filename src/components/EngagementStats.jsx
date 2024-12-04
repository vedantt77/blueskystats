import React from 'react';

const EngagementStats = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-2xl font-bold text-blue-500">
          {metrics.likes.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Likes</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-blue-500">
          {metrics.reposts.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Reposts</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-blue-500">
          {metrics.replies.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Replies</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-blue-500">
          {metrics.engagementRate}%
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Engagement Rate</div>
      </div>
    </div>
  );
};

export default EngagementStats;
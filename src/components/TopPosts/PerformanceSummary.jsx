import React from 'react';

const PerformanceSummary = ({ post }) => {
  return (
    <div className="flex gap-3 text-sm">
      <div className="flex items-center gap-1">
        <span className="text-gray-600 dark:text-gray-400">👍</span>
        <span className="text-gray-700 dark:text-gray-300">{post.likes}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-gray-600 dark:text-gray-400">💬</span>
        <span className="text-gray-700 dark:text-gray-300">{post.replies}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-gray-600 dark:text-gray-400">🔄</span>
        <span className="text-gray-700 dark:text-gray-300">{post.reposts}</span>
      </div>
    </div>
  );
};

export default PerformanceSummary;
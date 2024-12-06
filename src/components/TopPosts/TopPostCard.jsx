import React from 'react';
import { formatDate, formatNumber } from '../../utils/formatUtils';
import PerformanceMetrics from './PerformanceMetrics';
import PerformanceSummary from './PerformanceSummary';

const TopPostCard = ({ post }) => {
  const postUrl = `https://bsky.app/profile/${post.author}/post/${post.uri.split('/').pop()}`;

  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-100 dark:border-gray-600">
      <div className="flex gap-4">
        {post.image && (
          <div className="w-24 h-24 flex-shrink-0">
            <img
              src={post.image}
              alt="Post thumbnail"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {formatDate(post.indexedAt)}
            </div>
            <a
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            >
              View Post ↗
            </a>
          </div>
          <p className="text-gray-900 dark:text-white text-sm mb-3 line-clamp-2">
            {post.text}
          </p>
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
          </div>
          <PerformanceSummary post={post} />
        </div>
      </div>
    </div>
  );
};

export default TopPostCard;
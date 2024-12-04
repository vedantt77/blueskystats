import React from 'react';
import { formatDate } from '../utils/dateUtils';

const TopPost = ({ post }) => {
  const postUrl = `https://bsky.app/profile/${post.author}/post/${post.uri.split('/').pop()}`;
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-600 last:border-0 pb-2">
      <p className="text-sm text-gray-900 dark:text-white mb-2 line-clamp-2">
        {post.text}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span>👍 {post.likes}</span>
          <span>🔄 {post.reposts}</span>
          <span>💬 {post.replies}</span>
        </div>
        <a
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
        >
          {formatDate(post.timestamp)}
        </a>
      </div>
    </div>
  );
};

export default TopPost;
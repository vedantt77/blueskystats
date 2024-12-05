import React from 'react';
import PostPreview from './PostPreview';

const TopPost = ({ post }) => {
  const postUrl = `https://bsky.app/profile/${post.author}/post/${post.uri.split('/').pop()}`;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="mb-3">
        <div className="text-gray-900 dark:text-white text-sm mb-2">
          <PostPreview text={post.text} />
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100 dark:border-gray-700">
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <span>👍</span>
            <span>{post.likes}</span>
          </span>
          <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <span>🔄</span>
            <span>{post.reposts}</span>
          </span>
          <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <span>💬</span>
            <span>{post.replies}</span>
          </span>
        </div>
        
        <a
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
          title="Open in Bluesky"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default TopPost;
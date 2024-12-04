import React from 'react';

const TopPost = ({ post }) => {
  const postUrl = `https://bsky.app/profile/${post.author}/post/${post.uri.split('/').pop()}`;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="mb-3">
        <p className="text-gray-900 dark:text-white whitespace-pre-wrap break-words">
          {post.text}
        </p>
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
        >
          View post
        </a>
      </div>
    </div>
  );
};

export default TopPost;
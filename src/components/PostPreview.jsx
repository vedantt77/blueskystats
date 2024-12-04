import React, { useState } from 'react';

const PostPreview = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 280; // Twitter-like character limit
  const shouldTruncate = text.length > maxLength;
  
  const displayText = isExpanded ? text : shouldTruncate ? `${text.slice(0, maxLength)}...` : text;

  return (
    <div className="relative">
      <p className="text-gray-900 dark:text-white whitespace-pre-wrap break-words">
        {displayText}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm mt-2 focus:outline-none"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
};

export default PostPreview;
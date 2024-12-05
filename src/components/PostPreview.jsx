import React, { useState } from 'react';

const PostPreview = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 280;
  const shouldTruncate = text.length > maxLength;
  
  const displayText = isExpanded ? text : shouldTruncate ? `${text.slice(0, maxLength)}...` : text;

  const formatText = (text) => {
    // Handle line breaks
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="relative">
      <div className="text-gray-900 dark:text-white whitespace-pre-wrap break-words">
        {formatText(displayText)}
      </div>
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
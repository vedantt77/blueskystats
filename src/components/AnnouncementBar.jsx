import React from 'react';

const AnnouncementBar = () => {
  return (
    <div className="bg-blue-500 text-white py-2 px-4 border-b border-blue-600">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">SaaSdirectories.fyi</span>
          <span className="hidden sm:inline">—</span>
          <span className="hidden sm:inline">a directory for saas directory</span>
        </div>
        <a
          href="https://saasdirectories.fyi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm bg-white text-blue-500 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors duration-200"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default AnnouncementBar;
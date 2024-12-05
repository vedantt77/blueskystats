import React from 'react';

const TopBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-blue-500 text-white h-10">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
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
    </div>
  );
};

export default TopBar;
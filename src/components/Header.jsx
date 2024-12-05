import React from 'react';

const Header = ({ darkMode, setDarkMode }) => {
  const handleHomeClick = () => {
    window.location.reload();
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          BlueskyStats.fyi
        </h1>
        <button
          onClick={handleHomeClick}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Home
        </button>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? '🌞' : '🌙'}
      </button>
    </div>
  );
};

export default Header;
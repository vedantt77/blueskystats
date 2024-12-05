import React from 'react';
import { useScroll } from '../hooks/useScroll';

const MobileHeader = ({ 
  darkMode, 
  setDarkMode, 
  handle, 
  setHandle, 
  onSubmit, 
  loading,
  isProfileView 
}) => {
  const { scrollDirection, scrolledPast } = useScroll(50);
  
  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 
    transform transition-all duration-300 ease-in-out
    ${scrollDirection === 'down' && scrolledPast ? '-translate-y-full' : 'translate-y-0'}
    ${scrolledPast ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md' : ''}
  `;

  const searchBarClasses = `
    transition-all duration-300 ease-in-out
    ${scrolledPast ? 'py-2 opacity-90' : 'py-4'}
  `;

  return (
    <div className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <h1 className={`font-bold transition-all duration-300 ${scrolledPast ? 'text-lg' : 'text-xl'}`}>
            BlueskyStats.fyi
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.location.reload()}
              className="p-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? '🌞' : '🌙'}
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className={searchBarClasses}>
          <div className="flex gap-2">
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="Enter Bluesky handle"
              className="flex-1 px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? (
                <span className="inline-block animate-spin">⌛</span>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MobileHeader;
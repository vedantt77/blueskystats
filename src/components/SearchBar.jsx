import React from 'react';

const SearchBar = ({ handle, setHandle, loading, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <div className="text-center text-gray-600 dark:text-gray-300">
          Enter a Bluesky handle to view their stats
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="Enter Bluesky handle"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <span className="inline-block animate-spin mr-2">⌛</span>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
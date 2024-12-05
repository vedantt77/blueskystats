import React from 'react';

const LandingHero = () => {
  return (
    <div className="text-center py-12 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Discover Your BlueSky Stats
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
        Track detailed analytics and insights for any BlueSky user instantly.
        No sign-up required - just enter a handle and explore engagement metrics, 
        posting patterns, and audience growth in real-time.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <span className="text-2xl">📊</span>
          <span>Engagement Metrics</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <span className="text-2xl">📈</span>
          <span>Posting Patterns</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <span className="text-2xl">👥</span>
          <span>Audience Growth</span>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
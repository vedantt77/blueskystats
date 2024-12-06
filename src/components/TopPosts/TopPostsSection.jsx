import React from 'react';
import TopPostCard from './TopPostCard';
import { useTopPosts } from '../../hooks/useTopPosts';

const TopPostsSection = ({ posts }) => {
  const { topPosts, loading } = useTopPosts(posts);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin text-blue-500">⌛</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Top Performing Posts
      </h3>
      <div className="space-y-4">
        {topPosts.map((post) => (
          <TopPostCard key={post.uri} post={post} />
        ))}
        {topPosts.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">
            No posts available
          </div>
        )}
      </div>
    </div>
  );
};

export default TopPostsSection;
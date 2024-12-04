import React, { useState } from 'react';
import TopPost from './TopPost';
import EngagementStats from './EngagementStats';

const EngagementOverview = ({ posts, loading }) => {
  const [timeRange, setTimeRange] = useState('30');

  const calculateEngagementMetrics = () => {
    if (!posts?.length) return null;

    const metrics = {
      likes: 0,
      reposts: 0,
      replies: 0,
      totalPosts: posts.length,
      engagementRate: 0,
      topPosts: [],
    };

    posts.forEach(post => {
      if (!post?.post) return;
      
      metrics.likes += post.post.likeCount || 0;
      metrics.reposts += post.post.repostCount || 0;
      metrics.replies += post.post.replyCount || 0;

      metrics.topPosts.push({
        text: post.post.text || '',
        engagement: (post.post.likeCount || 0) + (post.post.repostCount || 0) + (post.post.replyCount || 0),
        timestamp: new Date(post.post.indexedAt),
        likes: post.post.likeCount || 0,
        reposts: post.post.repostCount || 0,
        replies: post.post.replyCount || 0,
        uri: post.post.uri,
        author: post.post.author.handle
      });
    });

    const totalInteractions = metrics.likes + metrics.reposts + metrics.replies;
    metrics.engagementRate = metrics.totalPosts > 0 
      ? ((totalInteractions / metrics.totalPosts) * 100).toFixed(2)
      : '0.00';

    metrics.topPosts.sort((a, b) => b.engagement - a.engagement);
    metrics.topPosts = metrics.topPosts.slice(0, 3);

    return metrics;
  };

  const metrics = calculateEngagementMetrics();

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin text-blue-500">⌛</div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="text-center text-gray-500 dark:text-gray-400">
          No engagement data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Engagement Overview
        </h3>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-100 dark:border-gray-600">
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
            Overall Engagement
          </h4>
          <EngagementStats metrics={metrics} />
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-100 dark:border-gray-600">
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
            Top Performing Posts
          </h4>
          <div className="space-y-4">
            {metrics.topPosts.map((post, index) => (
              <TopPost key={index} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementOverview;
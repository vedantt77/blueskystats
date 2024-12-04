import React, { useState } from 'react';

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
      });
    });

    // Calculate engagement rate (total interactions / total posts * 100)
    const totalInteractions = metrics.likes + metrics.reposts + metrics.replies;
    metrics.engagementRate = metrics.totalPosts > 0 
      ? ((totalInteractions / metrics.totalPosts) * 100).toFixed(2)
      : '0.00';

    // Sort and get top posts
    metrics.topPosts.sort((a, b) => b.engagement - a.engagement);
    metrics.topPosts = metrics.topPosts.slice(0, 3);

    return metrics;
  };

  const metrics = calculateEngagementMetrics();

  if (loading) {
    return (
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin text-blue-500">⌛</div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="text-center text-gray-500 dark:text-gray-400">
          No engagement data available
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Engagement Overview
        </h3>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
            Overall Engagement
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-500">
                {metrics.likes.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Likes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">
                {metrics.reposts.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Reposts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">
                {metrics.replies.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Replies</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">
                {metrics.engagementRate}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Engagement Rate</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
            Top Performing Posts
          </h4>
          <div className="space-y-4">
            {metrics.topPosts.map((post, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-600 last:border-0 pb-2">
                <p className="text-sm text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {post.text}
                </p>
                <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span>👍 {post.likes}</span>
                  <span>🔄 {post.reposts}</span>
                  <span>💬 {post.replies}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementOverview;

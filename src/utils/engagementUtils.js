// Filter posts based on time range in days
export const filterPostsByTimeRange = (posts, days) => {
  if (!posts?.length) return [];
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));
  
  return posts.filter(post => {
    if (!post?.post?.indexedAt) return false;
    const postDate = new Date(post.post.indexedAt);
    return postDate >= cutoffDate;
  });
};

// Calculate engagement metrics for given posts
export const calculateEngagementMetrics = (posts) => {
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
    
    const likeCount = post.post.likeCount || 0;
    const repostCount = post.post.repostCount || 0;
    const replyCount = post.post.replyCount || 0;
    
    metrics.likes += likeCount;
    metrics.reposts += repostCount;
    metrics.replies += replyCount;

    const engagement = likeCount + repostCount + replyCount;
    if (engagement > 0) {
      metrics.topPosts.push({
        text: post.post.text || '',
        engagement,
        likes: likeCount,
        reposts: repostCount,
        replies: replyCount,
        uri: post.post.uri,
        author: post.post.author.handle
      });
    }
  });

  const totalInteractions = metrics.likes + metrics.reposts + metrics.replies;
  metrics.engagementRate = metrics.totalPosts > 0 
    ? ((totalInteractions / metrics.totalPosts) * 100).toFixed(2)
    : '0.00';

  // Sort by engagement and take top 3
  metrics.topPosts.sort((a, b) => b.engagement - a.engagement);
  metrics.topPosts = metrics.topPosts.slice(0, 3);

  return metrics;
};
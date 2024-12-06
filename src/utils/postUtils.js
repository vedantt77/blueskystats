export const processTopPosts = async (posts) => {
  if (!Array.isArray(posts)) return [];

  const processed = posts
    .filter(post => post?.post)
    .map(post => ({
      uri: post.post.uri,
      text: post.post.text || '',
      author: post.post.author.handle,
      indexedAt: post.post.indexedAt,
      image: post.post.embed?.images?.[0]?.thumb,
      likes: post.post.likeCount || 0,
      replies: post.post.replyCount || 0,
      reposts: post.post.repostCount || 0,
      engagement: (post.post.likeCount || 0) + 
                 (post.post.replyCount || 0) + 
                 (post.post.repostCount || 0),
      totalReach: calculateReach(post.post)
    }))
    .sort((a, b) => b.engagement - a.engagement)
    .slice(0, 3);

  return processed;
};

const calculateReach = (post) => {
  const totalEngagement = (post.likeCount || 0) + 
                         (post.replyCount || 0) + 
                         (post.repostCount || 0);
  const estimatedReach = Math.floor(totalEngagement * 5);
  return Math.max(estimatedReach, totalEngagement);
};
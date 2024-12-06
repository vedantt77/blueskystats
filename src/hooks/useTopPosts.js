import { useState, useEffect } from 'react';
import { processTopPosts } from '../utils/postUtils';

export const useTopPosts = (posts) => {
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!posts) {
      setLoading(false);
      return;
    }

    const processAndSortPosts = async () => {
      setLoading(true);
      try {
        const processed = await processTopPosts(posts);
        setTopPosts(processed);
      } catch (error) {
        console.error('Error processing top posts:', error);
        setTopPosts([]);
      }
      setLoading(false);
    };

    processAndSortPosts();
  }, [posts]);

  return { topPosts, loading };
};
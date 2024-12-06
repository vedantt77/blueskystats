import { useState } from 'react';
import { getBlueskyService } from '../services/api/blueskyService';

export const useBlueskyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postsByDate, setPostsByDate] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async (handle) => {
    setLoading(true);
    setError(null);
    setProfile(null);
    setPosts([]);
    setPostsByDate({});

    try {
      const blueskyService = getBlueskyService();
      const { data } = await blueskyService.getProfile(handle);
      setProfile(data);
      await fetchPosts(handle);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err.userMessage || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async (handle) => {
    try {
      const blueskyService = getBlueskyService();
      const { data } = await blueskyService.getAuthorFeed(handle);
      setPosts(data.feed);

      const dateMap = {};
      data.feed.forEach(item => {
        const date = new Date(item.post.indexedAt).toISOString().split('T')[0];
        dateMap[date] = (dateMap[date] || 0) + 1;
      });
      setPostsByDate(dateMap);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.userMessage || 'Failed to fetch posts');
    }
  };

  return {
    profile,
    posts,
    postsByDate,
    loading,
    error,
    fetchProfile
  };
};
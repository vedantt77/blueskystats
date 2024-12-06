import { useState } from 'react';
import { getBlueskyService } from '../services/api/blueskyService';
import { isValidHandle, sanitizeHandle, formatErrorMessage } from '../utils/validationUtils';

export const useBlueskyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postsByDate, setPostsByDate] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async (rawHandle) => {
    setLoading(true);
    setError(null);
    setProfile(null);
    setPosts([]);
    setPostsByDate({});

    try {
      const handle = sanitizeHandle(rawHandle);
      
      if (!isValidHandle(handle)) {
        throw {
          status: 400,
          message: 'actor must be a valid did or a handle'
        };
      }

      const blueskyService = getBlueskyService();
      const { data } = await blueskyService.getProfile(handle);
      
      if (!data) {
        throw {
          status: 400,
          message: 'Profile not found'
        };
      }

      setProfile(data);
      await fetchPosts(handle);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(formatErrorMessage(err));
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
      setError(formatErrorMessage(err));
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
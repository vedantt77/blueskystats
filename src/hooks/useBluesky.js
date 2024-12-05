import { useState, useCallback } from 'react';
import { getBlueskyAgent } from '../services/api/agent';

export const useBluesky = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async (handle) => {
    setLoading(true);
    setError(null);

    try {
      const agent = getBlueskyAgent();
      await agent.login({
        identifier: 'vedantk.bsky.social',
        password: 'bdtl-qrfp-nik3-mfc2'
      });
      
      const { data } = await agent.getProfile({ actor: handle });
      return data;
    } catch (error) {
      setError(error.userMessage || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAuthorFeed = useCallback(async (handle) => {
    setLoading(true);
    setError(null);

    try {
      const agent = getBlueskyAgent();
      const { data } = await agent.getAuthorFeed({ actor: handle });
      return data;
    } catch (error) {
      setError(error.userMessage || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchProfile,
    fetchAuthorFeed
  };
};
import React, { useState, useEffect } from 'react';
import { BskyAgent } from '@atproto/api';
import ContributionGraph from './components/ContributionGraph';
import EngagementOverview from './components/EngagementOverview';
import FeaturedProfile from './components/FeaturedProfile';

const agent = new BskyAgent({ service: 'https://bsky.social' });

function App() {
  const [handle, setHandle] = useState('');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsByDate, setPostsByDate] = useState({});

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const fetchPosts = async (handle) => {
    setPostsLoading(true);
    try {
      const { data } = await agent.getAuthorFeed({ actor: handle });
      setPosts(data.feed);

      const dateMap = {};
      data.feed.forEach(item => {
        const date = new Date(item.post.indexedAt).toISOString().split('T')[0];
        dateMap[date] = (dateMap[date] || 0) + 1;
      });
      setPostsByDate(dateMap);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setPostsLoading(false);
    }
  };

  const fetchProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProfile(null);
    setPosts([]);
    setPostsByDate({});

    try {
      await agent.login({
        identifier: 'vedantk.bsky.social',
        password: 'bdtl-qrfp-nik3-mfc2'
      });
      const { data } = await agent.getProfile({ actor: handle });
      setProfile(data);
      await fetchPosts(handle);
    } catch (err) {
      console.error('Error details:', err);
      if (err.status === 401) {
        setError('Authentication failed. Please check your Bluesky credentials.');
      } else if (err.status === 404) {
        setError(`Profile not found for handle: ${handle}`);
      } else if (err.message) {
        setError(`Error: ${err.message}`);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-200 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 pb-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Bluesky Profile Stats
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? '🌞' : '🌙'}
            </button>
          </div>

          <form onSubmit={fetchProfile} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="Enter Bluesky handle"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <span className="inline-block animate-spin mr-2">⌛</span>
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </form>
        </div>

        {!profile && <FeaturedProfile />}

        {error && (
          <div className="mb-8 p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-100 rounded-lg border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        {profile && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors p-6">
              <div className="flex items-center gap-4 mb-6">
                {profile.avatar && (
                  <img
                    src={profile.avatar}
                    alt={profile.displayName}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                  />
                )}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {profile.displayName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">@{profile.handle}</p>
                </div>
              </div>

              {profile.description && (
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {profile.description}
                </p>
              )}

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-100 dark:border-gray-600">
                  <div className="text-2xl font-bold text-blue-500 dark:text-blue-400">
                    {profile.followersCount}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Followers</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-100 dark:border-gray-600">
                  <div className="text-2xl font-bold text-blue-500 dark:text-blue-400">
                    {profile.followsCount}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Following</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-100 dark:border-gray-600">
                  <div className="text-2xl font-bold text-blue-500 dark:text-blue-400">
                    {profile.postsCount}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Posts</div>
                </div>
              </div>
            </div>

            <ContributionGraph data={postsByDate} loading={postsLoading} />
            <EngagementOverview posts={posts} loading={postsLoading} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
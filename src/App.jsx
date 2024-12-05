import React, { useState, useEffect } from 'react';
import { createRateLimitedAgent } from './utils/apiUtils';
import ContributionGraph from './components/ContributionGraph';
import EngagementOverview from './components/EngagementOverview';
import FeaturedProfile from './components/FeaturedProfile';
import Footer from './components/Footer';
import AnnouncementBar from './components/AnnouncementBar';
import AdvertiseWithUs from './components/AdvertiseWithUs';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import LandingHero from './components/LandingHero';

const agent = createRateLimitedAgent();

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

  const handleSearch = async (e) => {
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
      <div className="sticky top-0 z-10">
        <AnnouncementBar />
        <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {!profile && (
          <>
            <LandingHero />
            <div className="max-w-2xl mx-auto -mt-4 mb-12">
              <SearchBar 
                handle={handle}
                setHandle={setHandle}
                loading={loading}
                onSubmit={handleSearch}
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Featured Profile
            </h2>
            <FeaturedProfile />
            <AdvertiseWithUs />
          </>
        )}

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
            <EngagementOverview posts={posts} loading={postsLoading} profile={profile} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
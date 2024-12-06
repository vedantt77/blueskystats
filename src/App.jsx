import React, { useState } from 'react';
import { useBlueskyProfile } from './hooks/useBlueskyProfile';
import { useDarkMode } from './hooks/useDarkMode';
import ProfileView from './components/ProfileView';
import FeaturedProfile from './components/FeaturedProfile';
import Footer from './components/Footer';
import AnnouncementBar from './components/AnnouncementBar';
import AdvertiseWithUs from './components/AdvertiseWithUs';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import LandingHero from './components/LandingHero';

function App() {
  const [handle, setHandle] = useState('');
  const [darkMode, setDarkMode] = useDarkMode();
  const { profile, posts, postsByDate, loading, error, fetchProfile } = useBlueskyProfile();

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchProfile(handle);
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
          <ProfileView 
            profile={profile}
            posts={posts}
            postsByDate={postsByDate}
            loading={loading}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
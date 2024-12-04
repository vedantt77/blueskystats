import React, { useState, useEffect } from 'react';
import { BskyAgent } from '@atproto/api';
import { featuredProfiles } from '../config/featuredProfiles';

const FeaturedProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProfiles = async () => {
      try {
        const agent = new BskyAgent({ service: 'https://bsky.social' });
        const profileData = [];

        for (const profile of featuredProfiles) {
          try {
            await agent.login(profile.credentials);
            const { data } = await agent.getProfile({ actor: profile.handle });
            profileData.push(data);
          } catch (error) {
            console.error(`Error fetching profile ${profile.handle}:`, error);
          }
        }

        setProfiles(profileData);
      } catch (error) {
        console.error('Error fetching featured profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProfiles();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin text-blue-500">⌛</div>
        </div>
      </div>
    );
  }

  if (!profiles.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <div
          key={profile.did}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl"
        >
          <div className="flex flex-col items-center text-center">
            {profile.avatar && (
              <img
                src={profile.avatar}
                alt={profile.displayName}
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 mb-4"
              />
            )}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {profile.displayName}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              @{profile.handle}
            </p>
            {profile.description && (
              <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-lg line-clamp-3">
                {profile.description}
              </p>
            )}
            <div className="flex gap-4 mb-6">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-500">{profile.followersCount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-500">{profile.followsCount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-500">{profile.postsCount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Posts</div>
              </div>
            </div>
            <a
              href={`https://bsky.app/profile/${profile.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Visit Profile
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProfile;
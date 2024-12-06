import React from 'react';
import ContributionGraph from './ContributionGraph';
import ProfileOverview from './ProfileOverview/ProfileOverview';

const ProfileView = ({ profile, posts, postsByDate, loading }) => {
  if (!profile) return null;

  return (
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

      <ContributionGraph data={postsByDate} loading={loading} />
      <ProfileOverview profile={profile} loading={loading} />
    </div>
  );
};

export default ProfileView;
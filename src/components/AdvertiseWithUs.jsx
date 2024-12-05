import React from 'react';

const AdvertisingOption = ({ title, price, features, onClick }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
    <div className="text-2xl font-bold text-blue-500 mb-4">${price}/month</div>
    <ul className="space-y-3 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <span className="text-blue-500 mr-2">✓</span>
          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
        </li>
      ))}
    </ul>
    <button
      onClick={onClick}
      className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
    >
      Contact Us
    </button>
  </div>
);

const AdvertiseWithUs = () => {
  const handleContact = () => {
    window.open('https://bsky.app/profile/vedantk.bsky.social', '_blank');
  };

  const topBarFeatures = [
    'Display your product/service in our prominent top banner',
    'Choose from flexible duration packages',
    'Reach our entire user base with high visibility placement',
    'Include your logo, tagline, and clickable link'
  ];

  const featuredProfileFeatures = [
    'Get your profile highlighted in our Featured Profiles section',
    'Stand out with enhanced visibility to potential customers',
    'Include custom branding and extended profile details',
    'Priority placement in search results'
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-8">
          Advertise With Us
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <AdvertisingOption
            title="Premium Top Bar Advertisement"
            price={49}
            features={topBarFeatures}
            onClick={handleContact}
          />
          <AdvertisingOption
            title="Featured Profile Promotion"
            price={19}
            features={featuredProfileFeatures}
            onClick={handleContact}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvertiseWithUs;
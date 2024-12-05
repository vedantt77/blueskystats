import React from 'react';

const Footer = () => {
  return (
    <footer className="py-4 mt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        Built by <a 
          href="https://bsky.app/profile/vedantk.bsky.social" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-bold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Vedant
        </a>
      </div>
    </footer>
  );
};

export default Footer;
import { useState, useEffect } from 'react';

export const useScroll = (threshold = 10) => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [scrolledPast, setScrolledPast] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }

      // Check if scrolled past threshold
      setScrolledPast(currentScrollY > threshold);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, threshold]);

  return { scrollDirection, scrolledPast };
};
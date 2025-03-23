
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This function scrolls to top when route changes
export function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Animation for page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }
};

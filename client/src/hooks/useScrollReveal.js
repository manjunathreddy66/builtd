import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * useScrollReveal hook
 * Automatically detects elements with the `.ios-reveal` class and reveals them
 * with an Apple-style fluid spring transition as they enter the viewport.
 */
export const useScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    // If IntersectionObserver is not supported, reveal all immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.ios-reveal').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve once revealed for butter-smooth performance
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    // Give DOM a tick to render route components
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.ios-reveal:not(.is-revealed)');
      elements.forEach((el) => observer.observe(el));
    }, 60);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);
};

export default useScrollReveal;

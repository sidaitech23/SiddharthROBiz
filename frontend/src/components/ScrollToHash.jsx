import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // Scroll to top on route change if no hash
        if (!hash) {
            window.scrollTo(0, 0);
            return;
        }

        // Scroll to hash element if it exists
        const elementId = hash.replace('#', '');
        const attemptScroll = () => {
            const element = document.getElementById(elementId);
            if (element) {
                // Small delay to ensure render is complete
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        };

        // Try immediately
        attemptScroll();

        // Also try after a short delay in case of dynamic content loading
        const timer = setTimeout(attemptScroll, 500);
        return () => clearTimeout(timer);
    }, [pathname, hash]);

    return null;
};

export default ScrollToHash;

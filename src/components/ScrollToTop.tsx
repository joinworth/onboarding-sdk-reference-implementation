import { useEffect, type RefObject } from 'react';
import { useLocation } from 'react-router';

interface ScrollToTopProps {
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
}

const ScrollToTop = ({ scrollContainerRef }: ScrollToTopProps): null => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (scrollContainerRef?.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [pathname, scrollContainerRef]);

  return null;
};

export default ScrollToTop;

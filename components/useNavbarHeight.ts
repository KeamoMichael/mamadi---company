import React from 'react';

/**
 * Tracks the live rendered height of the fixed site navbar (#site-navbar) so
 * sticky in-page sub-navs can dock flush beneath it. The navbar's height is
 * fluid (it varies by breakpoint and while its logo-reveal animation runs),
 * so a hardcoded pixel offset drifts out of sync and leaves a visible gap
 * (or overlap) between the navbar's bottom edge and the sticky bar below it.
 */
export const useNavbarHeight = (fallback = 72): number => {
  const [height, setHeight] = React.useState(fallback);

  React.useEffect(() => {
    const navEl = document.getElementById('site-navbar');
    if (!navEl) return;

    const measure = () => setHeight(navEl.getBoundingClientRect().height);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(navEl);
    return () => observer.disconnect();
  }, []);

  return height;
};

export const isMobileScreen = (): boolean => {
  if (typeof window !== "undefined") {
    // Tailwind's md breakpoint is 768px
    // Anything below 768px is considered a mobile screen
    return window.innerWidth < 768;
  }
  return false;
};

export const isTabletScreen = (): boolean => {
  if (typeof window !== "undefined") {
    // Tablet usually spans from 768px to 1024px (Tailwind lg)
    return window.innerWidth >= 768 && window.innerWidth < 1024;
  }
  return false;
};

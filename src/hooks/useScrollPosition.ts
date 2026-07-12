import { useState, useEffect } from "react";

export function useScrollPosition(threshold = 50) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDelta, setScrollDelta] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > threshold);
      setScrollDelta(Math.abs(currentScrollY - lastScrollY));
      
      if (Math.abs(currentScrollY - lastScrollY) > 30) {
        lastScrollY = currentScrollY;
      }
    };

    handleScroll(); // Initialize directly on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { isScrolled, scrollDelta };
}

import { useEffect } from "react";
import { useLocation } from "react-router";

interface ScrollToHashOptions {
  offset?: number;
}

export const useScrollToHash = ({ offset = 0 }: ScrollToHashOptions) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); // Remove '#' from the hash
      const targetElement = document.getElementById(id);

      if (targetElement) {
        const topPosition =
          targetElement.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: topPosition,
          behavior: "smooth",
        });
      }
    }
  }, [location, offset]);
};

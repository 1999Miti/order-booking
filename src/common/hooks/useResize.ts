import { useState, useEffect } from "react";

const useResize = () => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    // Check if `window` is available (i.e., we're in the browser)
    if (typeof window !== "undefined") {
      // Set initial width
      setWidth(window.innerWidth);

      // Update width on resize
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []); // Empty dependency array to run only on mount/unmount

  return { width };
};

export default useResize;

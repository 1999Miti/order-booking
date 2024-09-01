'use client'
import { useEffect, useState } from "react";

const useResize = () => {
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    if (window !== undefined) {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      // Attach event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [window.innerWidth]);

  return { width };
};

export default useResize;

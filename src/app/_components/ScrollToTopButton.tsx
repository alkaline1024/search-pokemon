"use client";

import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`group fixed right-4 ${show ? "bottom-4" : "-bottom-12"} z-50 flex aspect-square h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-lg sm:h-12 sm:w-12`}
      aria-label="Scroll to top"
    >
      <span className="material-symbols-outlined opacity-60 transition-all group-hover:opacity-100 max-sm:mt-1">
        arrow_upward
      </span>
    </button>
  );
};

export default ScrollToTopButton;

import React, { useState } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center h-9 w-9 rounded-lg text-text-secondary transition-colors hover:bg-bg-elevated"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h1M3 12H2m16.24-7.76l-.707.707M5.636 18.364l-.707.707M18.364 5.636l-.707-.707M5.636 5.636l-.707-.707"
          />
        </svg>
      ) : (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h1M3 12H2m16.24-7.76l-.707.707M5.636 18.364l-.707.707M18.364 5.636l-.707-.707M5.636 5.636l-.707-.707"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
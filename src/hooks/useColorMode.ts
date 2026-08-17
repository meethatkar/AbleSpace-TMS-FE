import { useState, useEffect } from "react";

const COLOR_MODE_KEY = "color-mode";
const DEFAULT_COLOR_MODE = "black"; // standard default

export const useColorMode = () => {
  const [colorMode, setColorMode] = useState<string>(DEFAULT_COLOR_MODE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const savedMode = localStorage.getItem(COLOR_MODE_KEY);
      if (savedMode) {
        setColorMode(savedMode);
        document.documentElement.setAttribute("data-color-mode", savedMode);
      } else {
        document.documentElement.setAttribute(
          "data-color-mode",
          DEFAULT_COLOR_MODE,
        );
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const changeColorMode = (mode: string) => {
    setColorMode(mode);
    localStorage.setItem(COLOR_MODE_KEY, mode);
    document.documentElement.setAttribute("data-color-mode", mode);
  };

  return { colorMode, changeColorMode, mounted };
};

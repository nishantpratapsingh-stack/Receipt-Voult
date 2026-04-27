import { useEffect, useState } from "react";
import {
  applyThemeToDocument,
  DEFAULT_THEME,
  resolveStoredTheme,
  THEME_STORAGE_KEY,
  type ThemeMode,
} from "@/lib/theme";

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>(() => resolveStoredTheme());

  useEffect(() => {
    applyThemeToDocument(theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark",
    );
  };

  return {
    theme,
    isDark: theme === "dark",
    isLight: theme === "light",
    setTheme,
    toggleTheme,
    defaultTheme: DEFAULT_THEME,
  };
};

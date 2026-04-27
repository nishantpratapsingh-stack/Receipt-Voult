export type ThemeMode = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
export const DEFAULT_THEME: ThemeMode = "dark";

export const resolveStoredTheme = (): ThemeMode => {
  if (typeof window === "undefined") return DEFAULT_THEME;

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  return DEFAULT_THEME;
};

export const applyThemeToDocument = (theme: ThemeMode) => {
  if (typeof document === "undefined") return;

  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
};

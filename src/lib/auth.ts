const AUTH_CHANGE_EVENT = "receipt-vault-auth-change";

export const AUTH_KEYS = {
  isAuth: "isAuth",
  user: "user",
} as const;

export const AUTH_CREDENTIALS = {
  username: "Nishant",
  password: "123456",
} as const;

const emitAuthChange = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_KEYS.isAuth) === "true";
};

export const getAuthenticatedUser = () => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_KEYS.user);
};

export const loginWithCredentials = (username: string, password: string) => {
  const isValid =
    username === AUTH_CREDENTIALS.username &&
    password === AUTH_CREDENTIALS.password;

  if (!isValid || typeof window === "undefined") return false;

  window.localStorage.setItem(AUTH_KEYS.isAuth, "true");
  window.localStorage.setItem(AUTH_KEYS.user, AUTH_CREDENTIALS.username);
  emitAuthChange();
  return true;
};

export const logout = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_KEYS.isAuth);
  window.localStorage.removeItem(AUTH_KEYS.user);
  emitAuthChange();
};

export const authChangeEvent = AUTH_CHANGE_EVENT;

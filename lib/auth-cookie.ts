const AUTH_TOKEN_KEY = "flynt_token";
const MAX_AGE_DAYS = 7;

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

const setCookie = (name: string, value: string, maxAgeDays: number): void => {
  if (typeof document === "undefined") return;
  const maxAge = maxAgeDays * 24 * 60 * 60;
  const secure = typeof window !== "undefined" && window.location?.protocol === "https:";
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax${secure ? "; Secure" : ""}`;
};

export const getToken = (): string | null => getCookie(AUTH_TOKEN_KEY);

export const setToken = (token: string): void =>
  setCookie(AUTH_TOKEN_KEY, token, MAX_AGE_DAYS);

export const clearToken = (): void => {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0`;
};

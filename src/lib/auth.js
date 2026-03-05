const AUTH_KEY = "atelier_auth_user";

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw);
  } catch (_error) {
    return null;
  }
}

export function setStoredUser(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  localStorage.removeItem(AUTH_KEY);
}

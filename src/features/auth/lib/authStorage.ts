import type { AuthState } from '../model/authSlice';
import { AUTH_STORAGE_KEY } from './keys';

type StoredPayload = Partial<AuthState> & { token?: string };

function parseStoredAuth(raw: string, rememberMe: boolean): AuthState | null {
  try {
    const data = JSON.parse(raw) as StoredPayload;
    const accessToken = data.accessToken ?? data.token ?? null;
    if (!accessToken) return null;
    return {
      user: data.user ?? null,
      accessToken,
      refreshToken: data.refreshToken ?? null,
      rememberMe,
      _rehydrated: true,
    };
  } catch {
    return null;
  }
}

function setItemAndClearOther(
  key: string,
  data: string,
  target: 'local' | 'session'
): void {
  if (target === 'local') {
    localStorage.setItem(key, data);
    sessionStorage.removeItem(key);
  } else {
    sessionStorage.setItem(key, data);
    localStorage.removeItem(key);
  }
}

function clearBoth(key: string): void {
  localStorage.removeItem(key);
  sessionStorage.removeItem(key);
}

export function getPersistedAuthState(): AuthState | null {
  if (typeof window === 'undefined') return null;
  const fromSession = sessionStorage.getItem(AUTH_STORAGE_KEY);
  if (fromSession) {
    const state = parseStoredAuth(fromSession, false);
    if (state) return state;
  }
  const fromLocal = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!fromLocal) return null;
  return parseStoredAuth(fromLocal, true);
}

export function persistAuthState(auth: AuthState): void {
  const payload = {
    user: auth.user,
    accessToken: auth.accessToken,
    refreshToken: auth.refreshToken,
  };
  if (auth.accessToken) {
    const data = JSON.stringify(payload);
    setItemAndClearOther(AUTH_STORAGE_KEY, data, auth.rememberMe ? 'local' : 'session');
  } else {
    clearBoth(AUTH_STORAGE_KEY);
  }
}

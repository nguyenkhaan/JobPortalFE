import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { AuthContext } from "./AuthContext";

import {
  AUTH_STORAGE_EVENT,
  LocalStorageService,
} from "../../services/local-storage";

import { getAuthStateFromStorage, type AuthState } from "./auth-utils";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(
    getAuthStateFromStorage,
  );

  const refreshAuth = useCallback(() => {
    setAuthState(getAuthStateFromStorage());
  }, []);

  const logout = useCallback(() => {
    LocalStorageService.removeValue("me");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }, []);

  useEffect(() => {
    window.addEventListener(AUTH_STORAGE_EVENT, refreshAuth);

    window.addEventListener("storage", refreshAuth);

    return () => {
      window.removeEventListener(AUTH_STORAGE_EVENT, refreshAuth);

      window.removeEventListener("storage", refreshAuth);
    };
  }, [refreshAuth]);

  const value = useMemo(
    () => ({
      ...authState,
      logout,
      refreshAuth,
    }),
    [authState, logout, refreshAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

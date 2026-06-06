import type { Role } from "../../bases/constants/app";
import { LocalStorageService } from "../../services/local-storage";

export interface AuthUser {
  roles?: Role[];
  name?: string;
  email?: string;
  [key: string]: unknown;
}

export interface AuthState {
  user: AuthUser | null;
  roles: Role[];
  isAdmin: boolean;
  isEmployee: boolean;
  isJobSeeker: boolean;
}

export const getAuthStateFromStorage = (): AuthState => {
  const me = LocalStorageService.getValue<AuthUser>("me");

  const roles = Array.isArray(me?.roles) ? me.roles : [];

  return {
    user: me ?? null,
    roles,
    isAdmin: roles.includes("ADMIN"),
    isEmployee: roles.includes("EMPLOYER"),
    isJobSeeker: roles.includes("SEEKER"),
  };
};

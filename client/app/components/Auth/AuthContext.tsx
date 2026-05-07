"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@clerk/nextjs";

/**
 * User role types
 */
export type UserRole = "admin" | "superadmin" | "klient" | "tenant";

/**
 * Extended user info with role
 */
interface UserInfo {
  id: string;
  email?: string;
  role: UserRole;
}

/**
 * Authentication context interface
 */
interface AuthContextType {
  userInfo: UserInfo | null;
  setRole: (role: UserRole) => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Authentication provider for managing user roles and permissions
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const { isLoaded, userId } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (userId && isLoaded) {
      setUserInfo({
        id: userId,
        role: "tenant"
      });
    } else {
      setUserInfo(null);
    }
  }, [userId, isLoaded]);

  const setRole = (role: UserRole) => {
    if (userInfo) {
      setUserInfo({ ...userInfo, role });
    }
  };

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!userInfo) return false;
    if (Array.isArray(roles)) {
      return roles.includes(userInfo.role);
    }
    return userInfo.role === roles;
  };

  return (
    <AuthContext.Provider value={{ userInfo, setRole, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use auth context
 */
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
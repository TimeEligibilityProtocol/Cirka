import { User } from "@wearto-you/domain";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Platform } from "react-native";
import { apiClient, setAuthToken } from "../config/apiClient";

const TOKEN_STORAGE_KEY = "wearto_you_auth_token";

// Web only for now — same pragmatic scoping as photoPicker.ts and
// backgroundRemoval.ts (this app currently ships to web; a native
// SecureStorage-backed implementation is a separate follow-up).
function readStoredToken(): string | null {
  if (Platform.OS !== "web" || typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}
function writeStoredToken(token: string | null): void {
  if (Platform.OS !== "web" || typeof window === "undefined") return;
  if (token) window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  else window.localStorage.removeItem(TOKEN_STORAGE_KEY);
}

interface AuthState {
  user: User | null;
  status: "checking" | "ready";
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<(AuthState & AuthActions) | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<"checking" | "ready">("checking");

  useEffect(() => {
    const token = readStoredToken();
    if (!token) {
      setStatus("ready");
      return;
    }
    setAuthToken(token);
    apiClient
      .me()
      .then((fetchedUser) => setUser(fetchedUser))
      .catch(() => {
        // Stored token is no longer valid (server restarted, expired, etc.).
        setAuthToken(null);
        writeStoredToken(null);
      })
      .finally(() => setStatus("ready"));
  }, []);

  const applySession = (token: string, sessionUser: User) => {
    setAuthToken(token);
    writeStoredToken(token);
    setUser(sessionUser);
  };

  const value = useMemo<AuthState & AuthActions>(
    () => ({
      user,
      status,
      login: async (email, password) => {
        const { token, user: sessionUser } = await apiClient.login(email, password);
        applySession(token, sessionUser);
      },
      register: async (email, password, displayName) => {
        const { token, user: sessionUser } = await apiClient.register(email, password, displayName);
        applySession(token, sessionUser);
      },
      logout: () => {
        apiClient.logout().catch(() => {});
        setAuthToken(null);
        writeStoredToken(null);
        setUser(null);
      },
    }),
    [user, status]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

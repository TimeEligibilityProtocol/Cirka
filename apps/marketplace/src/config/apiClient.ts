import { ApiClient } from "@wearto-you/api-client";

/**
 * Resolves the API host. EXPO_PUBLIC_API_BASE_URL (inlined at build time
 * by Expo/Metro) wins when set — needed once the frontend and API are no
 * longer on the same machine (e.g. frontend on Netlify, API on Railway).
 * Without it, falls back to whatever host the app itself was loaded from
 * on port 4000 — so the same local build works at http://localhost:8090
 * and http://<lan-ip>:8090 (a phone on the same Wi-Fi) without a rebuild.
 */
function resolveApiBaseUrl(): string {
  if (process.env.EXPO_PUBLIC_API_BASE_URL) {
    return process.env.EXPO_PUBLIC_API_BASE_URL;
  }
  if (typeof window !== "undefined" && window.location?.hostname) {
    return `http://${window.location.hostname}:4000`;
  }
  return "http://localhost:4000";
}

// Mutable holder so the auth store (which owns the actual session token) can
// update it after login/logout without re-creating this module-level client.
let authToken: string | null = null;

export function setAuthToken(token: string | null): void {
  authToken = token;
}

export const apiClient = new ApiClient({
  baseUrl: resolveApiBaseUrl(),
  getAuthToken: async () => authToken,
});

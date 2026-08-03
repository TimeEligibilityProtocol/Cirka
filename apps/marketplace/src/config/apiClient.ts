import { ApiClient } from "@wearto-you/api-client";

/**
 * Resolves the API host from whatever host the app itself was loaded
 * from — so the same build works at http://localhost:8090 (this
 * machine) and http://<lan-ip>:8090 (a phone on the same Wi-Fi) without
 * a rebuild. Falls back to localhost for native/non-browser contexts.
 */
function resolveApiBaseUrl(): string {
  if (typeof window !== "undefined" && window.location?.hostname) {
    return `http://${window.location.hostname}:4000`;
  }
  return "http://localhost:4000";
}

export const apiClient = new ApiClient({ baseUrl: resolveApiBaseUrl() });

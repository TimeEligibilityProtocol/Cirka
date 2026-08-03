import { ApiClient } from "@wearto-you/api-client";

/** Same-host resolution as apps/marketplace — works from any device that can load this page. */
function resolveApiBaseUrl(): string {
  if (typeof window !== "undefined" && window.location?.hostname) {
    return `http://${window.location.hostname}:4000`;
  }
  return "http://localhost:4000";
}

export const apiClient = new ApiClient({ baseUrl: resolveApiBaseUrl() });

import { Platform } from "react-native";

// Chromium browsers (Chrome, Edge, Android) already show their own native
// install affordance in the address bar the moment a page qualifies —
// reliably, with no page code involved. A custom button trying to
// duplicate that by calling the browser's beforeinstallprompt/.prompt()
// API adds a second, less reliable path for the exact same outcome, so
// this deliberately does NOT do that anymore — Chrome's own icon is the
// only install path there.
//
// Safari (iOS and macOS) is the one place a custom prompt earns its
// place: it has no native install affordance at all, programmatic or
// otherwise, so without this button there'd be nothing pointing sellers/
// buyers to Share → Add to Home Screen (iOS) or File → Add to Dock (Mac).
export type InstallMethod = "safari-ios" | "safari-mac" | null;

export function useInstallPrompt(): { installMethod: InstallMethod } {
  if (Platform.OS !== "web") return { installMethod: null };

  const nav = navigator as Navigator & { standalone?: boolean };
  const alreadyStandalone = window.matchMedia("(display-mode: standalone)").matches || !!nav.standalone;
  if (alreadyStandalone) return { installMethod: null };

  // Chrome's UA also contains "Safari", so it has to be explicitly excluded —
  // this is the standard (if inelegant) way to isolate real Safari.
  const ua = navigator.userAgent;
  const isSafari = /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(ua);
  if (!isSafari) return { installMethod: null };

  const isIOS = /iphone|ipad|ipod/i.test(ua);
  return { installMethod: isIOS ? "safari-ios" : "safari-mac" };
}

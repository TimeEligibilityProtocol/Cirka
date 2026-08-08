import { useEffect, useState } from "react";
import { Platform } from "react-native";

// Only Chromium browsers (Chrome, Edge, Android/desktop) fire this event —
// Safari (iOS and macOS) never does, since it has no programmatic install
// API at all. There, the seller/buyer installs via Safari's own UI (Share
// → Add to Home Screen on iOS, File → Add to Dock on Mac) — a custom
// button can't trigger that, only point people to it.
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export type InstallMethod = "prompt" | "safari-ios" | "safari-mac" | null;

function isStandaloneAlready(): boolean {
  if (Platform.OS !== "web") return false;
  const nav = navigator as Navigator & { standalone?: boolean };
  return window.matchMedia("(display-mode: standalone)").matches || !!nav.standalone;
}

function detectSafariMethod(): InstallMethod {
  if (Platform.OS !== "web") return null;
  // Chrome's UA also contains "Safari", so it has to be explicitly excluded —
  // this is the standard (if inelegant) way to isolate real Safari.
  const ua = navigator.userAgent;
  const isSafari = /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(ua);
  if (!isSafari) return null;
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  return isIOS ? "safari-ios" : "safari-mac";
}

/**
 * Drives a page-native "Install" button instead of relying on the seller
 * finding the browser's own (easy-to-miss, differently-located-per-browser)
 * install affordance. `installMethod` tells the caller both whether to show
 * a button and what pressing it should do: trigger the real Chromium
 * prompt, or — on Safari, which has no such API — show instructions for
 * that platform's manual step instead.
 */
export function useInstallPrompt() {
  const [deferredEvent, setDeferredEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(isStandaloneAlready);

  useEffect(() => {
    if (Platform.OS !== "web") return;
    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredEvent(e as BeforeInstallPromptEvent);
    };
    const onAppInstalled = () => {
      setInstalled(true);
      setDeferredEvent(null);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredEvent) return;
    await deferredEvent.prompt();
    const choice = await deferredEvent.userChoice;
    if (choice.outcome === "accepted") setInstalled(true);
    setDeferredEvent(null);
  };

  const installMethod: InstallMethod = installed ? null : deferredEvent ? "prompt" : detectSafariMethod();

  return { installMethod, promptInstall };
}

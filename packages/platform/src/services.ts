/**
 * Platform-specific capabilities live behind these interfaces (spec section 23).
 * Screens and shared components must never touch window/document/DOM,
 * service workers, or raw <input type="file"> directly — only through
 * concrete implementations of these interfaces, selected per platform
 * (web/iOS/Android) at the app entry point.
 */

export interface CapturedPhoto {
  uri: string;
  width: number;
  height: number;
}

export interface CameraService {
  requestPermission(): Promise<boolean>;
  takePhoto(): Promise<CapturedPhoto>;
}

export interface MediaPicker {
  requestPermission(): Promise<boolean>;
  pickImages(maxCount: number): Promise<CapturedPhoto[]>;
}

export interface VoiceRecording {
  uri: string;
  durationMs: number;
}

export interface VoiceRecorder {
  requestPermission(): Promise<boolean>;
  start(): Promise<void>;
  stop(): Promise<VoiceRecording>;
  cancel(): Promise<void>;
}

export interface NotificationService {
  requestPermission(): Promise<boolean>;
  registerForPush(): Promise<string | null>; // returns push token, or null if unavailable
}

export interface SecureStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export interface DeepLinkService {
  getInitialUrl(): Promise<string | null>;
  onUrlOpen(handler: (url: string) => void): () => void; // returns unsubscribe fn
}

/** Available payment UI methods depend on runtime capability detection — never assumed from API docs alone. */
export type PaymentMethodKind = "card" | "apple_pay" | "google_pay" | "bank";

export interface PaymentUI {
  getAvailableMethods(): Promise<PaymentMethodKind[]>;
  presentCheckout(params: { amountMinor: number; currency: string; orderId: string }): Promise<{
    status: "success" | "cancelled" | "failed";
  }>;
}

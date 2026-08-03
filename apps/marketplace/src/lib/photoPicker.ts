import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

const MAX_PHOTOS = 10;

// Web: ImagePicker can't open the device camera (no camera API access from
// a browser tab), so "Take a photo" falls back to a plain file input with
// capture="environment" — on a phone browser this still opens the native
// camera app directly. "Choose from gallery" also uses a plain input on
// web for predictable multi-select behavior across browsers.
function pickFromWebInput(opts: { capture?: boolean; multiple?: boolean }): Promise<string[]> {
  return new Promise((resolve) => {
    let settled = false;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    if (opts.capture) input.setAttribute("capture", "environment");
    input.multiple = !!opts.multiple;
    input.style.display = "none";

    const cleanup = () => {
      if (input.parentNode) document.body.removeChild(input);
    };
    const settle = (urls: string[]) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(urls);
    };

    input.onchange = () => {
      const files = Array.from(input.files ?? []);
      settle(files.map((f) => URL.createObjectURL(f)));
    };
    // If the user dismisses the picker without choosing anything, no
    // 'change' event fires — fall back to an empty list once the window
    // regains focus (the 'change' event, when it does fire, always wins
    // the race since settle() only acts on the first call).
    window.addEventListener("focus", () => setTimeout(() => settle([]), 800), { once: true });
    document.body.appendChild(input);
    input.click();
  });
}

export async function takePhoto(): Promise<string[]> {
  if (Platform.OS === "web") {
    return pickFromWebInput({ capture: true, multiple: false });
  }
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) return [];
  const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
  if (result.canceled) return [];
  return result.assets.map((a) => a.uri);
}

export async function chooseFromGallery(remainingSlots: number): Promise<string[]> {
  if (Platform.OS === "web") {
    return pickFromWebInput({ multiple: true });
  }
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) return [];
  const result = await ImagePicker.launchImageLibraryAsync({
    quality: 0.8,
    allowsMultipleSelection: true,
    selectionLimit: Math.max(1, remainingSlots),
  });
  if (result.canceled) return [];
  return result.assets.map((a) => a.uri);
}

export { MAX_PHOTOS };

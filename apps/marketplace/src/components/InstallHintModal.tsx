import { colors, radii, spacing, typography } from "@wearto-you/ui";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { InstallMethod } from "../lib/useInstallPrompt";
import { CloseIcon } from "./icons/icons";

const COPY: Record<Exclude<InstallMethod, null>, { title: string; steps: string[]; done: string }> = {
  "safari-ios": {
    title: "Install on iPhone",
    steps: [
      'At the bottom of the screen, tap the Share icon (a square with an arrow) — or "•••" if that\'s what you see instead.',
      'In the menu that opens, tap "Add to Home Screen", then tap "Add".',
    ],
    done: "That's it — a Cirka icon appears on your Home Screen, and opens full-screen like any other app.",
  },
  "safari-mac": {
    title: "Install on Mac",
    steps: ['At the very top of your screen, click "File", then click "Add to Dock".', 'Click "Add" to confirm.'],
    done: "That's it — a Cirka icon appears in your Dock, and opens like any other app.",
  },
};

/** Safari has no programmatic install API — this walks the seller/buyer through its manual step instead. */
export function InstallHintModal({ method, onClose }: { method: "safari-ios" | "safari-mac"; onClose: () => void }) {
  const copy = COPY[method];
  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{copy.title}</Text>
            <Pressable onPress={onClose} hitSlop={8} accessibilityLabel="Close">
              <CloseIcon size={16} color={colors.text} />
            </Pressable>
          </View>
          {copy.steps.map((step, i) => (
            <View key={step} style={styles.stepRow}>
              <Text style={styles.stepNumber}>{i + 1}</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
          <Text style={styles.doneText}>{copy.done}</Text>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(9,9,9,0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    padding: spacing.lg,
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.md },
  title: { fontSize: 17, fontWeight: typography.weights.heading as "700", color: colors.text },
  stepRow: { flexDirection: "row", gap: spacing.sm, marginBottom: spacing.sm, alignItems: "flex-start" },
  stepNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    color: colors.surface,
    fontSize: 12,
    fontWeight: typography.weights.bodyMedium as "500",
    textAlign: "center",
    lineHeight: 20,
  },
  stepText: { flex: 1, fontSize: 14, color: colors.text, lineHeight: 20 },
  doneText: { fontSize: 13, color: colors.text, opacity: 0.7, marginTop: spacing.sm, lineHeight: 19 },
});

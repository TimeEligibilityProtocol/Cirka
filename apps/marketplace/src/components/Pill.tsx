import { colors, radii, typography } from "@wearto-you/ui";
import { Pressable, StyleSheet, Text } from "react-native";

export function Pill({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.pill, active ? styles.pillActive : undefined]}>
      <Text style={[styles.label, active ? styles.labelActive : undefined]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontSize: 13,
    fontWeight: typography.weights.bodyMedium as "500",
    color: colors.text,
  },
  labelActive: {
    color: colors.surface,
  },
});

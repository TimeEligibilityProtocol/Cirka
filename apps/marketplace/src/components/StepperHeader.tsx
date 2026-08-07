import { colors, spacing, typography } from "@wearto-you/ui";
import { StyleSheet, Text, View } from "react-native";

export function StepperHeader({ steps, activeIndex }: { steps: string[]; activeIndex: number }) {
  return (
    <View style={styles.row}>
      <View style={styles.inner}>
      {steps.map((step, i) => {
        const done = i < activeIndex;
        const active = i === activeIndex;
        return (
          <View key={step} style={styles.stepWrap}>
            <View style={styles.stepCircleRow}>
              <View style={[styles.circle, done || active ? styles.circleActive : undefined]}>
                <Text style={[styles.circleText, done || active ? styles.circleTextActive : undefined]}>
                  {done ? "✓" : i + 1}
                </Text>
              </View>
              {i < steps.length - 1 ? <View style={[styles.line, done ? styles.lineActive : undefined]} /> : null}
            </View>
            <Text style={[styles.label, active ? styles.labelActive : undefined]}>{step}</Text>
          </View>
        );
      })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: "center",
  },
  // Same cap as AddListingScreen's WIZARD_MAX_WIDTH — this component is
  // only ever used inside that wizard, so a matching literal here is fine
  // (a shared constant would be overkill for a one-consumer component).
  inner: { flexDirection: "row", width: "100%", maxWidth: 640 },
  stepWrap: { flex: 1, alignItems: "center" },
  stepCircleRow: { flexDirection: "row", alignItems: "center", width: "100%" },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  circleActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  circleText: { fontSize: 12, color: colors.text, fontWeight: typography.weights.bodyMedium as "500" },
  circleTextActive: { color: colors.surface },
  line: { flex: 1, height: 1, backgroundColor: colors.border },
  lineActive: { backgroundColor: colors.primary },
  label: { fontSize: 11, color: colors.text, opacity: 0.6, marginTop: 4 },
  labelActive: { opacity: 1, fontWeight: typography.weights.bodyMedium as "500" },
});

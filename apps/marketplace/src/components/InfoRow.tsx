import { colors, radii, spacing, typography } from "@wearto-you/ui";
import { StyleSheet, Text, View } from "react-native";

export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <View style={styles.textCol}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  textCol: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: typography.weights.bodyMedium as "500",
    color: colors.text,
  },
  value: {
    fontSize: 13,
    color: colors.text,
    opacity: 0.7,
    marginTop: 2,
  },
});

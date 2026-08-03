import { colors, typography } from "@wearto-you/ui";
import { StyleSheet, Text, View } from "react-native";

export function Wordmark({ size = 15 }: { size?: number }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.text, { fontSize: size }]}>wearto</Text>
      <Text style={[styles.text, styles.accent, { fontSize: size }]}>.you</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  text: {
    fontWeight: typography.weights.logo as "600",
    color: colors.text,
    letterSpacing: -0.3,
  },
  accent: {
    color: colors.primary,
  },
});

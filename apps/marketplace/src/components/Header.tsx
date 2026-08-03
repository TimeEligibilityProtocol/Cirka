import { colors, spacing, typography } from "@wearto-you/ui";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useStack } from "../nav/stack";
import { Wordmark } from "./Wordmark";

export function Header({ title, right }: { title?: string; right?: string }) {
  const { canGoBack, pop } = useStack();
  return (
    <View style={styles.row}>
      <View style={styles.side}>
        {canGoBack ? (
          <Pressable onPress={pop} hitSlop={8}>
            <Text style={styles.back}>‹</Text>
          </Pressable>
        ) : null}
      </View>
      {title ? <Text style={styles.title}>{title}</Text> : <Wordmark size={16} />}
      <View style={[styles.side, styles.sideRight]}>{right ? <Text style={styles.right}>{right}</Text> : null}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  side: {
    width: 44,
  },
  sideRight: {
    alignItems: "flex-end",
  },
  back: {
    fontSize: 28,
    color: colors.text,
    lineHeight: 28,
  },
  right: {
    fontSize: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: typography.weights.button as "600",
    color: colors.text,
  },
});

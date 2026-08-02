import { colors, radii, sizes, typography } from "@wearto-you/ui";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

export function PrimaryButton({
  label,
  onPress,
  variant = "primary",
  style,
}: {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === "primary" ? styles.primary : styles.secondary,
        pressed ? styles.pressed : undefined,
        style,
      ]}
    >
      <Text style={variant === "primary" ? styles.labelPrimary : styles.labelSecondary}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: sizes.primaryButtonMinHeight,
    borderRadius: radii.card,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.85,
  },
  labelPrimary: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: typography.weights.button as "600",
  },
  labelSecondary: {
    color: colors.text,
    fontSize: 16,
    fontWeight: typography.weights.button as "600",
  },
});

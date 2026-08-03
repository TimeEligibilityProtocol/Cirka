import { colors, radii, typography } from "@wearto-you/ui";
import { ComponentType } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { IconProps } from "./icons/icons";

export function Pill({
  label,
  active,
  onPress,
  icon: Icon,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
  icon?: ComponentType<IconProps>;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.pill, active ? styles.pillActive : undefined]}>
      {Icon ? <Icon size={15} color={active ? colors.surface : colors.text} /> : null}
      <Text style={[styles.label, active ? styles.labelActive : undefined]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
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

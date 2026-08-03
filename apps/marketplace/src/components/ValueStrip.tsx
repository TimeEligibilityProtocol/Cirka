import { colors, spacing, typography } from "@wearto-you/ui";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { CommunityIcon, LeafIcon, LockIcon, ShieldIcon } from "./icons/icons";

const ITEMS = [
  { Icon: ShieldIcon, title: "Quality you can trust", subtitle: "Verified items, loved again" },
  { Icon: LeafIcon, title: "Sustainable choice", subtitle: "Good for you, better for Earth" },
  { Icon: CommunityIcon, title: "Community driven", subtitle: "Buy, sell and connect" },
  { Icon: LockIcon, title: "Safe & secure", subtitle: "Secure payments & privacy" },
];

export function ValueStrip() {
  const { width } = useWindowDimensions();
  const columns = width >= 1024 ? 4 : width >= 640 ? 2 : 1;

  return (
    <View style={styles.wrap}>
      {ITEMS.map((item) => (
        <View key={item.title} style={[styles.item, { width: `${100 / columns}%` }]}>
          <View style={styles.iconWrap}>
            <item.Icon size={20} color={colors.primary} />
          </View>
          <View style={styles.textCol}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: spacing.sm,
    paddingRight: spacing.md,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.highlight,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  textCol: { flexShrink: 1 },
  title: {
    fontSize: 13,
    fontWeight: typography.weights.bodyMedium as "500",
    color: colors.text,
  },
  subtitle: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.6,
    marginTop: 2,
  },
});

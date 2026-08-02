import { colors, spacing, typography } from "@wearto-you/ui";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PlaceholderScreen } from "./src/screens/PlaceholderScreen";

const TABS = [
  { key: "discover", label: "Discover", note: "Product feed. Lands in the next step." },
  { key: "saved", label: "Saved", note: "Favorited products." },
  { key: "add", label: "Add", note: "Magic Listing — start selling an item." },
  { key: "messages", label: "Messages", note: "Buyer ↔ seller conversations." },
  { key: "profile", label: "Profile", note: "Account, orders, sales, fit profile." },
] as const;

export default function App() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["key"]>("discover");
  const active = TABS.find((t) => t.key === activeTab)!;

  return (
    <View style={styles.safeArea}>
      <StatusBar style="dark" />
      <PlaceholderScreen title={active.label} note={active.note} />
      <View style={styles.bottomNav}>
        {TABS.map((tab) => (
          <Pressable key={tab.key} onPress={() => setActiveTab(tab.key)} style={styles.tabButton}>
            <Text
              style={[
                styles.tabLabel,
                tab.key === activeTab ? styles.tabLabelActive : undefined,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bottomNav: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: typography.weights.bodyMedium as "500",
    color: colors.text,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: typography.weights.button as "600",
  },
});

import { colors, radii, spacing, typography } from "@wearto-you/ui";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useStack } from "../nav/stack";
import { Wordmark } from "./Wordmark";
import { ChatIcon, HeartIcon, ProfileIcon, SearchIcon } from "./icons/icons";

export function HomeHeader({
  desktop,
  searchValue,
  onSearchChange,
}: {
  desktop: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
}) {
  const { push, reset } = useStack();

  const iconRow = (
    <View style={styles.iconRow}>
      <Pressable onPress={() => reset("Saved")} hitSlop={8} accessibilityLabel="Saved items">
        <HeartIcon size={20} color={colors.text} />
      </Pressable>
      <Pressable onPress={() => reset("Messages")} hitSlop={8} accessibilityLabel="Messages">
        <ChatIcon size={20} color={colors.text} />
      </Pressable>
      <Pressable onPress={() => reset("Profile")} hitSlop={8} accessibilityLabel="Profile">
        <ProfileIcon size={20} color={colors.text} />
      </Pressable>
    </View>
  );

  // Mobile/tablet already have Saved/Messages/Profile in the bottom nav —
  // repeating them here would be a duplicate set of the same destinations.
  if (!desktop) {
    return (
      <View style={[styles.compactRow, styles.compactRowLeft]}>
        <Wordmark size={28} />
      </View>
    );
  }

  const search = (
    <View style={styles.searchWrap}>
      <SearchIcon size={16} color={colors.text} />
      <TextInput
        value={searchValue}
        onChangeText={onSearchChange}
        placeholder="Search…"
        placeholderTextColor={`${colors.text}88`}
        style={[styles.searchInput, { outlineStyle: "none" }] as never}
      />
    </View>
  );

  // Three equal-width zones (logo / search / actions) so the search bar
  // sits dead-center of the header regardless of how wide the other two
  // are, rather than just centered in the leftover space.
  return (
    <View style={styles.desktopRow}>
      <View style={styles.zoneLeft}>
        <Wordmark size={46} />
      </View>
      <View style={styles.zoneCenter}>{search}</View>
      <View style={styles.zoneRight}>
        {iconRow}
        <Pressable style={styles.sellButton} onPress={() => push("AddListing")}>
          <Text style={styles.sellButtonLabel}>Sell</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  compactRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  compactRowLeft: {
    justifyContent: "flex-start",
  },
  desktopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  zoneLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  zoneCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  zoneRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: spacing.lg,
  },
  searchWrap: {
    width: 260,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  sellButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingHorizontal: 22,
    paddingVertical: 11,
  },
  sellButtonLabel: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: typography.weights.button as "600",
  },
});

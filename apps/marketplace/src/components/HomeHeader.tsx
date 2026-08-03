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

  if (!desktop) {
    return (
      <View style={styles.compactRow}>
        <Wordmark size={16} />
        {iconRow}
      </View>
    );
  }

  return (
    <View style={styles.desktopRow}>
      <Wordmark size={17} />
      <View style={styles.searchWrap}>
        <SearchIcon size={17} color={colors.text} />
        <TextInput
          value={searchValue}
          onChangeText={onSearchChange}
          placeholder="Search for items, brands or styles…"
          placeholderTextColor={`${colors.text}88`}
          style={[styles.searchInput, { outlineStyle: "none" }] as never}
        />
      </View>
      {iconRow}
      <Pressable style={styles.sellButton} onPress={() => push("AddListing")}>
        <Text style={styles.sellButtonLabel}>Sell</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  compactRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 12,
  },
  desktopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    marginTop: 20,
    marginBottom: 20,
  },
  searchWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: 16,
    paddingVertical: 10,
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

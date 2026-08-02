import { getRootCategoryId, ROOT_CATEGORIES } from "@wearto-you/domain";
import { colors, spacing, typography } from "@wearto-you/ui";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ProductCard } from "../components/ProductCard";
import { Pill } from "../components/Pill";
import { useStack } from "../nav/stack";
import { useStore } from "../state/store";

const ALL = "all";

export function DiscoverScreen() {
  const { listings } = useStore();
  const { push } = useStack();
  const [activeCategory, setActiveCategory] = useState<string>(ALL);

  const visible = listings.filter((l) => l.status !== "removed" && l.status !== "hidden");
  const filtered =
    activeCategory === ALL ? visible : visible.filter((l) => getRootCategoryId(l.categoryId) === activeCategory);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <Text style={styles.wordmark}>wearto.you</Text>
      </View>
      <Text style={styles.heading}>Discover</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pills}>
        <Pill label="All" active={activeCategory === ALL} onPress={() => setActiveCategory(ALL)} />
        {ROOT_CATEGORIES.map((c) => (
          <Pill key={c.id} label={c.labelEn} active={activeCategory === c.id} onPress={() => setActiveCategory(c.id)} />
        ))}
      </ScrollView>
      <View style={styles.grid}>
        {filtered.map((listing) => (
          <ProductCard key={listing.id} listing={listing} onPress={() => push("ProductDetail", { listingId: listing.id })} />
        ))}
      </View>
      {filtered.length === 0 ? <Text style={styles.empty}>No items in this category yet.</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  topBar: {
    marginBottom: spacing.sm,
  },
  wordmark: {
    fontSize: 15,
    fontWeight: typography.weights.logo as "600",
    color: colors.text,
    letterSpacing: -0.3,
  },
  heading: {
    fontSize: 30,
    fontWeight: typography.weights.heading as "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  pills: {
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: spacing.md,
  },
  empty: {
    marginTop: spacing.lg,
    color: colors.text,
    opacity: 0.6,
  },
});

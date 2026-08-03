import { getRootCategoryId, getSubcategories, ROOT_CATEGORIES } from "@wearto-you/domain";
import { colors, getFeedBreakpoint, HEART_BUTTON, isDesktopWidth, typography } from "@wearto-you/ui";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { ProductCard } from "../components/ProductCard";
import { Pill } from "../components/Pill";
import { useStack } from "../nav/stack";
import { useStore } from "../state/store";

const ALL = "all";

export function DiscoverScreen() {
  const { listings, loading, loadError } = useStore();
  const { push } = useStack();
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const { width } = useWindowDimensions();

  const subcategories = activeCategory === ALL ? [] : getSubcategories(activeCategory);

  const visible = listings.filter((l) => l.status !== "removed" && l.status !== "hidden");
  const filtered = visible.filter((l) => {
    if (activeCategory === ALL) return true;
    if (activeSubcategory) return l.categoryId === activeSubcategory;
    return getRootCategoryId(l.categoryId) === activeCategory;
  });

  const breakpoint = getFeedBreakpoint(width);
  const contentWidth = Math.min(width, breakpoint.contentMaxWidth ?? width);
  const cardWidth =
    (contentWidth - breakpoint.pagePadding * 2 - breakpoint.columnGap * (breakpoint.columns - 1)) /
    breakpoint.columns;
  const heartSize = isDesktopWidth(width) ? HEART_BUTTON.desktop : HEART_BUTTON.mobile;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={[styles.content, { width: contentWidth, paddingHorizontal: breakpoint.pagePadding }]}>
        <View style={styles.topBar}>
          <Text style={styles.wordmark}>wearto.you</Text>
        </View>
        <Text style={styles.heading}>Discover</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pills}>
          <Pill
            label="All"
            active={activeCategory === ALL}
            onPress={() => {
              setActiveCategory(ALL);
              setActiveSubcategory(null);
            }}
          />
          {ROOT_CATEGORIES.map((c) => (
            <Pill
              key={c.id}
              label={c.labelEn}
              active={activeCategory === c.id}
              onPress={() => {
                setActiveCategory(c.id);
                setActiveSubcategory(null);
              }}
            />
          ))}
        </ScrollView>
        {subcategories.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subPills}>
            <Pill
              label={`All ${ROOT_CATEGORIES.find((c) => c.id === activeCategory)?.labelEn}`}
              active={activeSubcategory === null}
              onPress={() => setActiveSubcategory(null)}
            />
            {subcategories.map((sub) => (
              <Pill
                key={sub.id}
                label={sub.labelEn}
                active={activeSubcategory === sub.id}
                onPress={() => setActiveSubcategory(sub.id)}
              />
            ))}
          </ScrollView>
        ) : null}
        <View style={[styles.grid, { columnGap: breakpoint.columnGap, rowGap: breakpoint.rowGap }]}>
          {filtered.map((listing) => (
            <ProductCard
              key={listing.id}
              listing={listing}
              cardWidth={cardWidth}
              imageRadius={breakpoint.imageRadius}
              heartSize={heartSize}
              onPress={() => push("ProductDetail", { listingId: listing.id })}
            />
          ))}
        </View>
        {loadError ? (
          <Text style={styles.empty}>Couldn't reach the wearto.you API ({loadError}). Is `npm run dev:api` running?</Text>
        ) : loading ? (
          <Text style={styles.empty}>Loading…</Text>
        ) : filtered.length === 0 ? (
          <Text style={styles.empty}>No items in this category yet.</Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 32,
  },
  content: {
    alignSelf: "center",
  },
  topBar: {
    marginBottom: 8,
    marginTop: 16,
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
    marginBottom: 8,
  },
  pills: {
    marginBottom: 8,
  },
  subPills: {
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  empty: {
    marginTop: 24,
    color: colors.text,
    opacity: 0.6,
  },
});

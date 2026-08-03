import { getRootCategoryId, getSubcategories, ROOT_CATEGORIES } from "@wearto-you/domain";
import { colors, getFeedBreakpoint, HEART_BUTTON, isDesktopWidth } from "@wearto-you/ui";
import { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { HeroBanner } from "../components/HeroBanner";
import { HomeHeader } from "../components/HomeHeader";
import { ProductCard } from "../components/ProductCard";
import { Pill } from "../components/Pill";
import { ValueStrip } from "../components/ValueStrip";
import { AllCategoriesIcon } from "../components/icons/icons";
import { categoryIcon } from "../components/icons/categoryIcons";
import { useStack } from "../nav/stack";
import { useStore } from "../state/store";

const ALL = "all";

export function DiscoverScreen() {
  const { listings, loading, loadError } = useStore();
  const { push } = useStack();
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const { width } = useWindowDimensions();
  const desktop = isDesktopWidth(width);
  const scrollRef = useRef<ScrollView>(null);
  const gridSectionY = useRef(0);

  const subcategories = activeCategory === ALL ? [] : getSubcategories(activeCategory);

  const visible = listings.filter((l) => l.status !== "removed" && l.status !== "hidden");
  const query = search.trim().toLowerCase();
  const filtered = visible.filter((l) => {
    if (query && !(l.title.sellerSelectedValue ?? "").toLowerCase().includes(query)) return false;
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
    <ScrollView ref={scrollRef} style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={[styles.content, { width: contentWidth, paddingHorizontal: breakpoint.pagePadding }]}>
        <HomeHeader desktop={desktop} searchValue={search} onSearchChange={setSearch} />
        <HeroBanner
          onShopNow={() => scrollRef.current?.scrollTo({ y: gridSectionY.current, animated: true })}
        />
        <View onLayout={(e) => (gridSectionY.current = e.nativeEvent.layout.y)}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pills}>
            <Pill
              label="All"
              icon={AllCategoriesIcon}
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
                icon={categoryIcon(c.id)}
                active={activeCategory === c.id}
                onPress={() => {
                  setActiveCategory(c.id);
                  setActiveSubcategory(null);
                }}
              />
            ))}
          </ScrollView>
        </View>
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
        <ValueStrip />
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

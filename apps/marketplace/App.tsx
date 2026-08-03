import { colors, isDesktopWidth, spacing, typography } from "@wearto-you/ui";
import { StatusBar } from "expo-status-bar";
import { ComponentType } from "react";
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { HeartIcon, HomeIcon, PlusIcon, ProfileIcon, SearchIcon } from "./src/components/icons/icons";
import { StackProvider, useStack } from "./src/nav/stack";
import { AddListingScreen } from "./src/screens/AddListingScreen";
import { CheckoutScreen } from "./src/screens/CheckoutScreen";
import { ClaimDetailScreen } from "./src/screens/ClaimDetailScreen";
import { DiscoverScreen } from "./src/screens/DiscoverScreen";
import { OrderStatusScreen } from "./src/screens/OrderStatusScreen";
import { PayoutClaimScreen } from "./src/screens/PayoutClaimScreen";
import { PlaceholderScreen } from "./src/screens/PlaceholderScreen";
import { ProductDetailScreen } from "./src/screens/ProductDetailScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { QRHandoffScreen } from "./src/screens/QRHandoffScreen";
import { StoreProvider } from "./src/state/store";

function SavedScreen() {
  return <PlaceholderScreen title="Saved" note="Favorited products land here." />;
}
function MessagesScreen() {
  return <PlaceholderScreen title="Messages" note="Buyer ↔ seller conversations land here." />;
}

const SCREENS: Record<string, ComponentType> = {
  Discover: DiscoverScreen,
  ProductDetail: ProductDetailScreen,
  Checkout: CheckoutScreen,
  OrderStatus: OrderStatusScreen,
  QRHandoff: QRHandoffScreen,
  PayoutClaim: PayoutClaimScreen,
  ClaimDetail: ClaimDetailScreen,
  AddListing: AddListingScreen,
  Saved: SavedScreen,
  Messages: MessagesScreen,
  Profile: ProfileScreen,
};

const SCREEN_TAB: Record<string, string> = {
  Discover: "discover",
  ProductDetail: "discover",
  Checkout: "discover",
  OrderStatus: "discover",
  QRHandoff: "discover",
  PayoutClaim: "discover",
  ClaimDetail: "discover",
  AddListing: "add",
  Saved: "saved",
  Messages: "messages",
  Profile: "profile",
};

const TABS = [
  { key: "discover", label: "Home", root: "Discover", Icon: HomeIcon, params: undefined },
  { key: "search", label: "Search", root: "Discover", Icon: SearchIcon, params: { focusSearch: "1" } },
  { key: "add", label: "Sell", root: "AddListing", Icon: PlusIcon, params: undefined },
  { key: "saved", label: "Saved", root: "Saved", Icon: HeartIcon, params: undefined },
  { key: "profile", label: "Profile", root: "Profile", Icon: ProfileIcon, params: undefined },
] as const;

// Bottom nav is a mobile/tablet pattern only — desktop uses the persistent
// header (search bar, saved/messages/profile icons, Sell button) instead,
// per the approved responsive spec ("Desktop: no bottom navigation").
function AppShell() {
  const { current, reset } = useStack();
  const { width } = useWindowDimensions();
  const Screen = SCREENS[current.name] ?? DiscoverScreen;
  const activeTab = SCREEN_TAB[current.name] ?? "discover";
  const activeSubTab = current.name === "Discover" && current.params?.focusSearch === "1" ? "search" : activeTab;
  const hideBottomNav = isDesktopWidth(width);

  return (
    <View style={styles.pageOuter}>
      <View style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.screenArea}>
          <Screen />
        </View>
        {!hideBottomNav ? (
          <View style={styles.bottomNav}>
            {TABS.map((tab) => {
              const active = tab.key === activeSubTab;
              const isSell = tab.key === "add";
              return (
                <Pressable
                  key={tab.key}
                  onPress={() => reset(tab.root, tab.params)}
                  style={isSell ? styles.sellTabButton : styles.tabButton}
                >
                  <View style={isSell ? styles.sellButtonCircle : undefined}>
                    <tab.Icon size={isSell ? 22 : 20} color={isSell ? colors.surface : active ? colors.primary : colors.text} />
                  </View>
                  {!isSell ? (
                    <Text style={[styles.tabLabel, active ? styles.tabLabelActive : undefined]}>{tab.label}</Text>
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StackProvider initial="Discover">
        <AppShell />
      </StackProvider>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  pageOuter: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.background,
  },
  screenArea: {
    flex: 1,
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
    gap: 3,
    minHeight: 44,
  },
  sellTabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sellButtonCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    shadowColor: colors.primaryPressed,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: typography.weights.bodyMedium as "500",
    color: colors.text,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: typography.weights.button as "600",
  },
});

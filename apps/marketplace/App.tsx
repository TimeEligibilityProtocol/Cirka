import { colors, spacing, typography } from "@wearto-you/ui";
import { StatusBar } from "expo-status-bar";
import { ComponentType } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
  { key: "discover", label: "Discover", root: "Discover" },
  { key: "saved", label: "Saved", root: "Saved" },
  { key: "add", label: "Add", root: "AddListing" },
  { key: "messages", label: "Messages", root: "Messages" },
  { key: "profile", label: "Profile", root: "Profile" },
] as const;

function AppShell() {
  const { current, reset } = useStack();
  const Screen = SCREENS[current.name] ?? DiscoverScreen;
  const activeTab = SCREEN_TAB[current.name] ?? "discover";

  return (
    <View style={styles.pageOuter}>
      <View style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.screenArea}>
          <Screen />
        </View>
        <View style={styles.bottomNav}>
          {TABS.map((tab) => (
            <Pressable key={tab.key} onPress={() => reset(tab.root)} style={styles.tabButton}>
              <Text style={[styles.tabLabel, tab.key === activeTab ? styles.tabLabelActive : undefined]}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>
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

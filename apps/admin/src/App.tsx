import { colors, typography } from "@wearto-you/ui";
import { CSSProperties, useState } from "react";
import { ListingsScreen } from "./screens/ListingsScreen";
import { OrdersScreen } from "./screens/OrdersScreen";
import { useAdminData } from "./state/useAdminData";

type Tab = "orders" | "listings";

const NAV: { id: Tab; label: string }[] = [
  { id: "orders", label: "Orders" },
  { id: "listings", label: "Listings" },
];

export function App() {
  const [tab, setTab] = useState<Tab>("orders");
  const { orders, listings, loading, error, lastUpdated, refresh } = useAdminData();

  return (
    <div style={shellStyle}>
      <aside style={sidebarStyle}>
        <div style={wordmarkStyle}>
          wearto<span style={{ color: colors.primary }}>.you</span>
        </div>
        <div style={subWordmarkStyle}>admin</div>
        <nav style={{ marginTop: 32 }}>
          {NAV.map((item) => (
            <div
              key={item.id}
              onClick={() => setTab(item.id)}
              style={{ ...navItemStyle, ...(tab === item.id ? navItemActiveStyle : undefined) }}
            >
              {item.label}
            </div>
          ))}
        </nav>
      </aside>
      <main style={mainStyle}>
        <div style={topBarStyle}>
          <span style={statusTextStyle}>
            {error
              ? `Couldn't reach the API (${error}). Is \`npm run dev:api\` running?`
              : loading
                ? "Loading…"
                : `Updated ${lastUpdated?.toLocaleTimeString() ?? ""} — polling every 4s`}
          </span>
          <span onClick={() => refresh()} style={refreshStyle}>
            Refresh now
          </span>
        </div>
        {tab === "orders" ? <OrdersScreen orders={orders} listings={listings} /> : <ListingsScreen listings={listings} />}
      </main>
    </div>
  );
}

const shellStyle: CSSProperties = {
  display: "flex",
  minHeight: "100vh",
  backgroundColor: colors.background,
  fontFamily: typography.fontFamily,
};

const sidebarStyle: CSSProperties = {
  width: 220,
  flexShrink: 0,
  backgroundColor: colors.surface,
  borderRight: `1px solid ${colors.border}`,
  padding: "24px 20px",
};

const wordmarkStyle: CSSProperties = { fontSize: 16, fontWeight: 600, color: colors.text, letterSpacing: -0.3 };
const subWordmarkStyle: CSSProperties = { fontSize: 12, color: colors.text, opacity: 0.5, marginTop: 2 };

const navItemStyle: CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  fontSize: 14,
  fontWeight: 500,
  color: colors.text,
  cursor: "pointer",
  marginBottom: 4,
};

const navItemActiveStyle: CSSProperties = {
  backgroundColor: colors.highlight,
  color: colors.primaryPressed,
  fontWeight: 600,
};

const mainStyle: CSSProperties = {
  flex: 1,
  padding: "24px 32px",
  maxWidth: 1200,
};

const topBarStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
};

const statusTextStyle: CSSProperties = { fontSize: 12, color: colors.text, opacity: 0.55 };
const refreshStyle: CSSProperties = { fontSize: 12, color: colors.primary, fontWeight: 600, cursor: "pointer" };

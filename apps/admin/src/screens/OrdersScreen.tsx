import { getCategory, Listing, Order } from "@wearto-you/domain";
import { colors, typography } from "@wearto-you/ui";
import { CSSProperties } from "react";
import { Column, Table } from "../components/Table";
import { StatusBadge } from "../components/StatusBadge";

function formatMoney(amountMinor: number, currency: string): string {
  return `${currency} ${(amountMinor / 100).toLocaleString("en-AE", { minimumFractionDigits: 0 })}`;
}

export function OrdersScreen({ orders, listings }: { orders: Order[]; listings: Listing[] }) {
  const columns: Column<Order>[] = [
    { key: "id", header: "Order", width: "14%", render: (o) => <code style={codeStyle}>{o.id.slice(-8)}</code> },
    {
      key: "item",
      header: "Item",
      width: "22%",
      render: (o) => {
        const listing = listings.find((l) => l.id === o.listingId);
        return listing ? listing.title.sellerSelectedValue : o.listingId;
      },
    },
    {
      key: "category",
      header: "Category",
      width: "12%",
      render: (o) => {
        const listing = listings.find((l) => l.id === o.listingId);
        return listing ? getCategory(listing.categoryId)?.labelEn ?? "—" : "—";
      },
    },
    { key: "price", header: "Item price", width: "10%", render: (o) => formatMoney(o.priceAtOrder.amountMinor, o.priceAtOrder.currency) },
    { key: "delivery", header: "Delivery", width: "12%", render: (o) => (o.deliveryMethod === "pickup" ? "Pickup" : "Courier") },
    { key: "payment", header: "Payment", width: "10%", render: (o) => <StatusBadge label={o.paymentStatus} /> },
    { key: "fulfilment", header: "Fulfilment", width: "10%", render: (o) => <StatusBadge label={o.deliveryStatus} /> },
    { key: "payout", header: "Payout", width: "10%", render: (o) => <StatusBadge label={o.payoutStatus} /> },
  ];

  return (
    <div>
      <h1 style={headingStyle}>Orders</h1>
      <p style={subStyle}>Every purchase across every device connected to this API, refreshed every few seconds.</p>
      <Table columns={columns} rows={orders} emptyLabel="No orders yet — buy something in the marketplace app to see it here." />
    </div>
  );
}

const headingStyle: CSSProperties = { fontFamily: typography.fontFamily, fontSize: 24, fontWeight: 700, color: colors.text, marginBottom: 4 };
const subStyle: CSSProperties = { fontFamily: typography.fontFamily, fontSize: 13, color: colors.text, opacity: 0.65, marginBottom: 16 };
const codeStyle: CSSProperties = { fontFamily: "ui-monospace, monospace", fontSize: 12, color: colors.text, opacity: 0.7 };

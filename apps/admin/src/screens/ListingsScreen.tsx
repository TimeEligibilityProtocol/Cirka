import { getCategory, Listing } from "@wearto-you/domain";
import { colors, typography } from "@wearto-you/ui";
import { CSSProperties } from "react";
import { Column, Table } from "../components/Table";
import { StatusBadge } from "../components/StatusBadge";
import { apiClient } from "../config/apiClient";

function formatMoney(amountMinor: number, currency: string): string {
  return `${currency} ${(amountMinor / 100).toLocaleString("en-AE", { minimumFractionDigits: 0 })}`;
}

export function ListingsScreen({ listings }: { listings: Listing[] }) {
  const columns: Column<Listing>[] = [
    {
      key: "photo",
      header: "",
      width: "64px",
      render: (l) => {
        const image = l.images[0];
        return image ? (
          <img src={apiClient.resolveAssetUrl(image.url)} alt={image.alt} style={thumbStyle} />
        ) : (
          <div style={{ ...thumbStyle, backgroundColor: colors.neutralSurface }} />
        );
      },
    },
    { key: "title", header: "Listing", width: "24%", render: (l) => l.title.sellerSelectedValue },
    { key: "category", header: "Category", width: "16%", render: (l) => getCategory(l.categoryId)?.labelEn ?? "—" },
    { key: "condition", header: "Condition", width: "12%", render: (l) => l.condition.sellerSelectedValue },
    { key: "price", header: "Price", width: "10%", render: (l) => formatMoney(l.price.amountMinor, l.price.currency) },
    { key: "status", header: "Status", width: "10%", render: (l) => <StatusBadge label={l.status} /> },
  ];

  return (
    <div>
      <h1 style={headingStyle}>Listings</h1>
      <p style={subStyle}>The live catalog, as served to the marketplace app.</p>
      <Table columns={columns} rows={listings} emptyLabel="No listings yet." />
    </div>
  );
}

const headingStyle: CSSProperties = { fontFamily: typography.fontFamily, fontSize: 24, fontWeight: 700, color: colors.text, marginBottom: 4 };
const subStyle: CSSProperties = { fontFamily: typography.fontFamily, fontSize: 13, color: colors.text, opacity: 0.65, marginBottom: 16 };
const thumbStyle: CSSProperties = { width: 44, height: 55, objectFit: "cover", borderRadius: 6, display: "block" };

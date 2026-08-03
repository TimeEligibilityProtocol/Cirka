import { colors, typography } from "@wearto-you/ui";
import { CSSProperties } from "react";

const POSITIVE = new Set(["paid", "delivered", "resolved", "paid_out", "active", "personal_pickup_confirmed"]);
const ATTENTION = new Set(["dispute_opened", "failed", "failed_delivery", "refund_pending"]);

export function StatusBadge({ label }: { label: string }) {
  const isPositive = POSITIVE.has(label);
  const isAttention = ATTENTION.has(label);

  const style: CSSProperties = {
    display: "inline-block",
    fontFamily: typography.fontFamily,
    fontSize: 12,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 999,
    color: isPositive ? colors.surface : colors.text,
    backgroundColor: isPositive ? colors.primary : isAttention ? colors.highlight : colors.neutralSurface,
    whiteSpace: "nowrap",
  };

  return <span style={style}>{label.replace(/_/g, " ")}</span>;
}

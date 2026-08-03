import { colors, typography } from "@wearto-you/ui";
import { CSSProperties, ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  render: (row: T) => ReactNode;
}

export function Table<T extends { id: string }>({ columns, rows, emptyLabel }: { columns: Column<T>[]; rows: T[]; emptyLabel: string }) {
  if (rows.length === 0) {
    return <p style={emptyStyle}>{emptyLabel}</p>;
  }

  return (
    <div style={wrapStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ ...thStyle, width: col.width }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.key} style={tdStyle}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const wrapStyle: CSSProperties = {
  backgroundColor: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: 12,
  overflow: "hidden",
};

const tableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontFamily: typography.fontFamily,
};

const thStyle: CSSProperties = {
  textAlign: "left",
  fontSize: 12,
  fontWeight: 600,
  color: colors.text,
  opacity: 0.6,
  textTransform: "uppercase",
  letterSpacing: 0.4,
  padding: "12px 16px",
  borderBottom: `1px solid ${colors.border}`,
  backgroundColor: colors.background,
};

const tdStyle: CSSProperties = {
  fontSize: 14,
  color: colors.text,
  padding: "12px 16px",
  borderBottom: `1px solid ${colors.border}`,
  verticalAlign: "middle",
};

const emptyStyle: CSSProperties = {
  fontFamily: typography.fontFamily,
  fontSize: 14,
  color: colors.text,
  opacity: 0.6,
  padding: 24,
  textAlign: "center",
  backgroundColor: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: 12,
};

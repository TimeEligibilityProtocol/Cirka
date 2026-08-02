import { colors, spacing, typography } from "@wearto-you/ui";

export function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.background,
        color: colors.text,
        fontFamily: typography.fontFamily,
        padding: spacing.xl,
      }}
    >
      <h1 style={{ fontWeight: typography.weights.heading }}>wearto.you — admin</h1>
      <p>Step 0: panel skeleton. Moderation, disputes and order screens land in the next steps.</p>
    </div>
  );
}

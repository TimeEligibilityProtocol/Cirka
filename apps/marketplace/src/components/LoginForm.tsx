import { colors, spacing, typography } from "@wearto-you/ui";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../state/auth";
import { PrimaryButton } from "./PrimaryButton";

/**
 * Google is the intended sign-in method per spec (see
 * docs/design-references/WEARTOYOU/wearto-you-FINAL/wearto-you-CLAUDE-v12-IDENTITY-PAYOUT.md,
 * "Podstawowe logowanie: Google i Apple") — that needs a Google OAuth
 * Client ID only the account owner can create. This email+password form
 * is the interim gate so publishing isn't open to anyone in the meantime;
 * swap it for a "Sign in with Google" button here once that Client ID
 * exists, without touching the session/requireAuth plumbing underneath.
 */
export function LoginForm({ onSuccess, heading, sub }: { onSuccess: () => void; heading?: string; sub?: string }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password, displayName);
      }
      onSuccess();
    } catch (err) {
      setError(
        mode === "login"
          ? "Nieprawidłowy e-mail lub hasło."
          : err instanceof Error && err.message.includes("email_taken")
            ? "Konto z tym e-mailem już istnieje."
            : "Hasło musi mieć co najmniej 8 znaków."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.content}>
      <Text style={styles.heading}>{heading ?? (mode === "login" ? "Log in to continue" : "Create your account")}</Text>
      <Text style={styles.sub}>{sub ?? "Selling on wearto.you requires an account — browsing doesn't."}</Text>

      {mode === "register" ? (
        <TextInput
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Your name"
          placeholderTextColor={`${colors.text}88`}
          style={styles.input}
        />
      ) : null}
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor={`${colors.text}88`}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor={`${colors.text}88`}
        secureTextEntry
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <PrimaryButton
        label={submitting ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
        onPress={onSubmit}
        disabled={submitting || !email || !password || (mode === "register" && !displayName)}
        style={styles.submitBtn}
      />
      <Pressable onPress={() => setMode(mode === "login" ? "register" : "login")} style={styles.switchModeBtn}>
        <Text style={styles.switchModeText}>
          {mode === "login" ? "No account yet? Create one" : "Already have an account? Log in"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { width: "100%", maxWidth: 380, alignSelf: "center" },
  heading: { fontSize: 22, fontWeight: typography.weights.heading as "700", color: colors.text, marginBottom: spacing.xs },
  sub: { fontSize: 13, color: colors.text, opacity: 0.65, lineHeight: 19, marginBottom: spacing.lg },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
  },
  error: {
    fontSize: 13,
    color: colors.primaryPressed,
    backgroundColor: colors.highlight,
    borderRadius: 10,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  submitBtn: { marginTop: spacing.xs },
  switchModeBtn: { marginTop: spacing.md, alignItems: "center" },
  switchModeText: { fontSize: 13, color: colors.primary, fontWeight: typography.weights.bodyMedium as "500" },
});

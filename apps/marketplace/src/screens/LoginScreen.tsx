import { colors, spacing } from "@wearto-you/ui";
import { StyleSheet, View } from "react-native";
import { Header } from "../components/Header";
import { LoginForm } from "../components/LoginForm";
import { useStack } from "../nav/stack";

export function LoginScreen() {
  const { reset } = useStack();
  return (
    <View style={styles.container}>
      <Header title="Log in" />
      <View style={styles.content}>
        <LoginForm onSuccess={() => reset("AddListing")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
});

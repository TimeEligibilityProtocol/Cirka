import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export interface ScreenEntry {
  name: string;
  params?: Record<string, string>;
}

interface StackApi {
  current: ScreenEntry;
  push: (name: string, params?: Record<string, string>) => void;
  pop: () => void;
  reset: (name: string, params?: Record<string, string>) => void;
  canGoBack: boolean;
}

const StackContext = createContext<StackApi | null>(null);

export function StackProvider({ initial, children }: { initial: string; children: ReactNode }) {
  const [stack, setStack] = useState<ScreenEntry[]>([{ name: initial }]);

  const value = useMemo<StackApi>(
    () => ({
      current: stack[stack.length - 1],
      push: (name, params) => setStack((prev) => [...prev, { name, params }]),
      pop: () => setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev)),
      reset: (name, params) => setStack([{ name, params }]),
      canGoBack: stack.length > 1,
    }),
    [stack]
  );

  return <StackContext.Provider value={value}>{children}</StackContext.Provider>;
}

export function useStack() {
  const ctx = useContext(StackContext);
  if (!ctx) throw new Error("useStack must be used inside StackProvider");
  return ctx;
}

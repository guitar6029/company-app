"use client";

import { ThemeProvider } from "@/app/components/theme-provider";
import QueryWrapper from "@/app/components/Wrapper/QueryWrapper";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryWrapper>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryWrapper>
  );
}

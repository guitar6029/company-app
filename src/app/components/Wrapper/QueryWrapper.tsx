"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface QueryWrapperProps {
  children: React.ReactNode;
}

export default function QueryWrapper({ children }: QueryWrapperProps) {
  // Create the client only once (per app lifecycle)
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

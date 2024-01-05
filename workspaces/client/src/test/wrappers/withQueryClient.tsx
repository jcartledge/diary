import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createHelper } from "souvlaki";

export const withQueryClient = createHelper(() => ({ children }) => (
  <QueryClientProvider
    client={
      new QueryClient({
        defaultOptions: { queries: { retry: false } },
      })
    }
  >
    {children}
  </QueryClientProvider>
));

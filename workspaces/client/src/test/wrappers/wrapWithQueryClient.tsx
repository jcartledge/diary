import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const wrapWithQueryClient = (): React.FC<React.PropsWithChildren> => ({ children }) => (
  <QueryClientProvider
    client={
      new QueryClient({
        defaultOptions: { queries: { retry: false } },
      })
    }
  >
    {children}
  </QueryClientProvider>
);

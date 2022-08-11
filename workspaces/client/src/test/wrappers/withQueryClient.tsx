import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import { createHelper } from "souvlaki";

export const withQueryClient = createHelper(
  (): React.FC<PropsWithChildren> =>
    ({ children }) =>
      (
        <QueryClientProvider client={new QueryClient()}>
          {children}
        </QueryClientProvider>
      )
);

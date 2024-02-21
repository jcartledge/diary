import { Auth0Context, type Auth0ContextInterface } from "@auth0/auth0-react";
import { type Builder } from "@diary/shared/types/builder.types";
import React from "react";
import { vi } from "vitest";

const buildMockAuth0ContextValue: Builder<Auth0ContextInterface> = (
  overrides = {}
) => ({
  buildAuthorizeUrl: vi.fn(),
  isAuthenticated: false,
  user: {},
  isLoading: false,
  buildLogoutUrl: vi.fn(),
  getAccessTokenSilently:
    vi.fn() as unknown as Auth0ContextInterface["getAccessTokenSilently"],
  getAccessTokenWithPopup: vi.fn(),
  getIdTokenClaims: vi.fn(),
  loginWithRedirect: vi.fn(),
  loginWithPopup: vi.fn(),
  logout: vi.fn(),
  handleRedirectCallback: vi.fn(),
  ...overrides,
});

export const wrapWithAuth0 =
  (value: Partial<Auth0ContextInterface> = {}): React.FC<React.PropsWithChildren> =>
    ({ children }) =>
    (
      <Auth0Context.Provider value={buildMockAuth0ContextValue(value)}>
        {children}
      </Auth0Context.Provider>
    );

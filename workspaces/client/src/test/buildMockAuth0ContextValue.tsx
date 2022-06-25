import { Auth0ContextInterface } from "@auth0/auth0-react";
import { vi } from "vitest";
import { Builder } from "../util/builder.types";

export const buildMockAuth0ContextValue: Builder<Auth0ContextInterface> = (
  overrides = {}
) => ({
  buildAuthorizeUrl: vi.fn(),
  isAuthenticated: true,
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

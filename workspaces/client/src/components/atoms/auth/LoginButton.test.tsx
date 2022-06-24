import { Auth0Context, Auth0ContextInterface } from "@auth0/auth0-react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Builder } from "../../../util/builder.types";
import LoginButton from "./LoginButton";

const buildMockAuth0ContextValue: Builder<Auth0ContextInterface> = (
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

describe("LoginButton", () => {
  it("calls loginWithRedirect", async () => {
    const loginWithRedirect = vi.fn();

    render(
      <Auth0Context.Provider
        value={buildMockAuth0ContextValue({ loginWithRedirect })}
      >
        <LoginButton />
      </Auth0Context.Provider>
    );
    const user = userEvent.setup();
    user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(loginWithRedirect).toHaveBeenCalled();
    });
  });
});

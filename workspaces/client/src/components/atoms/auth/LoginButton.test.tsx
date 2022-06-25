import { Auth0Context } from "@auth0/auth0-react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { buildMockAuth0ContextValue } from "../../../test/buildMockAuth0ContextValue";
import LoginButton from "./LoginButton";

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

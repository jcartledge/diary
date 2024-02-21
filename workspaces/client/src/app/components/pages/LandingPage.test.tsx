import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import userEvent from "@testing-library/user-event";
import { wrapWithAuth0 } from "test/wrappers/wrapWithAuth0";
import { LandingPage } from "./LandingPage";
import { composeWrappers } from "lib/util/composeWrappers";

describe("LandingPage", () => {
  it("Displays a login button", () => {
    render(<LandingPage />, {});

    expect(
      screen.queryByRole("button", { name: /Log in/ })
    ).toBeInTheDocument();
  });

  it("calls loginWithRedirect when the button is clicked", async () => {
    const loginWithRedirect = vi.fn();
    const user = userEvent.setup();
    render(<LandingPage />, {
      wrapper: composeWrappers(
        wrapWithAuth0({
          loginWithRedirect,
        })
      ),
    });

    await user.click(screen.getByRole("button", { name: /Log in/ }));

    expect(loginWithRedirect).toHaveBeenCalled();
  });
});

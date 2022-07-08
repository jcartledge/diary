import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import userEvent from "@testing-library/user-event";
import { wrap } from "souvlaki";
import { withAuth0Wrapper } from "test/wrappers/withAuth0Wrapper";
import { LandingPage } from "./LandingPage";

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
      wrapper: wrap(
        withAuth0Wrapper({
          loginWithRedirect,
        })
      ),
    });

    await user.click(screen.getByRole("button", { name: /Log in/ }));

    expect(loginWithRedirect).toHaveBeenCalled();
  });
});

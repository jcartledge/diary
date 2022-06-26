import { render, screen, waitFor } from "@testing-library/react";
import {
  withToggle,
  withToggles,
} from "lib/toggles/TogglesProvider.testWrapper";
import { wrap } from "souvlaki";
import { withAuth0Wrapper } from "test/wrappers/withAuth0Wrapper";
import { describe, expect, it, vi } from "vitest";
import { Authenticated } from "./Authenticated";

describe("Authenticated - auth toggled on", () => {
  const withAuthToggleEnabled = withToggle("auth");

  it("redirects to login if not authenticated", async () => {
    const loginWithRedirect = vi.fn();

    render(<Authenticated>Hello</Authenticated>, {
      wrapper: wrap(
        withAuthToggleEnabled,
        withAuth0Wrapper({
          loginWithRedirect,
          isAuthenticated: false,
        })
      ),
    });

    await waitFor(() => {
      expect(loginWithRedirect).toHaveBeenCalled();
    });
  });

  it("does not render the children if not authenticated", () => {
    render(<Authenticated>Hello</Authenticated>, {
      wrapper: wrap(
        withAuthToggleEnabled,
        withAuth0Wrapper({ isAuthenticated: false })
      ),
    });

    expect(screen.queryByText("Hello")).toBeNull();
  });

  it("does render the children if authenticated", () => {
    render(<Authenticated>Hello</Authenticated>, {
      wrapper: wrap(
        withAuthToggleEnabled,
        withAuth0Wrapper({ isAuthenticated: true })
      ),
    });

    expect(screen.queryByText("Hello")).not.toBeNull();
  });

  it("does not call loginWithRedirect if authenticated", () => {
    const loginWithRedirect = vi.fn();

    render(<Authenticated>Hello</Authenticated>, {
      wrapper: wrap(
        withAuthToggleEnabled,
        withAuth0Wrapper({
          loginWithRedirect,
          isAuthenticated: true,
        })
      ),
    });

    expect(loginWithRedirect).not.toHaveBeenCalled();
  });
});

describe("Authenticated - auth toggled off", () => {
  const withAuthToggleDisabled = withToggles();

  it("does not redirect to login if not authenticated", () => {
    const loginWithRedirect = vi.fn();

    render(<Authenticated>Hello</Authenticated>, {
      wrapper: wrap(
        withAuthToggleDisabled,
        withAuth0Wrapper({
          loginWithRedirect,
          isAuthenticated: false,
        })
      ),
    });

    expect(loginWithRedirect).not.toHaveBeenCalled();
  });

  it("renders the children if not authenticated", () => {
    render(<Authenticated>Hello</Authenticated>, {
      wrapper: wrap(
        withAuthToggleDisabled,
        withAuth0Wrapper({ isAuthenticated: false })
      ),
    });

    expect(screen.queryByText("Hello")).not.toBeNull();
  });

  it("renders the children if authenticated", () => {
    render(<Authenticated>Hello</Authenticated>, {
      wrapper: wrap(
        withAuthToggleDisabled,
        withAuth0Wrapper({ isAuthenticated: true })
      ),
    });

    expect(screen.queryByText("Hello")).not.toBeNull();
  });

  it("does not call loginWithRedirect the children if authenticated", () => {
    const loginWithRedirect = vi.fn();

    render(<Authenticated>Hello</Authenticated>, {
      wrapper: wrap(
        withAuthToggleDisabled,
        withAuth0Wrapper({
          loginWithRedirect,
          isAuthenticated: true,
        })
      ),
    });

    expect(loginWithRedirect).not.toHaveBeenCalled();
  });
});

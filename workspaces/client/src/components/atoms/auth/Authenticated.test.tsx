import { render, screen, waitFor } from "@testing-library/react";
import { wrap } from "souvlaki";
import { describe, expect, it, vi } from "vitest";
import { withAuth0Wrapper } from "../../../test/wrappers/withAuth0Wrapper";
import { withToggles } from "../../../test/wrappers/withToggles";
import { Authenticated } from "./Authenticated";

describe("Authenticated - auth toggled on", () => {
  it("redirects to login if not authenticated", async () => {
    const loginWithRedirect = vi.fn();

    render(<Authenticated>Hello</Authenticated>, {
      wrapper: wrap(
        withToggles(["auth"]),
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
        withToggles(["auth"]),
        withAuth0Wrapper({ isAuthenticated: false })
      ),
    });

    expect(screen.queryByText("Hello")).toBeNull();
  });

  it("does render the children if authenticated", () => {
    render(<Authenticated>Hello</Authenticated>, {
      wrapper: wrap(
        withToggles(["auth"]),
        withAuth0Wrapper({ isAuthenticated: true })
      ),
    });

    expect(screen.queryByText("Hello")).not.toBeNull();
  });

  it("does not call loginWithRedirect the children if authenticated", () => {
    const loginWithRedirect = vi.fn();

    render(<Authenticated>Hello</Authenticated>, {
      wrapper: wrap(
        withToggles(["auth"]),
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
  it("does not redirect to login if not authenticated", () => {
    const loginWithRedirect = vi.fn();

    render(<Authenticated>Hello</Authenticated>, {
      wrapper: wrap(
        withToggles(),
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
        withToggles(),
        withAuth0Wrapper({ isAuthenticated: false })
      ),
    });

    expect(screen.queryByText("Hello")).not.toBeNull();
  });

  it("renders the children if authenticated", () => {
    render(<Authenticated>Hello</Authenticated>, {
      wrapper: wrap(withToggles(), withAuth0Wrapper({ isAuthenticated: true })),
    });

    expect(screen.queryByText("Hello")).not.toBeNull();
  });

  it("does not call loginWithRedirect the children if authenticated", () => {
    const loginWithRedirect = vi.fn();

    render(<Authenticated>Hello</Authenticated>, {
      wrapper: wrap(
        withToggles(),
        withAuth0Wrapper({
          loginWithRedirect,
          isAuthenticated: true,
        })
      ),
    });

    expect(loginWithRedirect).not.toHaveBeenCalled();
  });
});

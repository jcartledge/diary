import { render, screen } from "@testing-library/react";
import { withRouter } from "lib/router";
import { wrap } from "souvlaki";
import { withAuth0Wrapper } from "test/wrappers/withAuth0Wrapper";
import { describe, expect, it } from "vitest";
import { AuthenticatedRoute } from "./AuthenticatedRoute";

describe("AuthenticatedRoute", () => {
  it("does not render if unauthenticated", () => {
    render(<AuthenticatedRoute path="/">Hello</AuthenticatedRoute>, {
      wrapper: wrap(
        withAuth0Wrapper({ isAuthenticated: false }),
        withRouter("/")
      ),
    });

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("does not render if authenticated but the path doesn't match", () => {
    render(<AuthenticatedRoute path="/one">Hello</AuthenticatedRoute>, {
      wrapper: wrap(
        withAuth0Wrapper({ isAuthenticated: true }),
        withRouter("/two")
      ),
    });

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("renders if authenticated", () => {
    render(<AuthenticatedRoute path="/">Hello</AuthenticatedRoute>, {
      wrapper: wrap(
        withAuth0Wrapper({ isAuthenticated: true }),
        withRouter("/")
      ),
    });

    expect(screen.queryByText("Hello")).toBeInTheDocument();
  });
});

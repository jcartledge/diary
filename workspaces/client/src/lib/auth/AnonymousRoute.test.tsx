import { render, screen } from "@testing-library/react";
import { withRouter } from "lib/router";
import { wrap } from "souvlaki";
import { withAuth0Wrapper } from "test/wrappers/withAuth0Wrapper";
import { describe, expect, it } from "vitest";
import { AnonymousRoute } from "./AnonymousRoute";

describe("AnonymousRoute", () => {
  it("renders if unauthenticated", () => {
    render(<AnonymousRoute path="/">Hello</AnonymousRoute>, {
      wrapper: wrap(withAuth0Wrapper({ isAuthenticated: false }), withRouter()),
    });

    expect(screen.queryByText("Hello")).toBeInTheDocument();
  });

  it("does not render if unauthenticated and the path doesn't match", () => {
    render(<AnonymousRoute path="/one">Hello</AnonymousRoute>, {
      wrapper: wrap(
        withAuth0Wrapper({ isAuthenticated: false }),
        withRouter("/two")
      ),
    });

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("does not render if authenticated", () => {
    render(<AnonymousRoute path="/">Hello</AnonymousRoute>, {
      wrapper: wrap(withAuth0Wrapper({ isAuthenticated: true }), withRouter()),
    });

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });
});

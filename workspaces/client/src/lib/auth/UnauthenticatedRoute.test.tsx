import { render, screen } from "@testing-library/react";
import { withRouter } from "lib/router";
import { wrap } from "souvlaki";
import { withAuth0Wrapper } from "test/wrappers/withAuth0Wrapper";
import { describe, expect, it } from "vitest";
import { UnauthenticatedRoute } from "./UnauthenticatedRoute";

describe("UnauthenticatedRoute", () => {
  it("renders if unauthenticated", () => {
    render(<UnauthenticatedRoute path="/">Hello</UnauthenticatedRoute>, {
      wrapper: wrap(
        withAuth0Wrapper({ isAuthenticated: false }),
        withRouter("/")
      ),
    });

    expect(screen.queryByText("Hello")).toBeInTheDocument();
  });

  it("does not render if unauthenticated and the path doesn't match", () => {
    render(<UnauthenticatedRoute path="/one">Hello</UnauthenticatedRoute>, {
      wrapper: wrap(
        withAuth0Wrapper({ isAuthenticated: false }),
        withRouter("/two")
      ),
    });

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("does not render if authenticated", () => {
    render(<UnauthenticatedRoute path="/">Hello</UnauthenticatedRoute>, {
      wrapper: wrap(
        withAuth0Wrapper({ isAuthenticated: true }),
        withRouter("/")
      ),
    });

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });
});

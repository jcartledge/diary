import { render, screen } from "@testing-library/react";
import { wrapWithRouter } from "lib/router";
import { wrapWithAuth0 } from "test/wrappers/wrapWithAuth0";
import { describe, expect, it } from "vitest";
import { AuthenticatedRoute } from "./AuthenticatedRoute";
import { composeWrappers } from "lib/util/composeWrappers";

describe("AuthenticatedRoute", () => {
  it("does not render if unauthenticated", () => {
    render(<AuthenticatedRoute path="/">Hello</AuthenticatedRoute>, {
      wrapper: composeWrappers(
        wrapWithAuth0({ isAuthenticated: false }),
        wrapWithRouter("/")
      ),
    });

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("does not render if authenticated but the path doesn't match", () => {
    render(<AuthenticatedRoute path="/one">Hello</AuthenticatedRoute>, {
      wrapper: composeWrappers(
        wrapWithAuth0({ isAuthenticated: true }),
        wrapWithRouter("/two")
      ),
    });

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("renders if authenticated", () => {
    render(<AuthenticatedRoute path="/">Hello</AuthenticatedRoute>, {
      wrapper: composeWrappers(
        wrapWithAuth0({ isAuthenticated: true }),
        wrapWithRouter("/")
      ),
    });

    expect(screen.queryByText("Hello")).toBeInTheDocument();
  });
});

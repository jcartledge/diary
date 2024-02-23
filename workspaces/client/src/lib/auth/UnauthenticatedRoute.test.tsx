import { render, screen } from "@testing-library/react";
import { wrapWithRouter } from "lib/router";
import { wrapWithAuth0 } from "test/wrappers/wrapWithAuth0";
import { describe, expect, it } from "vitest";
import { UnauthenticatedRoute } from "./UnauthenticatedRoute";
import { composeWrappers } from "lib/util/composeWrappers";

describe("UnauthenticatedRoute", () => {
  it("renders if unauthenticated", () => {
    render(<UnauthenticatedRoute path="/">Hello</UnauthenticatedRoute>, {
      wrapper: composeWrappers(
        wrapWithAuth0({ isAuthenticated: false }),
        wrapWithRouter("/"),
      ),
    });

    expect(screen.queryByText("Hello")).toBeInTheDocument();
  });

  it("does not render if unauthenticated and the path doesn't match", () => {
    render(<UnauthenticatedRoute path="/one">Hello</UnauthenticatedRoute>, {
      wrapper: composeWrappers(
        wrapWithAuth0({ isAuthenticated: false }),
        wrapWithRouter("/two"),
      ),
    });

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("does not render if authenticated", () => {
    render(<UnauthenticatedRoute path="/">Hello</UnauthenticatedRoute>, {
      wrapper: composeWrappers(
        wrapWithAuth0({ isAuthenticated: true }),
        wrapWithRouter("/"),
      ),
    });

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });
});

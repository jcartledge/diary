import { render, screen } from "@testing-library/react";
import { wrapWithAuth0 } from "test/wrappers/wrapWithAuth0";
import { describe, expect, it } from "vitest";
import { Unauthenticated } from "./Unauthenticated";

describe("Unauthenticated", () => {
  it("does render the children if not authenticated", () => {
    render(<Unauthenticated>Hello</Unauthenticated>, {
      wrapper: wrapWithAuth0({ isAuthenticated: false }),
    });

    expect(screen.queryByText("Hello")).toBeInTheDocument();
  });

  it("does not render the children if authenticated", () => {
    render(<Unauthenticated>Hello</Unauthenticated>, {
      wrapper: wrapWithAuth0({ isAuthenticated: true }),
    });

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });
});

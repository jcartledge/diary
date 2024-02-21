import { render, screen } from "@testing-library/react";
import { wrapWithAuth0 } from "test/wrappers/wrapWithAuth0";
import { describe, expect, it } from "vitest";
import { Authenticated } from "./Authenticated";

describe("Authenticated", () => {
  it("does not render the children if not authenticated", () => {
    render(<Authenticated>Hello</Authenticated>, {
      wrapper: wrapWithAuth0({ isAuthenticated: false }),
    });

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("does render the children if authenticated", () => {
    render(<Authenticated>Hello</Authenticated>, {
      wrapper: wrapWithAuth0({ isAuthenticated: true }),
    });

    expect(screen.queryByText("Hello")).toBeInTheDocument();
  });
});

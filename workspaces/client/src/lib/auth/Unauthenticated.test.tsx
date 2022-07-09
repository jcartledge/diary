import { render, screen } from "@testing-library/react";
import { wrap } from "souvlaki";
import { withAuth0Wrapper } from "test/wrappers/withAuth0Wrapper";
import { describe, expect, it } from "vitest";
import { Unauthenticated } from "./Unauthenticated";

describe("Unauthenticated", () => {
  it("does render the children if not authenticated", () => {
    render(<Unauthenticated>Hello</Unauthenticated>, {
      wrapper: wrap(withAuth0Wrapper({ isAuthenticated: false })),
    });

    expect(screen.queryByText("Hello")).toBeInTheDocument();
  });

  it("does not render the children if authenticated", () => {
    render(<Unauthenticated>Hello</Unauthenticated>, {
      wrapper: wrap(withAuth0Wrapper({ isAuthenticated: true })),
    });

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { wrap } from "souvlaki";
import { withAuth0Wrapper } from "test/wrappers/withAuth0Wrapper";
import { describe, expect, it } from "vitest";
import { Authenticated } from "./Authenticated";

describe("Authenticated", () => {
  it("does not render the children if not authenticated", () => {
    render(<Authenticated>Hello</Authenticated>, {
      wrapper: wrap(withAuth0Wrapper({ isAuthenticated: false })),
    });

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("does render the children if authenticated", () => {
    render(<Authenticated>Hello</Authenticated>, {
      wrapper: wrap(withAuth0Wrapper({ isAuthenticated: true })),
    });

    expect(screen.queryByText("Hello")).toBeInTheDocument();
  });
});

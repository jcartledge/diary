import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Conditional } from "./Conditional";

describe("Conditional", () => {
  it("renders children if the predicate is true", () => {
    render(<Conditional predicate={true}>some children</Conditional>);

    expect(screen.queryByText(/some children/)).toBeInTheDocument();
  });

  it("does not render children if the predicate is false", () => {
    render(<Conditional predicate={false}>some children</Conditional>);

    expect(screen.queryByText(/some children/)).not.toBeInTheDocument();
  });
});

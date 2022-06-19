import { render, screen } from "@testing-library/react";
import { wrap } from "souvlaki";
import { describe, expect, it } from "vitest";
import { withToggles } from "../test/wrappers/withToggles";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("renders the children if the toggle is enabled", () => {
    const toggles = { FEATURE_1: true };
    const TestComponent = () => <Toggle name="FEATURE_1">Hello</Toggle>;
    render(<TestComponent />, { wrapper: wrap(withToggles(toggles)) });

    expect(screen.getByText("Hello")).not.toBeNull();
  });

  it("does not render the children if the toggle is not enabled", () => {
    const toggles = { FEATURE_1: false };
    const TestComponent = () => <Toggle name="FEATURE_1">Hello</Toggle>;
    render(<TestComponent />, { wrapper: wrap(withToggles(toggles)) });

    expect(screen.queryByText("Hello")).toBeNull();
  });
});

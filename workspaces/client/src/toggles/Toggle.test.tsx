import { render, screen } from "@testing-library/react";
import { wrap } from "souvlaki";
import { describe, expect, it } from "vitest";
import { withToggle, withToggles } from "../test/wrappers/withToggles";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("renders the children if the toggle is enabled", () => {
    render(<Toggle name="test_feature">Hello</Toggle>, {
      wrapper: wrap(withToggle("test_feature")),
    });

    expect(screen.queryByText("Hello")).not.toBeNull();
  });

  it("does not render the children if the toggle is not enabled", () => {
    render(<Toggle name="test_feature">Hello</Toggle>, {
      wrapper: wrap(withToggles()),
    });

    expect(screen.queryByText("Hello")).toBeNull();
  });

  it("does not render the children when the toggle is enabled and toggle is off", () => {
    render(
      <Toggle isOff name="test_feature">
        Hello
      </Toggle>,
      { wrapper: wrap(withToggle("test_feature")) }
    );

    expect(screen.queryByText("Hello")).toBeNull();
  });

  it("renders the children when the toggle is not enabled and toggle is off", () => {
    render(
      <Toggle isOff name="test_feature">
        Hello
      </Toggle>,
      { wrapper: wrap(withToggles()) }
    );

    expect(screen.queryByText("Hello")).not.toBeNull();
  });
});

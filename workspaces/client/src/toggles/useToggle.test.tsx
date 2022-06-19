import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TogglesProvider } from "./TogglesProvider";
import { useToggle } from "./useToggle";

describe("useToggle", () => {
  it("returns the requested toggle from the provider", () => {
    const testToggles = ["toggle1"];
    const TestComponent = () => {
      const toggle = useToggle("toggle1");
      expect(toggle).toBe(true);
      return null;
    };

    render(
      <TogglesProvider toggles={testToggles}>
        <TestComponent />
      </TogglesProvider>
    );
  });

  it("returns false if the toggle is not defined", () => {
    const TestComponent = () => {
      const toggle = useToggle("toggle1");
      expect(toggle).toBe(false);
      return null;
    };

    render(
      <TogglesProvider toggles={[]}>
        <TestComponent />
      </TogglesProvider>
    );
  });
});

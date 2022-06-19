import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TogglesProvider, useToggle, useToggles } from "./TogglesProvider";

describe("useToggles", () => {
  it("returns the toggles from the provider", () => {
    const testToggles = { toggle1: true };
    const TestComponent = () => {
      const toggles = useToggles();
      expect(toggles).toEqual(testToggles);
      return null;
    };

    render(
      <TogglesProvider toggles={testToggles}>
        <TestComponent />
      </TogglesProvider>
    );
  });
});

describe("useToggle", () => {
  it("returns the requested toggle from the provider", () => {
    const testToggles = { toggle1: true };
    const TestComponent = () => {
      const toggle1 = useToggle("toggle1");
      expect(toggle1).toBe(true);
      return null;
    };

    render(
      <TogglesProvider toggles={testToggles}>
        <TestComponent />
      </TogglesProvider>
    );
  });
});

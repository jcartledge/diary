import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TogglesProvider } from "./TogglesProvider";
import { useToggles } from "./useToggles";

describe("useToggles", () => {
  it("returns the toggles from the provider", () => {
    const testToggles = ["toggle1"];
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

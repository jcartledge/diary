import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { wrapWithToggles } from "./TogglesProvider.testWrapper";
import { useToggles } from "./useToggles";

describe("useToggles", () => {
  it("returns the toggles from the provider", () => {
    const testToggles = ["toggle1"];

    const { result } = renderHook(useToggles, {
      wrapper: wrapWithToggles(testToggles),
    });

    expect(result.current).toEqual(testToggles);
  });
});

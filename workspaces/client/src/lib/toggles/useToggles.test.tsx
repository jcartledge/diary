import { renderHook } from "@testing-library/react";
import { wrap } from "souvlaki";
import { describe, expect, it } from "vitest";
import { withToggles } from "./TogglesProvider.testWrapper";
import { useToggles } from "./useToggles";

describe("useToggles", () => {
  it("returns the toggles from the provider", () => {
    const testToggles = ["toggle1"];

    const { result } = renderHook(() => useToggles(), {
      wrapper: wrap(withToggles(testToggles)),
    });

    expect(result.current).toEqual(testToggles);
  });
});

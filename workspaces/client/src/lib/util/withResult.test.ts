import { describe, expect, it, vi } from "vitest";
import { withResult } from "./withResult";

describe("withResult", () => {
  it("executes the callback with the result if it's a SuccessResult", () => {
    const result = { result: "something" };
    const callback = vi.fn();
    withResult(result, callback);

    expect(callback).toHaveBeenCalledWith(result.result);
  });

  it("Does not execute the callback if it's an ErrorResult", () => {
    const error = { error: new Error() };
    const callback = vi.fn();
    withResult(error, callback);

    expect(callback).not.toHaveBeenCalled();
  });
});

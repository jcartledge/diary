import { describe, expect, it, vi } from "vitest";
import { withError } from "./withError";

describe("withError", () => {
  it("does not execute the callback if it's a SuccessResult", () => {
    const result = { result: "something" };
    const callback = vi.fn();
    withError(result, callback);

    expect(callback).not.toHaveBeenCalledWith(result.result);
  });

  it("does execute the callback if it's an ErrorResult", () => {
    const error = { error: new Error() };
    const callback = vi.fn();
    withError(error, callback);

    expect(callback).toHaveBeenCalledWith(error.error);
  });
});

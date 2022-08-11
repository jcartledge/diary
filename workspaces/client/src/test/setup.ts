import { LocationMock } from "@jedmao/location";
import matchers, {
  TestingLibraryMatchers,
} from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, expect } from "vitest";
import "whatwg-fetch";

declare global {
  namespace Vi {
    interface JestAssertion<T = any>
      extends jest.Matchers<void, T>,
        TestingLibraryMatchers<T, void> {}
  }
}

expect.extend(matchers);

beforeEach(() => {
  window.location = new LocationMock("http://localhost/");
});

afterEach(() => {
  cleanup();
});

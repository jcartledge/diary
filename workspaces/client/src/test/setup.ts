import { LocationMock } from "@jedmao/location";
import matchers, {
  TestingLibraryMatchers,
} from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, expect } from "vitest";
import "whatwg-fetch";
import { server } from "./mocks/server";

expect.extend(matchers);

declare module "vitest" {
  interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {}
}

beforeEach(() => {
  window.location = new LocationMock("http://localhost/");
});

afterEach(() => {
  cleanup();
});

// mock service worker setup
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

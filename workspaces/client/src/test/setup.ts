import { LocationMock } from "@jedmao/location";
import '@testing-library/jest-dom/vitest'
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";
import "whatwg-fetch";
import { server } from "./mocks/server";

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

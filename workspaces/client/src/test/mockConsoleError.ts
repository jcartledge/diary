import { vi } from "vitest";

let originalConsoleError = console.error;

export const mockConsoleError = () => {
  const mockConsoleError = vi.fn();
  console.error = mockConsoleError;
  return mockConsoleError;
};

export const unmockConsoleError = () => {
  console.error = originalConsoleError;
};

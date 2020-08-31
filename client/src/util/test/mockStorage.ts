import { Builder } from "util/types";

export const buildMockStorage: Builder<Storage> = (overrides = {}) => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
  ...overrides,
});

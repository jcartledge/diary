export const buildMockStorage = (
  overrides: Partial<Storage> = {}
): Storage => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
  ...overrides,
});

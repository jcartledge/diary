
export type Builder<T extends object> = (overrides?: Partial<T>) => T;

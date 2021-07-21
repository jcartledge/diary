export const db_uri = process.env.DB_URI ?? "sqlite::memory:";
export const db_options = process.env.DB_OPTIONS
  ? JSON.parse(process.env.DB_OPTIONS)
  : {};

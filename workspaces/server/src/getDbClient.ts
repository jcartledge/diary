import { Client } from "pg";

const connectionString = process.env.DATABASE_URL;

export const getDbClient = async (): Promise<Client> => {
  const client = new Client({ connectionString });
  client.connect();
  return client;
};

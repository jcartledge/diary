const port = process.env.PORT ?? 4000;
const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:3000";

export { port, corsOrigin };

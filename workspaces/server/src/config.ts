const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE ?? "https://diary-server";
const AUTH0_ISSUER_BASE_URL =
  process.env.AUTH0_ISSUER_BASE_URL ?? "https://dev-dgeyym9v.au.auth0.com/";
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "http://localhost:3000";
const PORT = process.env.PORT ?? 4000;

export { AUTH0_AUDIENCE, AUTH0_ISSUER_BASE_URL, CORS_ORIGIN, PORT };

import createJWKSMock, { type JWKSMock } from "mock-jwks";
import { AUTH0_AUDIENCE, AUTH0_ISSUER_BASE_URL } from "../config";

export const startAuthServer = () => {
  const jwks = createJWKSMock(AUTH0_ISSUER_BASE_URL);
  jwks.start();
  return jwks;
};

interface Token {
  aud: [string, string];
  iss: string;
  exp: number;
  sub: string;
  scope: string;
}

export const getToken = (jwks: JWKSMock, overrides: Partial<Token> = {}) =>
  jwks.token({
    aud: [AUTH0_AUDIENCE, `${AUTH0_ISSUER_BASE_URL}/userinfo`],
    iss: AUTH0_ISSUER_BASE_URL,
    exp: new Date().getTime() / 1000 + 3600,
    sub: "testprovider|12345678",
    scope: "read:diary_entries_for_user write:diary_entries_for_user",
    ...overrides,
  });

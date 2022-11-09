import createJWKSMock, { type JWKSMock } from "mock-jwks";
import { AUTH0_AUDIENCE, AUTH0_ISSUER_BASE_URL } from "../config";

export const startAuthServer = () => {
  const jwks = createJWKSMock(AUTH0_ISSUER_BASE_URL);
  jwks.start();
  return jwks;
};

export const getToken = (
  jwks: JWKSMock,
  audience = AUTH0_AUDIENCE,
  issuer = AUTH0_ISSUER_BASE_URL
) =>
  jwks.token({
    aud: [audience, `${issuer}/userinfo`],
    iss: issuer,
    exp: new Date().getTime() / 1000 + 3600,
    sub: "testprovider|12345678",
  });

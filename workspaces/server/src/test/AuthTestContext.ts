import { type JWKSMock } from "mock-jwks";

export interface AuthTestContext {
  jwt: string;
  jwksMockServer: JWKSMock;
}

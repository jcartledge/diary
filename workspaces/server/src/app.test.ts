import { type JWKSMock } from "mock-jwks";
import { getToken, startAuthServer } from "src/test/authHelper";
import { AuthTestContext } from "src/test/AuthTestContext";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { getAppWithRoutes } from "./app";

let _jwksMockServer: JWKSMock;
let _jwt: string;

beforeAll(() => {
  _jwksMockServer = startAuthServer();
  _jwt = `Bearer ${getToken(_jwksMockServer)}`;
});

beforeEach<AuthTestContext>((context) => {
  context.jwksMockServer = _jwksMockServer;
  context.jwt = _jwt;
});

afterAll(() => {
  _jwksMockServer.stop();
});

describe("app", () => {
  it("has a working healthcheck endpoint", async () => {
    const response = await request(getAppWithRoutes()).get("/healthcheck");

    expect(response.status).toEqual(200);
  });
});

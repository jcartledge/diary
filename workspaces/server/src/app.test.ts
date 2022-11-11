import request from "supertest";
import { describe, expect, it } from "vitest";
import { getAppWithRoutes } from "./app";

describe("app", () => {
  it("has a working healthcheck endpoint", async () => {
    const response = await request(getAppWithRoutes()).get("/healthcheck");

    expect(response.status).toEqual(200);
  });
});

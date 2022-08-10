import { error, result } from "@diary/shared/ResultOrError";
import express from "express";
import { buildDiaryEntry } from "src/datasources/diaryEntries";
import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import {
  buildMockDiaryEntryResolver,
  DiaryEntryResolverError,
} from "../resolvers/DiaryEntryResolver";
import { applyDiaryEntryRoutes } from "./diaryEntry";

describe("get diaryEntry route", () => {
  it("sends a json response", async () => {
    const app = express();
    applyDiaryEntryRoutes(app, buildMockDiaryEntryResolver());

    const response = await request(app).get("/diaryentry/foo");

    expect(response.headers["content-type"]).toContain("application/json");
  });

  it("sends the response from the resolver if one is found", async () => {
    const resolver = buildMockDiaryEntryResolver({
      getDiaryEntry: vi.fn((date) => result(buildDiaryEntry({ date }))),
    });

    const app = express();
    applyDiaryEntryRoutes(app, resolver);

    const response = await request(app).get("/diaryentry/foo");

    expect(response.body).toEqual({
      diaryEntry: expect.objectContaining({ date: "foo" }),
    });
  });

  it("sends 200 status if resolver is successful", async () => {
    const app = express();
    applyDiaryEntryRoutes(app, buildMockDiaryEntryResolver());

    const response = await request(app).get("/diaryentry/foo");

    expect(response.status).toEqual(200);
  });

  it("sends a 404 error if the resolver is unsuccessful", async () => {
    const resolver = buildMockDiaryEntryResolver({
      getDiaryEntry: vi.fn(() => error(new DiaryEntryResolverError())),
    });

    const app = express();
    applyDiaryEntryRoutes(app, resolver);

    const response = await request(app).get("/diaryentry/foo");

    expect(response.status).toEqual(404);
  });

  it("sends the error object as the response body", async () => {
    const resolver = buildMockDiaryEntryResolver({
      getDiaryEntry: vi.fn(() =>
        error(new DiaryEntryResolverError("error message"))
      ),
    });

    const app = express();
    applyDiaryEntryRoutes(app, resolver);

    const response = await request(app).get("/diaryentry/foo");

    expect(response.body.message).toEqual("error message");
  });
});

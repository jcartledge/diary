import { Builder } from "@diary/shared/types/builder.types";
import express from "express";
import { buildDiaryEntry } from "src/buildDiaryEntry";
import { DiaryEntriesRepositoryMethods } from "src/repositories/diaryEntriesRepository";
import { DiaryEntriesResolver } from "src/resolvers/diaryEntriesResolver";
import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { applyDiaryEntryRoutes } from "./diaryEntryRoutes";

const buildMockDiaryEntryRepository:Builder<DiaryEntriesRepositoryMethods> = (overrides={}) => ({
  getByDate: vi.fn(),
  save: vi.fn(),
  ...overrides,
})

describe("get diaryEntry route", () => {
  it("sends a json response", async () => {
    const app = express();
    const resolver = new DiaryEntriesResolver(buildMockDiaryEntryRepository())
    applyDiaryEntryRoutes(app, resolver);

    const response = await request(app).get("/diaryentry/foo");

    expect(response.headers["content-type"]).toContain("application/json");
  });

  it("sends the response from the resolver if one is found", async () => {
    const resolver = new DiaryEntriesResolver(buildMockDiaryEntryRepository({
      getByDate: vi.fn((date) => Promise.resolve(buildDiaryEntry({ date }))),
    }));

    const app = express();
    applyDiaryEntryRoutes(app, resolver);

    const response = await request(app).get("/diaryentry/foo");

    expect(response.body).toEqual({
      diaryEntry: expect.objectContaining({ date: "foo" }),
    });
  });

  it("sends 200 status if resolver is successful", async () => {
    const app = express();
    applyDiaryEntryRoutes(app, new DiaryEntriesResolver(buildMockDiaryEntryRepository()));

    const response = await request(app).get("/diaryentry/foo");

    expect(response.status).toEqual(200);
  });

  it("sends a 404 error if the resolver is unsuccessful", async () => {
    const resolver = new DiaryEntriesResolver(buildMockDiaryEntryRepository({
      getByDate: vi.fn(() => { throw new Error() }),
    }));

    const app = express();
    applyDiaryEntryRoutes(app, resolver);

    const response = await request(app).get("/diaryentry/foo");

    expect(response.status).toEqual(404);
  });

  it("sends the error object as the response body", async () => {
    const resolver = new DiaryEntriesResolver(buildMockDiaryEntryRepository({
      getByDate: vi.fn(() => { throw new Error("error message") }),
    }));

    const app = express();
    applyDiaryEntryRoutes(app, resolver);

    const response = await request(app).get("/diaryentry/foo");

    expect(response.body.message).toEqual("error message");
  });
});

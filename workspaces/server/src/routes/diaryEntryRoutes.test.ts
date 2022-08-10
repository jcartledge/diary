import { getApp } from "src/app";
import { buildDiaryEntry } from "src/buildDiaryEntry";
import { buildMockDiaryEntriesRepository } from "src/repositories/buildMockDiaryEntriesRepository";
import { DiaryEntriesResolver } from "src/resolvers/diaryEntriesResolver";
import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { applyDiaryEntryRoutes } from "./diaryEntryRoutes";

describe("get diaryEntry route", () => {
  it("sends a json response", async () => {
    const app = getApp();
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntriesRepository()
    );
    applyDiaryEntryRoutes(app, resolver);

    const response = await request(app).get("/diaryentry/foo");

    expect(response.headers["content-type"]).toContain("application/json");
  });

  it("sends the response from the resolver if one is found", async () => {
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntriesRepository({
        getByDate: vi.fn((date) => Promise.resolve(buildDiaryEntry({ date }))),
      })
    );

    const app = getApp();
    applyDiaryEntryRoutes(app, resolver);

    const response = await request(app).get("/diaryentry/foo");

    expect(response.body).toEqual({
      diaryEntry: expect.objectContaining({ date: "foo" }),
    });
  });

  it("sends 200 status if resolver is successful", async () => {
    const app = getApp();
    applyDiaryEntryRoutes(
      app,
      new DiaryEntriesResolver(buildMockDiaryEntriesRepository())
    );

    const response = await request(app).get("/diaryentry/foo");

    expect(response.status).toEqual(200);
  });

  it("sends a 404 error if the resolver is unsuccessful", async () => {
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntriesRepository({
        getByDate: vi.fn(() => {
          throw new Error();
        }),
      })
    );

    const app = getApp();
    applyDiaryEntryRoutes(app, resolver);

    const response = await request(app).get("/diaryentry/foo");

    expect(response.status).toEqual(404);
  });

  it("sends the error object as the response body", async () => {
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntriesRepository({
        getByDate: vi.fn(() => {
          throw new Error("error message");
        }),
      })
    );

    const app = getApp();
    applyDiaryEntryRoutes(app, resolver);

    const response = await request(app).get("/diaryentry/foo");

    expect(response.body.message).toEqual("error message");
  });
});

describe("post diary entry route", () => {
  it("sends a json response", async () => {
    const app = getApp();
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntriesRepository()
    );
    applyDiaryEntryRoutes(app, resolver);

    const response = await request(app)
      .post("/diaryentry/foo")
      .send({ diaryEntry: buildDiaryEntry() });

    expect(response.headers["content-type"]).toContain("application/json");
  });

  it("sends the response from the resolver if one is found", async () => {
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntriesRepository({
        save: vi.fn((diaryEntry) => Promise.resolve(diaryEntry)),
      })
    );
    const app = getApp();
    applyDiaryEntryRoutes(app, resolver);
    const diaryEntry = buildDiaryEntry();

    const response = await request(app)
      .post("/diaryentry/foo")
      .send({ diaryEntry });

    expect(response.body).toEqual({
      diaryEntry,
    });
  });

  it("sends 200 status if resolver is successful", async () => {
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntriesRepository({
        save: vi.fn((diaryEntry) => Promise.resolve(diaryEntry)),
      })
    );
    const app = getApp();
    applyDiaryEntryRoutes(app, resolver);
    const diaryEntry = buildDiaryEntry();

    const response = await request(app)
      .post("/diaryentry/foo")
      .send({ diaryEntry });

    expect(response.status).toEqual(200);
  });

  it("sends a 404 error if the resolver is unsuccessful", async () => {
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntriesRepository({
        save: vi.fn(() => {
          throw new Error();
        }),
      })
    );
    const app = getApp();
    applyDiaryEntryRoutes(app, resolver);
    const diaryEntry = buildDiaryEntry();

    const response = await request(app)
      .post("/diaryentry/foo")
      .send({ diaryEntry });

    expect(response.status).toEqual(404);
  });

  it("sends the error object as the response body", async () => {
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntriesRepository({
        save: vi.fn(() => {
          throw new Error("error message");
        }),
      })
    );
    const app = getApp();
    applyDiaryEntryRoutes(app, resolver);
    const diaryEntry = buildDiaryEntry();

    const response = await request(app)
      .post("/diaryentry/foo")
      .send({ diaryEntry });

    expect(response.body.message).toEqual("error message");
  });
});

import { error, result } from "@diary/shared/ResultOrError";
import { buildDiaryEntry, DiaryEntry } from "@diary/shared/types/diaryEntry";
import { getApp } from "src/app";
import { buildMockDiaryEntriesRepository } from "src/test/buildMockDiaryEntriesRepository";
import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { diaryEntryRoutes } from "./diaryEntryRoutes";

describe("get diaryEntry route", () => {
  it("sends a json response", async () => {
    const app = getApp().use(
      diaryEntryRoutes(buildMockDiaryEntriesRepository())
    );

    const response = await request(app).get("/diaryentry/foo");

    expect(response.headers["content-type"]).toContain("application/json");
  });

  it("sends the response from the resolver if one is found", async () => {
    const app = getApp().use(
      diaryEntryRoutes(
        buildMockDiaryEntriesRepository({
          getByDate: vi.fn((date) =>
            Promise.resolve(result(buildDiaryEntry({ date })))
          ),
        })
      )
    );

    const response = await request(app).get("/diaryentry/foo");

    expect(response.body).toEqual({
      diaryEntry: expect.objectContaining({ date: "foo" }),
    });
  });

  it("sends 200 status if resolver is successful", async () => {
    const app = getApp().use(
      diaryEntryRoutes(buildMockDiaryEntriesRepository())
    );

    const response = await request(app).get("/diaryentry/foo");

    expect(response.status).toEqual(200);
  });

  it("sends a 404 error if the resolver is unsuccessful", async () => {
    const app = getApp().use(
      diaryEntryRoutes(
        buildMockDiaryEntriesRepository({
          getByDate: vi.fn().mockResolvedValue(error(new Error())),
        })
      )
    );

    const response = await request(app).get("/diaryentry/foo");

    expect(response.status).toEqual(404);
  });
});

describe("post diary entry route", () => {
  it("sends a json response", async () => {
    const app = getApp().use(
      diaryEntryRoutes(buildMockDiaryEntriesRepository())
    );

    const response = await request(app)
      .post("/diaryentry/foo")
      .send({ diaryEntry: buildDiaryEntry() });

    expect(response.headers["content-type"]).toContain("application/json");
  });

  it("sends the response from the resolver if one is found", async () => {
    const app = getApp().use(
      diaryEntryRoutes(
        buildMockDiaryEntriesRepository({
          save: vi.fn((diaryEntry) => Promise.resolve(result(diaryEntry))),
        })
      )
    );
    const diaryEntry = buildDiaryEntry();

    const response = await request(app)
      .post("/diaryentry/foo")
      .send({ diaryEntry });

    expect(response.body).toEqual({
      diaryEntry,
    });
  });

  it("sends 200 status if resolver is successful", async () => {
    const app = getApp().use(
      diaryEntryRoutes(
        buildMockDiaryEntriesRepository({
          save: vi.fn((diaryEntry) => Promise.resolve(result(diaryEntry))),
        })
      )
    );
    const diaryEntry = buildDiaryEntry();

    const response = await request(app)
      .post("/diaryentry/foo")
      .send({ diaryEntry });

    expect(response.status).toEqual(200);
  });

  it("sends a 404 error if the resolver is unsuccessful", async () => {
    const app = getApp().use(
      diaryEntryRoutes(
        buildMockDiaryEntriesRepository({
          save: vi.fn().mockResolvedValue(error(new Error())),
        })
      )
    );
    const diaryEntry = buildDiaryEntry();

    const response = await request(app)
      .post("/diaryentry/foo")
      .send({ diaryEntry });

    expect(response.status).toEqual(404);
  });

  it("sends a 400 error if the payload is invalid", async () => {
    const app = getApp().use(
      diaryEntryRoutes(buildMockDiaryEntriesRepository())
    );
    const diaryEntry = {} as DiaryEntry;

    const response = await request(app)
      .post("/diaryentry/foo")
      .send({ diaryEntry });

    expect(response.status).toEqual(400);
  });
});

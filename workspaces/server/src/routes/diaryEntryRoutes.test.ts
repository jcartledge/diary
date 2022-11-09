import { error, result } from "@diary/shared/ResultOrError";
import { buildDiaryEntry, DiaryEntry } from "@diary/shared/types/diaryEntry";
import { type JWKSMock } from "mock-jwks";
import { getAppWithMiddleware } from "src/app";
import { getToken, startAuthServer } from "src/test/authHelper";
import { AuthTestContext } from "src/test/AuthTestContext";
import { buildMockDiaryEntriesModel } from "src/test/buildMockDiaryEntriesModel";
import request from "supertest";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { diaryEntryRoutes } from "./diaryEntryRoutes";

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

describe("get diaryEntry route", () => {
  it<AuthTestContext>("sends a json response", async ({ jwt }) => {
    const app = getAppWithMiddleware().use(
      diaryEntryRoutes(buildMockDiaryEntriesModel())
    );

    const response = await request(app)
      .get("/diaryentry/2020-11-11")
      .set("Authorization", jwt);

    expect(response.headers["content-type"]).toContain("application/json");
  });

  it<AuthTestContext>("sends the response from the resolver if one is found", async ({
    jwt,
  }) => {
    const app = getAppWithMiddleware().use(
      diaryEntryRoutes(
        buildMockDiaryEntriesModel({
          getByDate: vi.fn((date) =>
            Promise.resolve(result(buildDiaryEntry({ date })))
          ),
        })
      )
    );

    const response = await request(app)
      .get("/diaryentry/foo")
      .set("Authorization", jwt);

    expect(response.body).toEqual({
      diaryEntry: expect.objectContaining({ date: "foo" }),
    });
  });

  it<AuthTestContext>("sends 200 status if resolver is successful", async ({
    jwt,
  }) => {
    const app = getAppWithMiddleware().use(
      diaryEntryRoutes(buildMockDiaryEntriesModel())
    );

    const response = await request(app)
      .get("/diaryentry/foo")
      .set("Authorization", jwt);

    expect(response.status).toEqual(200);
  });

  it<AuthTestContext>("sends a 404 error if the resolver is unsuccessful", async ({
    jwt,
  }) => {
    const app = getAppWithMiddleware().use(
      diaryEntryRoutes(
        buildMockDiaryEntriesModel({
          getByDate: vi.fn().mockResolvedValue(error(new Error())),
        })
      )
    );

    const response = await request(app)
      .get("/diaryentry/foo")
      .set("Authorization", jwt);

    expect(response.status).toEqual(404);
  });

  it<AuthTestContext>("sends a 401 error if the token is invalid", async ({
    jwksMockServer,
  }) => {
    const app = getAppWithMiddleware().use(
      diaryEntryRoutes(buildMockDiaryEntriesModel())
    );

    const response = await request(app)
      .get("/diaryentry/2020-11-11")
      .set(
        "Authorization",
        `Bearer ${getToken(jwksMockServer, "invalidIssuer")}`
      );

    expect(response.status).toEqual(401);
  });
});

describe("post diary entry route", () => {
  it<AuthTestContext>("sends a json response", async ({ jwt }) => {
    const app = getAppWithMiddleware().use(
      diaryEntryRoutes(buildMockDiaryEntriesModel())
    );
    const date = "2020-11-11";

    const response = await request(app)
      .post(`/diaryentry/${date}`)
      .set("Authorization", jwt)
      .send({ diaryEntry: buildDiaryEntry({ date }) });

    expect(response.headers["content-type"]).toContain("application/json");
  });

  it<AuthTestContext>("sends the response from the resolver if one is found", async ({
    jwt,
  }) => {
    const app = getAppWithMiddleware().use(
      diaryEntryRoutes(
        buildMockDiaryEntriesModel({
          save: vi.fn((diaryEntry) => Promise.resolve(result(diaryEntry))),
        })
      )
    );
    const date = "2020-11-11";
    const diaryEntry = buildDiaryEntry({ date });

    const response = await request(app)
      .post(`/diaryentry/${date}`)
      .set("Authorization", jwt)
      .send({ diaryEntry });

    expect(response.body).toEqual({
      diaryEntry,
    });
  });

  it<AuthTestContext>("sends 200 status if resolver is successful", async ({
    jwt,
  }) => {
    const app = getAppWithMiddleware().use(
      diaryEntryRoutes(
        buildMockDiaryEntriesModel({
          save: vi.fn((diaryEntry) => Promise.resolve(result(diaryEntry))),
        })
      )
    );
    const date = "2020-11-11";
    const diaryEntry = buildDiaryEntry({ date });

    const response = await request(app)
      .post(`/diaryentry/${date}`)
      .set("Authorization", jwt)
      .send({ diaryEntry });

    expect(response.status).toEqual(200);
  });

  it<AuthTestContext>("sends a 404 error if the resolver is unsuccessful", async ({
    jwt,
  }) => {
    const app = getAppWithMiddleware().use(
      diaryEntryRoutes(
        buildMockDiaryEntriesModel({
          save: vi.fn().mockResolvedValue(error(new Error())),
        })
      )
    );
    const date = "2020-11-11";
    const diaryEntry = buildDiaryEntry({ date });

    const response = await request(app)
      .post(`/diaryentry/${date}`)
      .set("Authorization", jwt)
      .send({ diaryEntry });

    expect(response.status).toEqual(404);
  });

  it<AuthTestContext>("sends a 400 error if the payload is invalid", async ({
    jwt,
  }) => {
    const app = getAppWithMiddleware().use(
      diaryEntryRoutes(buildMockDiaryEntriesModel())
    );
    const diaryEntry = {} as DiaryEntry;

    const response = await request(app)
      .post("/diaryentry/foo")
      .set("Authorization", jwt)
      .send({ diaryEntry });

    expect(response.status).toEqual(400);
  });

  it<AuthTestContext>("sends a 401 error if the token is invalid", async ({
    jwksMockServer,
  }) => {
    const app = getAppWithMiddleware().use(
      diaryEntryRoutes(buildMockDiaryEntriesModel())
    );
    const date = "2020-11-11";

    const response = await request(app)
      .post(`/diaryentry/${date}`)
      .set(
        "Authorization",
        `Bearer ${getToken(jwksMockServer, "invalidIssuer")}`
      )
      .send({ diaryEntry: buildDiaryEntry({ date }) });

    expect(response.status).toEqual(401);
  });
});

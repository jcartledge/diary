import { render, screen, waitFor } from "@testing-library/react";
import { createMockClient } from "mock-apollo-client";
import React, { useContext } from "react";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { describe, expect, it, vi } from "vitest";
import {
  DIARY_ENTRY_QUERY,
  UPDATE_DIARY_ENTRY_MUTATION,
} from "../graphql/queries";
import { useMount } from "../test/useMount";
import { withDiaryEntry, withRoute } from "../test/wrappers";
import { buildDiaryEntry } from "../util/buildDiaryEntry";
import { DiaryEntryContext } from "./DiaryEntryContext";

const buildMockClient = () => {
  const mockClient = createMockClient();
  const payload = {
    data: { diaryEntry: buildDiaryEntry() },
  };
  mockClient.setRequestHandler(
    DIARY_ENTRY_QUERY,
    vi.fn().mockResolvedValue(payload)
  );
  mockClient.setRequestHandler(
    UPDATE_DIARY_ENTRY_MUTATION,
    vi.fn().mockResolvedValue({
      data: {
        updateDiaryEntry: payload.data,
      },
    })
  );
  return mockClient;
};

type Wrappers = { wrapper: React.ComponentType };

const wrappers = (): Wrappers => ({
  wrapper: wrap(
    withApollo(buildMockClient()),
    withRoute(),
    withDiaryEntry({ saveTimeoutInterval: 1 })
  ),
});

describe("DiaryEntryContextProvider", () => {
  it("sets isDirty to false when an entry is loaded and no updates have taken place", async () => {
    const TestChild: React.FC = () => {
      const { isDirty } = useContext(DiaryEntryContext);
      return <>isDirty: {isDirty ? "true" : "false"}</>;
    };

    render(<TestChild />, wrappers());

    expect(screen.queryByText("isDirty: false")).not.toBeNull();
  });

  it("sets isDirty to true when an update changes a field value", async () => {
    const TestChild: React.FC = () => {
      const { isDirty, updateDiaryEntry } = useContext(DiaryEntryContext);
      useMount(() => updateDiaryEntry("whatHappened")("asd"));
      return <>isDirty: {isDirty ? "true" : "false"}</>;
    };

    render(<TestChild />, wrappers());

    await waitFor(() =>
      expect(screen.queryByText("isDirty: true")).not.toBeNull()
    );
  });

  it("does not set isDirty to true when an update does not change the entry", async () => {
    const TestChild: React.FC = () => {
      const { isDirty, updateDiaryEntry } = useContext(DiaryEntryContext);
      useMount(() => updateDiaryEntry("whatHappened")(""));
      return <>isDirty: {isDirty ? "true" : "false"}</>;
    };

    render(<TestChild />, wrappers());

    expect(screen.queryByText("isDirty: true")).toBeNull();
  });

  it("does not set isDirty to false when an update does not change the entry", async () => {
    const TestChild: React.FC = () => {
      const { isDirty, updateDiaryEntry } = useContext(DiaryEntryContext);
      useMount(() => {
        updateDiaryEntry("whatHappened")("foo");
        updateDiaryEntry("whatHappened")("foo");
      });
      return <>isDirty: {isDirty ? "true" : "false"}</>;
    };

    render(<TestChild />, wrappers());

    await waitFor(() =>
      expect(screen.queryByText("isDirty: false")).toBeNull()
    );
  });

  it("sets isDirty to false when the entry has been saved", async () => {
    const TestChild: React.FC = () => {
      const { isDirty, updateDiaryEntry } = useContext(DiaryEntryContext);
      useMount(() => updateDiaryEntry("whatHappened")("foo"));
      return <>isDirty: {isDirty ? "true" : "false"}</>;
    };

    render(<TestChild />, wrappers());

    expect(screen.queryByText("isDirty: false")).not.toBeNull();
  });
});

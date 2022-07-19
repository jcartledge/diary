import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { buildMockApolloClient } from "test/buildMockApolloClient";
import { useMount } from "test/useMount";
import { describe, expect, it } from "vitest";
import { DiaryEntryContext, useDiaryEntry } from "./DiaryEntryContext";
import { withDiaryEntry } from "./DiaryEntryContext.testWrapper";
import { mockConsoleError, unmockConsoleError } from "../../../test/mockConsoleError";

type Wrappers = { wrapper: React.ComponentType };

const wrappers = (): Wrappers => ({
  wrapper: wrap(
    withApollo(buildMockApolloClient()),
    withDiaryEntry({ saveTimeoutInterval: 1 })
  ),
});

describe("DiaryEntryContextProvider", () => {
  it("sets isDirty to false when an entry is loaded and no updates have taken place", async () => {
    const TestChild: React.FC = () => {
      const { isDirty } = useDiaryEntry();
      expect(isDirty).toBe(false);
      return null;
    };

    render(<TestChild />, wrappers());
  });

  it("sets isDirty to true when an update changes a field value", async () => {
    const TestChild: React.FC = () => {
      const { isDirty, updateDiaryEntry } = useDiaryEntry();
      useMount(() => updateDiaryEntry("whatHappened")("asd"));
      return <>isDirty: {isDirty && "true"}</>;
    };

    render(<TestChild />, wrappers());

    await waitFor(() => {
      return expect(screen.queryByText("isDirty: true")).toBeInTheDocument();
    });
  });

  it("does not set isDirty to true when an update does not change the entry", async () => {
    const TestChild: React.FC = () => {
      const { isDirty, updateDiaryEntry } = useDiaryEntry();
      useMount(() => updateDiaryEntry("whatHappened")(""));
      return <>isDirty: {isDirty && "true"}</>;
    };

    render(<TestChild />, wrappers());

    expect(screen.queryByText("isDirty: true")).not.toBeInTheDocument();
  });

  it("does not set isDirty to false when an update does not change the entry", async () => {
    const TestChild: React.FC = () => {
      const { isDirty, updateDiaryEntry } = useDiaryEntry();
      useMount(() => {
        updateDiaryEntry("whatHappened")("foo");
        updateDiaryEntry("whatHappened")("foo");
      });
      return <>isDirty: {isDirty && "true"}</>;
    };

    render(<TestChild />, wrappers());

    await waitFor(() =>
      expect(screen.queryByText("isDirty: true")).toBeInTheDocument()
    );
  });

  it("sets isDirty to false when the entry has been saved", async () => {
    const TestChild: React.FC = () => {
      const { isDirty, updateDiaryEntry } = useDiaryEntry();
      useMount(() => updateDiaryEntry("whatHappened")("foo"));
      return <>isDirty: {isDirty && "true"}</>;
    };

    render(<TestChild />, wrappers());

    expect(screen.queryByText("isDirty: true")).not.toBeInTheDocument();
  });

  it("throws an error if there is no diary entry context", () => {
    const TestChild: React.FC = () => {
      useDiaryEntry();
      return null;
    };

    mockConsoleError();
    expect(() =>
      render(
        <DiaryEntryContext.Provider value={undefined}>
          ,
          <TestChild />
        </DiaryEntryContext.Provider>
      )
    ).toThrowError();
    unmockConsoleError();
  });
});

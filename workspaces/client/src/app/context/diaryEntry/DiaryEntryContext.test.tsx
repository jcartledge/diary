import { render, screen, waitFor } from "@testing-library/react";
import React, { useContext } from "react";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { buildMockApolloClient } from "test/buildMockApolloClient";
import { useMount } from "test/useMount";
import { withRoute } from "test/wrappers/withRoute";
import { describe, expect, it } from "vitest";
import { DiaryEntryContext } from "./DiaryEntryContext";
import { withDiaryEntry } from "./DiaryEntryContext.testWrapper";

type Wrappers = { wrapper: React.ComponentType };

const wrappers = (): Wrappers => ({
  wrapper: wrap(
    withApollo(buildMockApolloClient()),
    withRoute(),
    withDiaryEntry({ saveTimeoutInterval: 1 })
  ),
});

describe("DiaryEntryContextProvider", () => {
  it("sets isDirty to false when an entry is loaded and no updates have taken place", async () => {
    const TestChild: React.FC = () => {
      const { isDirty } = useContext(DiaryEntryContext);
      expect(isDirty).toBe(false);
      return null;
    };

    render(<TestChild />, wrappers());
  });

  it("sets isDirty to true when an update changes a field value", async () => {
    const TestChild: React.FC = () => {
      const { isDirty, updateDiaryEntry } = useContext(DiaryEntryContext);
      useMount(() => updateDiaryEntry("whatHappened")("asd"));
      return <>isDirty: {isDirty ? "true" : "false"}</>;
    };

    render(<TestChild />, wrappers());

    await waitFor(() => {
      return expect(screen.queryByText("isDirty: true")).toBeInTheDocument();
    });
  });

  it("does not set isDirty to true when an update does not change the entry", async () => {
    const TestChild: React.FC = () => {
      const { isDirty, updateDiaryEntry } = useContext(DiaryEntryContext);
      useMount(() => updateDiaryEntry("whatHappened")(""));
      return <>isDirty: {isDirty ? "true" : "false"}</>;
    };

    render(<TestChild />, wrappers());

    expect(screen.queryByText("isDirty: true")).not.toBeInTheDocument();
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
      expect(screen.queryByText("isDirty: false")).not.toBeInTheDocument()
    );
  });

  it("sets isDirty to false when the entry has been saved", async () => {
    const TestChild: React.FC = () => {
      const { isDirty, updateDiaryEntry } = useContext(DiaryEntryContext);
      useMount(() => updateDiaryEntry("whatHappened")("foo"));
      return <>isDirty: {isDirty ? "true" : "false"}</>;
    };

    render(<TestChild />, wrappers());

    expect(screen.queryByText("isDirty: false")).toBeInTheDocument();
  });
});

import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";
import React, { useContext, useEffect } from "react";
import { wrap } from "souvlaki";
import {
  DIARY_ENTRY_QUERY,
  UPDATE_DIARY_ENTRY_MUTATION,
} from "../graphql/queries";
import { withDate } from "../testWrappers/withDate";
import { withDiaryEntry } from "../testWrappers/withDiaryEntry";
import { withRoute } from "../testWrappers/withRoute";
import { buildDiaryEntry } from "../util/buildDiaryEntry";
import { DiaryDate } from "../util/date";
import { DiaryEntryContext } from "./DiaryEntryContext";

const getMocks = () => {
  const today = new DiaryDate();
  const yesterday = today.getPrevious();
  const diaryEntry = buildDiaryEntry();
  const diaryEntryQueryHandler = jest
    .fn()
    .mockResolvedValue({ data: { diaryEntry } });
  const updateDiaryEntryMutationHandler = jest
    .fn()
    .mockResolvedValueOnce({ data: { updateDiaryEntry: { diaryEntry } } });
  return [
    {
      request: {
        query: DIARY_ENTRY_QUERY,
        variables: { date: today.getKey() },
      },
      result: diaryEntryQueryHandler,
    },
    {
      request: {
        query: DIARY_ENTRY_QUERY,
        variables: { date: yesterday.getKey() },
      },
      result: diaryEntryQueryHandler,
    },
    {
      request: {
        query: UPDATE_DIARY_ENTRY_MUTATION,
        variables: { date: today.getKey() },
      },
      result: updateDiaryEntryMutationHandler,
    },
  ];
};

type Wrappers = { wrapper: React.ComponentType };

const wrappers = (): Wrappers => ({
  wrapper: wrap(
    withRoute(),
    withDiaryEntry({ saveTimeoutInterval: 1 }),
    withDate()
  ),
});

describe("DiaryEntryContextProvider", () => {
  it.only("sets isDirty to false when an entry is loaded and no updates have taken place", async () => {
    const TestChild: React.FC = () => {
      const { isDirty } = useContext(DiaryEntryContext);
      return <>isDirty: {isDirty ? "true" : "false"}</>;
    };

    const { getByText } = render(
      <MockedProvider mocks={getMocks()} addTypename={false}>
        <TestChild />
      </MockedProvider>,
      wrappers()
    );

    await waitFor(() =>
      expect(getByText("isDirty: false")).toBeInTheDocument()
    );
  });

  it("sets isDirty to true when an update changes a field value", async () => {
    const TestChild: React.FC = () => {
      const { isDirty, updateDiaryEntry } = useContext(DiaryEntryContext);
      useEffect(() => updateDiaryEntry("whatHappened")("asd"));
      return <>isDirty: {isDirty ? "true" : "false"}</>;
    };

    const { getByText } = render(
      <MockedProvider mocks={getMocks()} addTypename={false}>
        <TestChild />
      </MockedProvider>,
      wrappers()
    );

    await waitFor(() => expect(getByText("isDirty: true")).toBeInTheDocument());
    await waitFor(() => {
      // Need this waitFor nonsense to prevent the apollo hook from causing an act warning.
    });
  });

  it("does not set isDirty to true when an update does not change the entry", async () => {
    const TestChild: React.FC = () => {
      const { isDirty, updateDiaryEntry } = useContext(DiaryEntryContext);
      useEffect(() => updateDiaryEntry("whatHappened")(""));
      return <>isDirty: {isDirty ? "true" : "false"}</>;
    };

    const container = render(
      <MockedProvider mocks={getMocks()} addTypename={false}>
        <TestChild />
      </MockedProvider>,
      wrappers()
    );

    await waitFor(() =>
      expect(container.queryByText("isDirty: true")).not.toBeInTheDocument()
    );
  });

  it("does not set isDirty to false when an update does not change the entry", async () => {
    const TestChild: React.FC = () => {
      const { isDirty, updateDiaryEntry } = useContext(DiaryEntryContext);
      useEffect(() => {
        updateDiaryEntry("whatHappened")("foo");
        updateDiaryEntry("whatHappened")("foo");
      });
      return <>isDirty: {isDirty ? "true" : "false"}</>;
    };

    const container = render(
      <MockedProvider mocks={getMocks()} addTypename={false}>
        <TestChild />
      </MockedProvider>,
      wrappers()
    );

    expect(container.queryByText("isDirty: false")).not.toBeInTheDocument();
    await waitFor(() => {
      // Need this waitFor nonsense to prevent the apollo hook from causing an act warning.
    });
  });

  it("sets isDirty to false when the entry has been saved", async () => {
    const TestChild: React.FC = () => {
      const { isDirty, updateDiaryEntry } = useContext(DiaryEntryContext);
      useEffect(() => updateDiaryEntry("whatHappened")("foo"));
      return <>isDirty: {isDirty ? "true" : "false"}</>;
    };

    const container = render(
      <MockedProvider mocks={getMocks()} addTypename={false}>
        <TestChild />
      </MockedProvider>,
      wrappers()
    );

    expect(container.queryByText("isDirty: false")).not.toBeInTheDocument();
    await waitFor(() => {
      expect(container.queryByText("isDirty: false")).toBeInTheDocument();
    });
  });
});

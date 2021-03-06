import { ApolloProvider } from "@apollo/client";
import { render, waitFor } from "@testing-library/react";
import {
  DIARY_ENTRY_QUERY,
  UPDATE_DIARY_ENTRY_MUTATION,
} from "graphql/queries";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React, { PropsWithChildren, useContext, useEffect } from "react";
import { buildDiaryEntry } from "util/buildDiaryEntry";
import DateContextProvider from "./DateContext";
import {
  DiaryEntryContext,
  DiaryEntryContextProvider,
} from "./DiaryEntryContext";

const buildMockClient = () => {
  const mockClient = createMockClient();
  const payload = {
    data: { diaryEntry: buildDiaryEntry() },
  };
  mockClient.setRequestHandler(
    DIARY_ENTRY_QUERY,
    jest.fn().mockResolvedValue(payload)
  );
  mockClient.setRequestHandler(
    UPDATE_DIARY_ENTRY_MUTATION,
    jest.fn().mockResolvedValue(payload)
  );
  return mockClient;
};

const ProvidersAndContexts: React.FC<
  PropsWithChildren<{
    client: MockApolloClient;
  }>
> = ({ client, children }) => (
  <ApolloProvider client={client}>
    <DateContextProvider>
      <DiaryEntryContextProvider saveTimeoutInterval={1}>
        {children}
      </DiaryEntryContextProvider>
    </DateContextProvider>
  </ApolloProvider>
);

describe("DiaryEntryContextProvider", () => {
  it("sets isDirty to false when an entry is loaded and no updates have taken place", async () => {
    const TestChild: React.FC = () => {
      const { isDirty } = useContext(DiaryEntryContext);
      return <>isDirty: {isDirty ? "true" : "false"}</>;
    };

    const { getByText } = render(
      <ProvidersAndContexts client={buildMockClient()}>
        <TestChild />
      </ProvidersAndContexts>
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
      <ProvidersAndContexts client={buildMockClient()}>
        <TestChild />
      </ProvidersAndContexts>
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
      <ProvidersAndContexts client={buildMockClient()}>
        <TestChild />
      </ProvidersAndContexts>
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
      <ProvidersAndContexts client={buildMockClient()}>
        <TestChild />
      </ProvidersAndContexts>
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
      <ProvidersAndContexts client={buildMockClient()}>
        <TestChild />
      </ProvidersAndContexts>
    );

    expect(container.queryByText("isDirty: false")).not.toBeInTheDocument();
    await waitFor(() => {
      expect(container.queryByText("isDirty: false")).toBeInTheDocument();
    });
  });
});

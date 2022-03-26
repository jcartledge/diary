import { render, waitFor } from "@testing-library/react";
import React, { useContext, useEffect } from "react";
import { wrap } from "souvlaki";
import { withDate } from "../testWrappers/withDate";
import { withDiaryEntry } from "../testWrappers/withDiaryEntry";
import { withMockedApolloProvider } from "../testWrappers/withMockedApolloProvider";
import { withRoute } from "../testWrappers/withRoute";
import { buildMockDiaryEntryMutation } from "../util/buildApolloClientMocks";
import { buildDiaryEntry } from "../util/buildDiaryEntry";
import { DiaryEntryContext } from "./DiaryEntryContext";

describe("DiaryEntryContextProvider", () => {
  it("sets isDirty to false when an entry is loaded and no updates have taken place", async () => {
    const TestChild: React.FC = () => {
      const { isDirty } = useContext(DiaryEntryContext);
      return <>isDirty: {isDirty ? "true" : "false"}</>;
    };

    const { getByText } = render(<TestChild />, {
      wrapper: wrap(
        withMockedApolloProvider(),
        withRoute(),
        withDiaryEntry({ saveTimeoutInterval: 1 }),
        withDate()
      ),
    });

    await waitFor(() =>
      expect(getByText("isDirty: false")).toBeInTheDocument()
    );
  });

  it("sets isDirty to true when an update changes a field value", async () => {
    const TestChild: React.FC = () => {
      const { isDirty, updateDiaryEntry } = useContext(DiaryEntryContext);
      useEffect(() => updateDiaryEntry("whatHappened")("asd"), []);
      return <>isDirty: {isDirty ? "true" : "false"}</>;
    };

    const { getByText } = render(<TestChild />, {
      wrapper: wrap(
        withMockedApolloProvider({
          mocks: [
            buildMockDiaryEntryMutation(
              buildDiaryEntry({ whatHappened: "asd" })
            ),
          ],
        }),
        withRoute(),
        withDiaryEntry({ saveTimeoutInterval: 1 }),
        withDate()
      ),
    });

    await waitFor(() => expect(getByText("isDirty: true")).toBeInTheDocument());
    await waitFor(() => {
      // Need this waitFor nonsense to prevent the apollo hook from causing an act warning.
    });
  });

  it("does not set isDirty to true when an update does not change the entry", async () => {
    const TestChild: React.FC = () => {
      const { isDirty, updateDiaryEntry } = useContext(DiaryEntryContext);
      useEffect(() => updateDiaryEntry("whatHappened")(""), []);
      return <>isDirty: {isDirty ? "true" : "false"}</>;
    };

    const container = render(<TestChild />, {
      wrapper: wrap(
        withMockedApolloProvider({
          mocks: [buildMockDiaryEntryMutation()],
        }),
        withRoute(),
        withDiaryEntry({ saveTimeoutInterval: 1 }),
        withDate()
      ),
    });

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
      }, []);
      return <>isDirty: {isDirty ? "true" : "false"}</>;
    };

    const mockDiaryEntryMutation = buildMockDiaryEntryMutation(
      buildDiaryEntry({ whatHappened: "foo" })
    );
    const container = render(<TestChild />, {
      wrapper: wrap(
        withMockedApolloProvider({
          mocks: [mockDiaryEntryMutation, mockDiaryEntryMutation],
        }),
        withRoute(),
        withDiaryEntry({ saveTimeoutInterval: 1 }),
        withDate()
      ),
    });

    expect(container.queryByText("isDirty: false")).not.toBeInTheDocument();
    await waitFor(() => {
      // Need this waitFor nonsense to prevent the apollo hook from causing an act warning.
    });
  });

  it("sets isDirty to false when the entry has been saved", async () => {
    const TestChild: React.FC = () => {
      const { isDirty, updateDiaryEntry } = useContext(DiaryEntryContext);
      useEffect(() => updateDiaryEntry("whatHappened")("foo"), []);
      return <>isDirty: {isDirty ? "true" : "false"}</>;
    };

    const container = render(<TestChild />, {
      wrapper: wrap(
        withMockedApolloProvider({
          mocks: [
            buildMockDiaryEntryMutation(
              buildDiaryEntry({ whatHappened: "foo" })
            ),
          ],
        }),
        withRoute(),
        withDiaryEntry({ saveTimeoutInterval: 1 }),
        withDate()
      ),
    });

    expect(container.queryByText("isDirty: false")).not.toBeInTheDocument();
    await waitFor(() => {
      expect(container.queryByText("isDirty: false")).toBeInTheDocument();
    });
  });
});

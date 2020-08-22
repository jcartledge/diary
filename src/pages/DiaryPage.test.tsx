import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "store/reducers";
import { buildDiaryEntry, buildState } from "store/state";
import { convertDateToEntryKey, decrementDate } from "util/date";
import DiaryPage from "./DiaryPage";

describe("DiaryPage", () => {
  it("shows the dairy entry for the correct date when decrementing dates", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));
    const initialState = buildState({
      date,
      entries: [
        buildDiaryEntry({
          date: convertDateToEntryKey(date),
          whatHappened: "Today",
        }),
        buildDiaryEntry({
          date: convertDateToEntryKey(decrementDate(date)),
          whatHappened: "Yesterday",
        }),
      ],
    });
    const store = createStore(rootReducer, initialState);
    render(
      <Provider store={store}>
        <DiaryPage />
      </Provider>
    );

    expect(screen.getByLabelText("What happened?")).toHaveTextContent("Today");
    userEvent.click(screen.getByRole("button", { name: "prev" }));
    expect(screen.getByLabelText("What happened?")).toHaveTextContent(
      "Yesterday"
    );
  });

  it("does not persist the field values when there is no entry to populate", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));
    const initialState = buildState({
      date,
      entries: [
        buildDiaryEntry({
          date: convertDateToEntryKey(date),
          whatHappened: "Today",
        }),
      ],
    });
    const store = createStore(rootReducer, initialState);
    render(
      <Provider store={store}>
        <DiaryPage />
      </Provider>
    );

    expect(screen.getByLabelText("What happened?")).toHaveTextContent("Today");
    userEvent.click(screen.getByRole("button", { name: "prev" }));
    expect(screen.getByLabelText("What happened?")).toHaveTextContent("");
  });
});

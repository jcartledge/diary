import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "store/reducers";
import { selectDate } from "store/selectors";
import { buildDiaryEntry, buildState } from "store/state";
import { convertDateToEntryKey, decrementDate } from "util/date";
import DatePrevButton from "./DatePrevButton";

describe("DatePrevButton", () => {
  it("changes the date in the store to the previous date", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));
    const initialState = buildState({ date });
    const store = createStore(rootReducer, initialState);

    render(
      <Provider store={store}>
        <DatePrevButton />
      </Provider>
    );

    userEvent.click(screen.getByRole("button", { name: "prev" }));

    expect(convertDateToEntryKey(selectDate(store.getState()))).toEqual(
      "2009-12-31"
    );
  });

  it("decrements once for each click", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));
    const initialState = buildState({ date });
    const store = createStore(rootReducer, initialState);

    render(
      <Provider store={store}>
        <DatePrevButton />
      </Provider>
    );

    const prevButton = screen.getByRole("button", { name: "prev" });
    userEvent.click(prevButton);
    userEvent.click(prevButton);
    userEvent.click(prevButton);

    expect(convertDateToEntryKey(selectDate(store.getState()))).toEqual(
      "2009-12-29"
    );
  });

  it("bolds the button text if there is an entry on the previous date", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));
    const entries = [
      buildDiaryEntry({ date: convertDateToEntryKey(date) }),
      buildDiaryEntry({ date: convertDateToEntryKey(decrementDate(date)) }),
    ];
    const initialState = buildState({ date, entries });
    const store = createStore(rootReducer, initialState);
    render(
      <Provider store={store}>
        <DatePrevButton />
      </Provider>
    );
    const prevButton = screen.getByRole("button", { name: "prev" });

    expect(prevButton).toHaveClass("font-bold");
    userEvent.click(prevButton);
    expect(prevButton).not.toHaveClass("font-bold");
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "store/reducers";
import { selectDate } from "store/selectors";
import { buildDiaryEntry, buildState } from "store/state";
import { convertDateToEntryKey, incrementDate } from "util/date";
import DateNextButton from "./DateNextButton";

describe("DateNextButton", () => {
  it("changes the date in the store to the next date", () => {
    const date = new Date(Date.UTC(2010, 11, 31, 12, 0, 0));
    const initialState = buildState({ date });
    const store = createStore(rootReducer, initialState);

    render(
      <Provider store={store}>
        <DateNextButton />
      </Provider>
    );

    userEvent.click(screen.getByRole("button", { name: "next" }));

    expect(convertDateToEntryKey(selectDate(store.getState()))).toEqual(
      "2011-01-01"
    );
  });

  it("increments once for each click", () => {
    const date = new Date(Date.UTC(2010, 11, 31, 12, 0, 0));
    const initialState = buildState({ date });
    const store = createStore(rootReducer, initialState);

    render(
      <Provider store={store}>
        <DateNextButton />
      </Provider>
    );

    const nextButton = screen.getByRole("button", { name: "next" });
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);

    expect(convertDateToEntryKey(selectDate(store.getState()))).toEqual(
      "2011-01-03"
    );
  });

  it("does not increment past the current date", () => {
    const date = new Date();
    const initialState = buildState({ date });
    const store = createStore(rootReducer, initialState);

    render(
      <Provider store={store}>
        <DateNextButton />
      </Provider>
    );

    const nextButton = screen.getByRole("button", { name: "next" });

    expect(nextButton).toBeDisabled();
    userEvent.click(nextButton);
    expect(selectDate(store.getState()).getTime()).toEqual(date.getTime());
  });

  it("bolds the button text if there is an entry on the next date", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));
    const entries = [
      buildDiaryEntry({ date: convertDateToEntryKey(date) }),
      buildDiaryEntry({ date: convertDateToEntryKey(incrementDate(date)) }),
    ];
    const initialState = buildState({ date, entries });
    const store = createStore(rootReducer, initialState);
    render(
      <Provider store={store}>
        <DateNextButton />
      </Provider>
    );
    const nextButton = screen.getByRole("button", { name: "next" });

    expect(nextButton).toHaveClass("font-bold");
    userEvent.click(nextButton);
    expect(nextButton).not.toHaveClass("font-bold");
  });
});

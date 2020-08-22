import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "store/reducers";
import { selectDate } from "store/selectors";
import { buildState } from "store/state";
import { convertDateToEntryKey } from "util/date";
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

    const prevButton = screen.getByRole("button", { name: "next" });
    userEvent.click(prevButton);
    userEvent.click(prevButton);
    userEvent.click(prevButton);

    expect(convertDateToEntryKey(selectDate(store.getState()))).toEqual(
      "2011-01-03"
    );
  });
});

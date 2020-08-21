import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { LocaleContext } from "../contexts/LocaleContext";
import { rootReducer } from "../redux/reducers";
import { buildDiaryEntry, buildState } from "../redux/state";
import { convertDateToEntryKey } from "../util/convertDateToEntryKey";
import { Diary } from "./Diary";

describe("Diary", () => {
  it("renders the date in the correct locale", async () => {
    const initialState = buildState({
      date: new Date(Date.UTC(2010, 0, 1, 12, 0, 0)),
    });
    const store = createStore(rootReducer, initialState);

    render(
      <LocaleContext.Provider value="en-AU">
        <Provider store={store}>
          <Diary />
        </Provider>
      </LocaleContext.Provider>
    );

    expect(
      await screen.findByText(/Friday, 1 January 2010/)
    ).toBeInTheDocument();
  });

  it("renders the diary content from the store", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));
    const initialState = buildState({
      date,
      entries: [
        buildDiaryEntry({
          date: convertDateToEntryKey(date),
          whatHappened: "Lots",
          wentWell: "Nothing went well",
          couldBeImproved: "Everything",
          notWell: "Too many arguments",
          risk: "More arguments",
        }),
      ],
    });
    const store = createStore(rootReducer, initialState);

    render(
      <Provider store={store}>
        <Diary />
      </Provider>
    );

    expect(screen.getByLabelText("What happened?")).toHaveTextContent("Lots");
    expect(screen.getByLabelText("Went well")).toHaveTextContent(
      "Nothing went well"
    );
    expect(screen.getByLabelText("Could be improved")).toHaveTextContent(
      "Everything"
    );
    expect(screen.getByLabelText("Didn't go well")).toHaveTextContent(
      "Too many arguments"
    );
    expect(screen.getByLabelText("Might be a risk")).toHaveTextContent(
      "More arguments"
    );
  });

  it("renders and empty entry if there is no entry for the date in the store", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));
    const initialState = buildState({ date });
    const store = createStore(rootReducer, initialState);

    render(
      <Provider store={store}>
        <Diary />
      </Provider>
    );

    expect(screen.getByLabelText("What happened?")).toHaveTextContent("");
    expect(screen.getByLabelText("Went well")).toHaveTextContent("");
    expect(screen.getByLabelText("Could be improved")).toHaveTextContent("");
    expect(screen.getByLabelText("Didn't go well")).toHaveTextContent("");
    expect(screen.getByLabelText("Might be a risk")).toHaveTextContent("");
  });

  it("retains the entry for the date when it is edited", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));
    const initialState = buildState({ date });
    const store = createStore(rootReducer, initialState);

    const { unmount } = render(
      <Provider store={store}>
        <Diary />
      </Provider>
    );

    userEvent.type(
      screen.getByLabelText("What happened?"),
      "Something happened"
    );

    unmount();

    render(
      <Provider store={store}>
        <Diary />
      </Provider>
    );

    expect(screen.getByLabelText("What happened?")).toHaveTextContent(
      "Something happened"
    );
  });
});

import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { LocaleContext } from "../contexts/LocaleContext";
import { buildDiaryEntry, buildState, rootReducer } from "../redux";
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

  it.skip("renders the diary content from the store", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));
    const initialState = buildState({
      date,
      entries: [
        buildDiaryEntry({
          date,
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
        <Diary date={date} />
      </Provider>
    );

    expect(screen.getByLabelText("What happened?")).toHaveTextContent("Lots");
  });
});

import { render, screen } from "@testing-library/react";
import { LocaleContext } from "contexts/LocaleContext";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "store/reducers";
import { buildState } from "store/state";
import { FormattedDate } from "./FormattedDate";

describe("Diary", () => {
  it("renders the date in the locale passed to it", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));
    const initialState = buildState({ date });
    const store = createStore(rootReducer, initialState);

    render(
      <LocaleContext.Provider value="en-AU">
        <Provider store={store}>
          <FormattedDate />
        </Provider>
      </LocaleContext.Provider>
    );

    expect(screen.getByText(/Friday, 1 January 2010/)).toBeInTheDocument();
  });
});

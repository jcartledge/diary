import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "../redux/reducers";
import { buildDiaryEntry, buildState } from "../redux/state";
import { convertDateToEntryKey } from "../util/convertDateToEntryKey";
import WhatHappened from "./WhatHappened";

describe("WhatHappened", () => {
  it("renders the content from the store", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));
    const initialState = buildState({
      date,
      entries: [
        buildDiaryEntry({
          date: convertDateToEntryKey(date),
          whatHappened: "Lots",
        }),
      ],
    });
    const store = createStore(rootReducer, initialState);

    render(
      <Provider store={store}>
        <WhatHappened />
      </Provider>
    );

    expect(screen.getByLabelText("What happened?")).toHaveTextContent("Lots");
  });

  it("renders no content when there is no entry for the date", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));
    const initialState = buildState({
      date,
      entries: [],
    });
    const store = createStore(rootReducer, initialState);

    render(
      <Provider store={store}>
        <WhatHappened />
      </Provider>
    );

    expect(screen.getByLabelText("What happened?")).toHaveTextContent("");
  });

  it("retains the entry for the date when it is edited", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));
    const initialState = buildState({ date });
    const store = createStore(rootReducer, initialState);

    const { unmount } = render(
      <Provider store={store}>
        <WhatHappened />
      </Provider>
    );

    userEvent.type(
      screen.getByLabelText("What happened?"),
      "Something happened"
    );

    unmount();

    render(
      <Provider store={store}>
        <WhatHappened />
      </Provider>
    );

    expect(screen.getByLabelText("What happened?")).toHaveTextContent(
      "Something happened"
    );
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LocaleContext } from "contexts/LocaleContext";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "store/reducers";
import { buildDiaryEntry, buildState } from "store/state";
import { convertDateToEntryKey } from "util/convertDateToEntryKey";
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

  it("renders an empty entry if there is no entry for the date in the store", () => {
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

  it("retains the entry for the What Happened when it is edited", () => {
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

  it("retains the entry for Went well when it is edited", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));
    const initialState = buildState({ date });
    const store = createStore(rootReducer, initialState);

    const { unmount } = render(
      <Provider store={store}>
        <Diary />
      </Provider>
    );

    userEvent.type(screen.getByLabelText("Went well"), "Something went well");

    unmount();

    render(
      <Provider store={store}>
        <Diary />
      </Provider>
    );

    expect(screen.getByLabelText("Went well")).toHaveTextContent(
      "Something went well"
    );
  });

  it("retains the entry for Could be improved when it is edited", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));
    const initialState = buildState({ date });
    const store = createStore(rootReducer, initialState);

    const { unmount } = render(
      <Provider store={store}>
        <Diary />
      </Provider>
    );

    userEvent.type(
      screen.getByLabelText("Could be improved"),
      "Something could be improved"
    );

    unmount();

    render(
      <Provider store={store}>
        <Diary />
      </Provider>
    );

    expect(screen.getByLabelText("Could be improved")).toHaveTextContent(
      "Something could be improved"
    );
  });

  it("retains the entry for Didn't go well when it is edited", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));
    const initialState = buildState({ date });
    const store = createStore(rootReducer, initialState);

    const { unmount } = render(
      <Provider store={store}>
        <Diary />
      </Provider>
    );

    userEvent.type(
      screen.getByLabelText("Didn't go well"),
      "Something didn't go well"
    );

    unmount();

    render(
      <Provider store={store}>
        <Diary />
      </Provider>
    );

    expect(screen.getByLabelText("Didn't go well")).toHaveTextContent(
      "Something didn't go well"
    );
  });

  it("retains the entry for Might be a risk when it is edited", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));
    const initialState = buildState({ date });
    const store = createStore(rootReducer, initialState);

    const { unmount } = render(
      <Provider store={store}>
        <Diary />
      </Provider>
    );

    userEvent.type(
      screen.getByLabelText("Might be a risk"),
      "Something might be a risk"
    );

    unmount();

    render(
      <Provider store={store}>
        <Diary />
      </Provider>
    );

    expect(screen.getByLabelText("Might be a risk")).toHaveTextContent(
      "Something might be a risk"
    );
  });
});

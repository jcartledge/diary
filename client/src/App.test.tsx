import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "App";
import React from "react";
import { createStorageBackedStore } from "store";
import { buildDiaryEntry } from "store/state";
import { buildMockStorage } from "util/test/mockStorage";

describe("App", () => {
  it("loads entries from localStorage", () => {
    const entries = [buildDiaryEntry({ whatHappened: "something happened!" })];
    const mockLocalStorage = buildMockStorage({
      getItem: (key) =>
        key === "diary-entries" ? JSON.stringify(entries) : null,
    });

    render(
      <App store={createStorageBackedStore({ storage: mockLocalStorage })} />
    );

    expect(screen.getByLabelText("What happened?")).toHaveTextContent(
      "something happened!"
    );
  });

  it("saves entries to localStorage when the store updates", async () => {
    const mockLocalStorage = buildMockStorage();
    render(
      <App
        store={createStorageBackedStore({
          storage: mockLocalStorage,
          throttleTime: 0,
        })}
      />
    );
    await userEvent.type(screen.getByLabelText("What happened?"), "nothing");

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "diary-entries",
      JSON.stringify([buildDiaryEntry({ whatHappened: "nothing" })])
    );
  });
});

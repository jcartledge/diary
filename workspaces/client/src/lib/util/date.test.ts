import { describe, expect, it } from "vitest";
import { DiaryDate } from "./date";

describe("DiaryDate", () => {
  describe("getKey", () => {
    it("returns a date key", () => {
      const date = new DiaryDate(new Date(Date.UTC(2010, 0, 1, 12, 0, 0)));

      expect(date.getKey()).toEqual("2010-01-01");
    });
  });

  describe("getPrevious", () => {
    it("returns an object representing the previous date", () => {
      const date = new DiaryDate(new Date(Date.UTC(2010, 0, 1, 12, 0, 0)));

      expect(date.getPrevious().getKey()).toEqual("2009-12-31");
    });
  });

  describe("getNext", () => {
    it("returns an object representing the next date", () => {
      const date = new DiaryDate(new Date(Date.UTC(2010, 0, 1, 12, 0, 0)));

      expect(date.getNext().getKey()).toEqual("2010-01-02");
    });
  });

  describe("isToday", () => {
    it("returns true if the date is today", () => {
      const date = new DiaryDate();

      expect(date.isToday()).toBe(true);
    });

    it("returns false if the date is not today", () => {
      const date = new DiaryDate();

      expect(date.getPrevious().isToday()).toBe(false);
    });
  });

  describe("from", () => {
    it("returns a DiaryDate if the string is valid", () => {
      const isoDateString = "2015-01-01";
      const diaryDate = DiaryDate.from(isoDateString);

      expect(diaryDate.result!.getKey()).toEqual(isoDateString);
    });

    it("returns an error if the string is not valid", () => {
      const diaryDate = DiaryDate.from("");

      expect(diaryDate.error).toBeDefined();
    });
  });
});

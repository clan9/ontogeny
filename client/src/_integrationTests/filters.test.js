import moment from "moment";
import { testStore } from "../utils/testUtils";
import {
  setTextFilter,
  setStartDate,
  setEndDate,
  sortByAmount,
  sortByDate
} from "../actions/filters/filters";
import { filters, altFilters } from "../fixtures/filters";

describe("Filters action creators and reducer integration tests", () => {
  describe("State is the initial default state", () => {
    let store;

    beforeEach(() => {
      store = testStore({ filters });
    });

    test("should update the text filter in state", async () => {
      const text = "Hello";
      await store.dispatch(setTextFilter(text));
      const newState = store.getState();
      expect(newState.filters.text).toBe(text);
    });

    test("should update the sortBy state to be `amount`", async () => {
      await store.dispatch(sortByAmount());
      const newState = store.getState();
      expect(newState.filters.sortBy).toBe("amount");
    });

    test("should set startDate filter in state", async () => {
      const startDate = moment(0).add(3, "days");
      await store.dispatch(setStartDate(startDate));
      const newState = store.getState();
      expect(newState.filters.startDate).toBe(startDate);
    });

    test("should set endDate filter in state", async () => {
      const endDate = moment(0).add(2, "weeks");
      await store.dispatch(setEndDate(endDate));
      const newState = store.getState();
      expect(newState.filters.endDate).toBe(endDate);
    });
  });

  describe("State is the alt filters (to test changing sortBy to `date`)", () => {
    test("should update the sortBy filter to `date`", async () => {
      const store = testStore({ filters: altFilters });
      await store.dispatch(sortByDate());
      const newState = store.getState();
      expect(newState.filters.sortBy).toBe("date");
    });
  });
});

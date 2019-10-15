import filtersReducer from "./filtersReducer";
import moment from "moment";
import { actionTypes } from "../../actions/types";

describe("filters reducer", () => {
  test("should set up the filters default state correctly", () => {
    const state = filtersReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual({
      text: "",
      sortBy: "date",
      startDate: moment().startOf("month"),
      endDate: moment().endOf("month")
    });
  });

  test("should update text filter", () => {
    const text = "Reducer test";
    const newState = filtersReducer(undefined, {
      type: actionTypes.SET_TEXT_FILTER,
      payload: text
    });
    expect(newState.text).toBe(text);
  });

  test("should update sortBy to be `amount` ", () => {
    const newState = filtersReducer(undefined, {
      type: actionTypes.SORT_BY_AMOUNT
    });
    expect(newState.sortBy).toBe("amount");
  });

  test("should set sortBy to be `date` ", () => {
    const state = {
      text: "something",
      sortBy: "amount",
      startDate: moment().startOf("year"),
      endDate: moment().endOf("month")
    };

    const newState = filtersReducer(state, { type: actionTypes.SORT_BY_DATE });
    expect(newState.sortBy).toBe("date");
  });

  test("should set startDate filter", () => {
    const newDate = moment().add(2, "weeks");
    const newState = filtersReducer(undefined, {
      type: actionTypes.SET_START_DATE,
      payload: newDate
    });
    expect(newState.startDate).toBe(newDate);
  });

  test("should set endDate filter", () => {
    const newDate = moment().add(2, "weeks");
    const newState = filtersReducer(undefined, {
      type: actionTypes.SET_END_DATE,
      payload: newDate
    });
    expect(newState.endDate).toBe(newDate);
  });
});

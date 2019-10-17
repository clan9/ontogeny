import { actionTypes } from "../../actions/types";
import incomeReducer from "./incomeReducer";
import incomes from "../../fixtures/income";
import moment from "moment";

describe("Income reducer", () => {
  describe("Initial state", () => {
    test("should return default state at startup", () => {
      const initialState = [];
      const state = incomeReducer(undefined, { type: "@@INIT" });
      expect(state).toEqual(initialState);
    });
  });

  describe("State updates for actions received", () => {
    test("should update state to show all incomes", () => {
      const newState = incomeReducer(undefined, {
        type: actionTypes.FETCH_USER_INCOMES,
        payload: incomes
      });
      expect(newState).toEqual(incomes);
    });

    test("should add a new income with provided values", () => {
      const income = {
        _id: "4",
        description: "test",
        amount: 777,
        note: "",
        date: moment(0).add(1, "week")
      };

      const newState = incomeReducer(incomes, {
        type: actionTypes.ADD_INCOME,
        payload: income
      });
      expect(newState.length).toBe(4);
      expect(newState[3]).toBe(income);
    });

    test("should edit an existing income", () => {
      const note = "note being added to income";
      const newState = incomeReducer(incomes, {
        type: actionTypes.EDIT_INCOME,
        payload: {
          _id: "1",
          note
        }
      });
      expect(newState[0].note).toBe(note);
    });

    test("should delete an income", () => {
      const newState = incomeReducer(incomes, {
        type: actionTypes.DELETE_INCOME,
        payload: {
          _id: "2"
        }
      });
      expect(newState.length).toBe(2);
    });

    test("should not delete an income if id not valid", () => {
      const newState = incomeReducer(incomes, {
        type: actionTypes.DELETE_INCOME,
        payload: { _id: "INVALID" }
      });
      expect(newState).toEqual(incomes);
      expect(newState.length).toBe(3);
    });

    test("should clear incomes from state when user logs out", () => {
      const newState = incomeReducer(incomes, {
        type: actionTypes.CLEAR_INCOMES
      });
      expect(newState).toEqual([]);
    });
  });
});

import { actionTypes } from "../../actions/types";
import expensesReducer from "./expensesReducer";
import expenses from "../../fixtures/expenses";
import moment from "moment";

describe("expenses reducer", () => {
  describe("Initial state", () => {
    test("should return correct initial state at startup", () => {
      const initialState = [];
      const newState = expensesReducer(undefined, { type: "@@INIT" });
      expect(newState).toEqual(initialState);
    });
  });

  describe("State updates for actions received", () => {
    test("should update state to show all expenses", () => {
      const newState = expensesReducer(undefined, {
        type: actionTypes.FETCH_USER_EXPENSES,
        payload: expenses
      });
      expect(newState).toEqual(expenses);
    });

    test("should add a new expense with provided values", () => {
      const expense = {
        _id: "4",
        description: "coffee",
        note: "",
        amount: 450,
        date: moment(0)
          .add(6, "days")
          .valueOf()
      };

      const newState = expensesReducer(expenses, {
        type: actionTypes.ADD_EXPENSE,
        payload: expense
      });

      expect(newState.length).toEqual(4);
      expect(newState[3]).toEqual(expense);
    });

    test("should edit an existing expense", () => {
      const note = "Note added to first expense";
      const newState = expensesReducer(expenses, {
        type: actionTypes.EDIT_EXPENSE,
        payload: {
          _id: "1",
          note
        }
      });
      expect(newState[0].note).toBe(note);
    });

    test("should delete an expense", () => {
      const newState = expensesReducer(expenses, {
        type: actionTypes.DELETE_EXPENSE,
        payload: { _id: "2" }
      });

      expect(newState.length).toBe(2);
      expect(newState).toEqual([expenses[0], expenses[2]]);
    });

    test("should not delete an expense if id not valid", () => {
      const newState = expensesReducer(expenses, {
        type: actionTypes.DELETE_EXPENSE,
        payload: { _id: "9999" }
      });

      expect(newState.length).toBe(3);
      expect(newState).toEqual(expenses);
    });

    test("should return empty array for an error action", () => {
      const newState = expensesReducer(expenses, {
        type: actionTypes.EXPENSES_ERROR
      });

      expect(newState).toEqual([]);
    });
  });
});

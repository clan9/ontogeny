import moxios from "moxios";
import moment from "moment";
import { testStore } from "../utils/testUtils";
import {
  fetchUserExpenses,
  addExpense,
  editExpense,
  deleteExpense
} from "../actions/expenses/expenses";
import expenses from "../fixtures/expenses";

describe("Expenses action creator and reducer", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe("Fetch expenses (initial state is empty array)", () => {
    let store;

    test("should fetch a users expenses and add to state", async () => {
      store = testStore();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: expenses
        });
      });

      await store.dispatch(fetchUserExpenses());
      const newState = store.getState();
      expect(newState.expenses).toEqual(expenses);
    });
  });

  describe("Add, Update and Delete expenses (current state is array of 3 expenses from fixtures file)", () => {
    let store;

    beforeEach(() => {
      store = testStore({
        expenses
      });
    });

    test("should add a new expense to the state", async () => {
      const newExpense = {
        _id: "4",
        description: "integration test",
        note: "",
        amount: 23450,
        date: moment(0)
          .add(5, "days")
          .valueOf()
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: newExpense
        });
      });

      await store.dispatch(addExpense());
      const newState = store.getState();
      expect(newState.expenses.length).toBe(4);
      expect(newState.expenses[3]).toEqual(newExpense);
    });

    test("should update an existing expense in the state", async () => {
      const updatesToExpense = {
        _id: "2",
        description: "New desc",
        note: "This is new!"
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: updatesToExpense
        });
      });

      await store.dispatch(editExpense());
      const newState = store.getState();
      expect(newState.expenses[1].description).toBe("New desc");
      expect(newState.expenses[1].note).toBe("This is new!");
    });

    test("should delete an expense from the state", async () => {
      const expenseToDelete = expenses[1];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: expenseToDelete
        });
      });

      await store.dispatch(deleteExpense());
      const newState = store.getState();
      expect(newState.expenses.length).toBe(2);
      expect(newState.expenses).toEqual([expenses[0], expenses[2]]);
    });
  });
});

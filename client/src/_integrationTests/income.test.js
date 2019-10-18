import moxios from "moxios";
import moment from "moment";
import { testStore } from "../utils/testUtils";
import income from "../fixtures/income";
import {
  fetchUserIncomes,
  addIncome,
  editIncome,
  deleteIncome,
  clearIncomes
} from "../actions/income/income";

describe("Income action creators and reducer", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe("fetch incomes (initial state is empty array)", () => {
    let store;

    test("should fetch a users incomes and add to state", async () => {
      store = testStore();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: income
        });
      });

      await store.dispatch(fetchUserIncomes());
      const state = store.getState();
      expect(state.income).toEqual(income);
    });
  });

  describe("Add, edit and delete income from state (current state is array of 3 incomes from fixtures file)", () => {
    let store;

    beforeEach(() => {
      store = testStore({ income });
    });

    test("should add a new income to state", async () => {
      const newIncome = {
        _id: "4",
        description: "test new income",
        amount: 555,
        note: "",
        date: moment(0)
          .add(3, "months")
          .valueOf()
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: newIncome
        });
      });

      await store.dispatch(addIncome());
      const newState = store.getState();
      expect(newState.income.length).toBe(4);
      expect(newState.income[3]).toEqual(newIncome);
    });

    test("should edit an existing income", async () => {
      const updates = {
        _id: "1",
        note: "Note added for testing"
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: updates
        });
      });

      await store.dispatch(editIncome());
      const newState = store.getState();
      expect(newState.income[0].note).toBe(updates.note);
    });

    test("should delete an income from state", async () => {
      const deletedIncome = { _id: "3" };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: deletedIncome
        });
      });

      await store.dispatch(deleteIncome());
      const newState = store.getState();
      expect(newState.income.length).toBe(2);
      expect(newState.income).toEqual([income[0], income[1]]);
    });

    test("should clear all incomes from state (user logs out)", async () => {
      const clearedIncome = [];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: clearedIncome
        });
      });

      await store.dispatch(clearIncomes());
      const newState = store.getState();
      expect(newState.income).toEqual(clearedIncome);
    });
  });
});

import { actionTypes } from "../../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.FETCH_ALL_EXPENSES:
    case actionTypes.FETCH_USER_EXPENSES:
      return [...payload];
    case actionTypes.ADD_EXPENSE:
      return [...state, payload];
    case actionTypes.EDIT_EXPENSE:
      return state.map(expense => {
        if (expense._id === payload._id) {
          return { ...expense, ...payload };
        } else {
          return expense;
        }
      });
    case actionTypes.DELETE_EXPENSE:
      return state.filter(expense => expense._id !== payload._id);
    case actionTypes.EXPENSES_ERROR:
      return [];
    default:
      return state;
  }
};

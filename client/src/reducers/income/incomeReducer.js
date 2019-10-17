import { actionTypes } from "../../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.FETCH_ALL_INCOMES:
    case actionTypes.FETCH_USER_INCOMES:
      return [...payload];
    case actionTypes.ADD_INCOME:
      return [...state, payload];
    case actionTypes.EDIT_INCOME:
      return state.map(income => {
        if (income._id === payload._id) {
          return { ...income, ...payload };
        } else {
          return income;
        }
      });
    case actionTypes.DELETE_INCOME:
      return state.filter(income => income._id !== payload._id);
    case actionTypes.CLEAR_INCOMES:
    case actionTypes.INCOME_ERROR:
      return [];
    default:
      return state;
  }
};

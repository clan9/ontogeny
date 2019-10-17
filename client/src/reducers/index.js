import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import expensesReducer from "./expenses/expensesReducer";
import filtersReducer from "./filters/filtersReducer";
import incomeReducer from "./income/incomeReducer";

export default combineReducers({
  user: userReducer,
  expenses: expensesReducer,
  income: incomeReducer,
  filters: filtersReducer
});

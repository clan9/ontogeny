import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import expensesReducer from "./expenses/expensesReducer";
import filtersReducer from "./filters/filtersReducer";

export default combineReducers({
  user: userReducer,
  expenses: expensesReducer,
  filters: filtersReducer
});

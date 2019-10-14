import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import expensesReducer from "./expenses/expensesReducer";

export default combineReducers({
  user: userReducer,
  expenses: expensesReducer
});

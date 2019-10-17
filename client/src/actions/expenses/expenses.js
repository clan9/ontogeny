import axios from "axios";
import { actionTypes } from "../types";

export const fetchAllExpenses = () => async dispatch => {
  try {
    const res = await axios.get("/api/expenses/all");
    dispatch({ type: actionTypes.FETCH_ALL_EXPENSES, payload: res.data });
  } catch (error) {
    dispatch({ type: actionTypes.EXPENSES_ERROR });
  }
};

export const fetchUserExpenses = () => async dispatch => {
  try {
    const res = await axios.get("/api/user/listExpenses");
    dispatch({ type: actionTypes.FETCH_USER_EXPENSES, payload: res.data });
  } catch (error) {
    dispatch({ type: actionTypes.EXPENSES_ERROR });
  }
};

export const addExpense = formData => async dispatch => {
  try {
    const res = await axios.post("/api/expenses", formData);
    dispatch({ type: actionTypes.ADD_EXPENSE, payload: res.data });
  } catch (error) {
    dispatch({ type: actionTypes.EXPENSES_ERROR });
  }
};

export const editExpense = (formData, id) => async dispatch => {
  try {
    const res = await axios.patch(`/api/expenses/${id}`, formData);
    dispatch({ type: actionTypes.EDIT_EXPENSE, payload: res.data });
  } catch (error) {
    dispatch({ type: actionTypes.EXPENSES_ERROR });
  }
};

export const deleteExpense = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/expenses/${id}`);
    dispatch({ type: actionTypes.DELETE_EXPENSE, payload: res.data });
  } catch (error) {
    dispatch({ type: actionTypes.EXPENSES_ERROR });
  }
};

export const clearExpenses = () => {
  return { type: actionTypes.CLEAR_EXPENSES };
};

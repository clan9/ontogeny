import axios from "axios";
import { actionTypes } from "../types";

export const fetchAllIncomes = () => async dispatch => {
  try {
    const res = await axios.get("/api/income/all");
    dispatch({ type: actionTypes.FETCH_ALL_INCOMES, payload: res.data });
  } catch (error) {
    dispatch({ type: actionTypes.INCOME_ERROR });
  }
};

export const fetchUserIncomes = () => async dispatch => {
  try {
    const res = await axios.get("/api/user/listIncomes");
    dispatch({ type: actionTypes.FETCH_USER_INCOMES, payload: res.data });
  } catch (error) {
    dispatch({ type: actionTypes.INCOME_ERROR });
  }
};

export const addIncome = formData => async dispatch => {
  try {
    const res = await axios.post("/api/income", formData);
    dispatch({ type: actionTypes.ADD_INCOME, payload: res.data });
  } catch (error) {
    dispatch({ type: actionTypes.INCOME_ERROR });
  }
};

export const editIncome = (formData, id) => async dispatch => {
  try {
    const res = await axios.patch(`/api/income/${id}`, formData);
    dispatch({ type: actionTypes.EDIT_INCOME, payload: res.data });
  } catch (error) {
    dispatch({ type: actionTypes.INCOME_ERROR });
  }
};

export const deleteIncome = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/income/${id}`);
    dispatch({ type: actionTypes.DELETE_INCOME, payload: res.data });
  } catch (error) {
    dispatch({ type: actionTypes.INCOME_ERROR });
  }
};

export const clearIncomes = () => {
  return { type: actionTypes.CLEAR_INCOMES };
};

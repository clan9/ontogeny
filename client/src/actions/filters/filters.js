import { actionTypes } from "../types";

export const setTextFilter = (text = "") => {
  return { type: actionTypes.SET_TEXT_FILTER, payload: text };
};

export const setStartDate = startDate => {
  return { type: actionTypes.SET_START_DATE, payload: startDate };
};

export const setEndDate = endDate => {
  return { type: actionTypes.SET_END_DATE, payload: endDate };
};

export const sortByAmount = () => {
  return { type: actionTypes.SORT_BY_AMOUNT };
};

export const sortByDate = () => {
  return { type: actionTypes.SORT_BY_DATE };
};

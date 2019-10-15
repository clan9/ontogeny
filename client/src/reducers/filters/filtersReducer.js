import moment from "moment";
import { actionTypes } from "../../actions/types";

const initialState = {
  text: "",
  sortBy: "date",
  startDate: moment().startOf("month"),
  endDate: moment().endOf("month")
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SET_TEXT_FILTER:
      return { ...state, text: payload };
    case actionTypes.SET_START_DATE:
      return { ...state, startDate: payload };
    case actionTypes.SET_END_DATE:
      return { ...state, endDate: payload };
    case actionTypes.SORT_BY_AMOUNT:
      return { ...state, sortBy: "amount" };
    case actionTypes.SORT_BY_DATE:
      return { ...state, sortBy: "date" };
    default:
      return state;
  }
};

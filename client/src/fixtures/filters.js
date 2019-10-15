import moment from "moment";

export const filters = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

export const altFilters = {
  text: "lunch",
  sortBy: "amount",
  startDate: moment(0),
  endDate: moment().add(3, "days")
};

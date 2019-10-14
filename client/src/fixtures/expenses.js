import moment from "moment";

export default [
  {
    _id: "1",
    description: "lunch",
    note: "",
    amount: 195,
    date: moment(0)
      .add(3, "days")
      .valueOf()
  },
  {
    _id: "2",
    description: "rent",
    note: "",
    amount: 59599,
    date: moment(0)
      .add(5, "days")
      .valueOf()
  },
  {
    _id: "3",
    description: "dinner",
    note: "",
    amount: 2500,
    date: moment(0)
      .subtract(3, "days")
      .valueOf()
  }
];

import moment from "moment";

export default [
  {
    _id: "1",
    description: "lunch",
    note: "",
    amount: 195,
    ownerName: "simon",
    date: moment(0)
      .add(3, "days")
      .valueOf()
  },
  {
    _id: "2",
    description: "rent",
    note: "",
    amount: 59599,
    ownerName: "jess",
    date: moment(0)
      .add(5, "days")
      .valueOf()
  },
  {
    _id: "3",
    description: "dinner",
    note: "",
    amount: 2500,
    ownerName: "lee",
    date: moment(0)
      .subtract(3, "days")
      .valueOf()
  }
];

import moment from "moment";

export default [
  {
    _id: "1",
    description: "project instalment",
    note: "",
    amount: 2000,
    ownerName: "simon",
    date: moment(0)
      .add(3, "days")
      .valueOf()
  },
  {
    _id: "2",
    description: "salary",
    note: "",
    amount: 59599,
    ownerName: "jess",
    date: moment(0)
      .add(5, "days")
      .valueOf()
  },
  {
    _id: "3",
    description: "project complete",
    note: "",
    amount: 99500,
    ownerName: "lee",
    date: moment(0)
      .subtract(3, "days")
      .valueOf()
  }
];

const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new Schema({
  description: {
    type: String,
    required: true,
    default: "",
  },
  note: {
    type: String,
    default: "",
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  ownerName: {
    type: String,
    required: true,
  },
});

const Expenses = mongoose.model("Expenses", expenseSchema);
module.exports = Expenses;

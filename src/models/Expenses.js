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
    type: mongoose.Schema.Types.ObjectId(),
    required: true,
    ref: "Users",
  },
});

const Expenses = new mongoose.Model("Expenses", expenseSchema);
module.exports = Expenses;

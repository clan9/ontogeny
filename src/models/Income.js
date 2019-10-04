const mongoose = require("mongoose");
const { Schema } = mongoose;

const incomeSchema = new Schema({
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

const Income = new mongoose.Model("Income", incomeSchema);
module.exports = Income;

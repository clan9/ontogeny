const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/User");
const Expenses = require("../../src/models/Expenses");
const Income = require("../../src/models/Income");
const keys = require("../../src/config/keys");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Simon",
  email: "s@test.com",
  password: "sim123",
  isAdmin: true,
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, keys.secret),
    },
    {
      token: "random rubbish to differentiate this token from first one!",
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "Lee",
  email: "l@test.com",
  password: "lee123",
  isAdmin: false,
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, keys.secret),
    },
    {
      token: "random rubbish to differentiate this token from first one!",
    },
  ],
};

const expenseOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "Expense 1",
  note: "Test note 1",
  amount: 123,
  date: Date.now(),
  owner: userOneId,
  ownerName: "Simon",
};

const expenseTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Expense 2",
  note: "Test note 2",
  amount: 234,
  date: Date.now(),
  owner: userOneId,
  ownerName: "Simon",
};

const expenseThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Expense 1 for lee",
  note: "Test note 1 for lee",
  amount: 223,
  date: Date.now(),
  owner: userTwoId,
  ownerName: "Lee",
};

const incomeOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "Income 1",
  note: "Income Test note 1",
  amount: 123,
  date: Date.now(),
  owner: userOneId,
  ownerName: "Simon",
};

const incomeTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Income 2",
  note: "Income Test note 2",
  amount: 234,
  date: Date.now(),
  owner: userOneId,
  ownerName: "Simon",
};

const incomeThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Income 1 for lee",
  note: "Income Test note 1 for lee",
  amount: 223,
  date: Date.now(),
  owner: userTwoId,
  ownerName: "Lee",
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Expenses.deleteMany();
  await Income.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Expenses(expenseOne).save();
  await new Expenses(expenseTwo).save();
  await new Expenses(expenseThree).save();
  await new Income(incomeOne).save();
  await new Income(incomeTwo).save();
  await new Income(incomeThree).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  expenseOne,
  expenseTwo,
  expenseThree,
  incomeOne,
  incomeTwo,
  incomeThree,
  setupDatabase,
};

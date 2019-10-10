const Expenses = require("../models/Expenses");
const User = require("../models/User");

exports.addExpense = async (req, res) => {
  const user = await User.findById(req.user._id);

  const expense = new Expenses({
    ...req.body,
    owner: req.user._id,
    ownerName: user.name,
  });

  try {
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).send();
  }
};

exports.editExpense = async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);

  try {
    const expense = await Expenses.findOne({ _id, owner: req.user._id });

    if (!expense) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      expense[update] = req.body[update];
    });
    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(400).send();
  }
};

exports.getExpense = async (req, res) => {
  const _id = req.params.id;

  try {
    const expense = await Expenses.findOne({ _id, owner: req.user._id });

    if (!expense) {
      res.status(404).send();
    }

    res.json(expense);
  } catch (error) {
    res.status(500).send();
  }
};

exports.deleteExpense = async (req, res) => {
  const _id = req.params.id;

  try {
    const expense = await Expenses.findOne({ _id, owner: req.user._id });

    if (!expense) {
      return res.status(404).send();
    }

    await expense.remove();
    res.json(expense);
  } catch (error) {
    res.status(500).send();
  }
};

exports.listAllExpenses = async (req, res) => {
  try {
    const expenses = await Expenses.find();

    if (!expenses) {
      return res.status(404).send();
    }

    res.json(expenses);
  } catch (error) {
    res.status(500).send();
  }
};

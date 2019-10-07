const Expenses = require("../models/Expenses");

exports.addExpense = async (req, res) => {
  const expense = new Expenses({
    ...req.body,
    owner: req.user._id,
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

const Income = require("../models/Income");
const User = require("../models/User");

exports.addIncome = async (req, res) => {
  const user = await User.findById(req.user._id);

  const income = new Income({
    ...req.body,
    owner: req.user._id,
    ownerName: user.name
  });

  try {
    await income.save();
    res.status(201).json(income);
  } catch (error) {
    res.status(400).send();
  }
};

exports.editIncome = async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);

  try {
    const income = await Income.findOne({ _id, owner: req.user._id });
    if (!income) {
      return res.status(404).send();
    }

    updates.forEach(update => {
      income[update] = req.body[update];
    });
    await income.save();
    res.json(income);
  } catch (error) {
    res.status(400).send();
  }
};

// exports.getIncome = async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const income = await Income.findOne({ _id, owner: req.user._id });

//     if (!income) {
//       res.status(404).send();
//     }

//     res.json(income);
//   } catch (error) {
//     res.status(500).send();
//   }
// };

exports.deleteIncome = async (req, res) => {
  const _id = req.params.id;

  try {
    const income = await Income.findOne({ _id, owner: req.user._id });

    if (!income) {
      return res.status(404).send();
    }

    await income.remove();
    res.json(income);
  } catch (error) {
    res.status(500).send();
  }
};

exports.listAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find();

    if (!incomes) {
      return res.status(404).send();
    }

    res.json(incomes);
  } catch (error) {
    res.status(500).send();
  }
};

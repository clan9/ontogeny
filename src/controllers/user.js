const User = require("../models/User");

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (error) {
    res.status(400).send();
  }
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await new User({ name, email, password });
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token,
    );
    await req.user.save();
    res.json({ msg: "Logged out" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.json({ msg: "You are now logged out on all devices" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getUserExpenses = async (req, res) => {
  try {
    await req.user.populate({ path: "expenses" }).execPopulate();

    res.json(req.user.expenses);
  } catch (error) {
    res.status(500).send();
  }
};

exports.getUserIncomes = async (req, res) => {
  try {
    await req.user.populate({ path: "income" }).execPopulate();

    res.json(req.user.income);
  } catch (error) {
    res.status(500).send();
  }
};

exports.toggleIsAdmin = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send();
    }

    user.isAdmin = !user.isAdmin;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).send();
  }
};

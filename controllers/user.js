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
    req.user.tokens = [];
    await req.user.save();
    res.json({ msg: "Logged out" });
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

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const userIsAdmin = user.isAdmin;
    const adminUsers = await User.find({ isAdmin: true });
    const adminUsersCount = adminUsers.length;

    if (!user) {
      return res.status(404).json({ msg: "Not found" });
    }

    if (userIsAdmin && adminUsersCount === 1) {
      return res.status(403).json({
        msg: "There has to be at least one user with Admin access.",
      });
    }

    await user.remove();
    res.redirect(200, "/");
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// ADMIN ROUTES:

exports.signinAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    if (user.isAdmin) {
      const token = await user.generateAuthToken();
      return res.json({ user, token });
    }
    res.status(401).send();
  } catch (error) {
    res.status(400).send();
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).send();
    }

    res.json(users);
  } catch (error) {
    res.status(500).send();
  }
};

exports.toggleIsAdmin = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    const adminUsers = await User.find({ isAdmin: true });
    const adminUsersCount = adminUsers.length;

    if (!user) {
      return res.status(404).json({ msg: "Not Found" });
    }

    // If the admin user tries to remove their own access
    // Check if they are the only admin user -> if so, send error
    // If not, remove access
    if (user._id.toString() === req.user._id.toString()) {
      if (adminUsersCount === 1) {
        return res.status(403).json({
          msg: "There has to be at least one user with Admin access.",
        });
      }
      user.isAdmin = !user.isAdmin;
      await user.save();
      const users = await User.find();
      return res.json(users);
    }

    // The admin user is toggling admin access for another user:
    user.isAdmin = !user.isAdmin;
    await user.save();
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.adminDeleteUser = async (req, res) => {
  const { id } = req.params;
  const adminId = req.user._id;
  try {
    const userToDelete = await User.findById(id);
    const adminUsers = await User.find({ isAdmin: true });
    const adminUsersCount = adminUsers.length;

    if (!userToDelete) {
      return res.status(404).json({ msg: "Not Found" });
    }

    // If the admin user tries to delete their own account
    // Check if they are the only admin user -> if so, send error
    // If not, delete account
    if (userToDelete._id.toString() === adminId.toString()) {
      if (adminUsersCount === 1) {
        return res.status(403).json({
          msg: "There has to be at least one user with Admin access.",
        });
      }
      await userToDelete.remove();
      return res.json(userToDelete);
    }

    await userToDelete.remove();
    res.json(userToDelete);
  } catch (error) {
    res.status(500).send();
  }
};

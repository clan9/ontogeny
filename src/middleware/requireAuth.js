const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, keys.secret);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Please authenticate" });
  }
};

module.exports = requireAuth;

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;
const Expenses = require("./Expenses");
const Income = require("./Income");
const keys = require("../config/keys");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Virtual properties to enable use of populate method to pull data through
userSchema.virtual("expenses", {
  ref: "Expenses",
  localField: "_id",
  foreignField: "owner",
});

userSchema.virtual("income", {
  ref: "Income",
  localField: "_id",
  foreignField: "owner",
});

// userSchema.methods are methods used on the instance
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, keys.secret, {
    expiresIn: "8h",
  });

  user.tokens = [...user.tokens, { token }];
  await user.save();
  return token;
};

// userSchema.statics are methods used on the model
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// Mongoose middleware

// Hash the plaintext password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
    } catch (error) {
      next(error);
    }
  }
  next();
});

// Delete users expenses and income data when account is deleted
userSchema.pre("remove", async function (next) {
  const user = this;
  await Expenses.deleteMany({ owner: user._id });
  await Income.deleteMany({ owner: user._id });
  next();
});

// Create User model
const User = mongoose.model("Users", userSchema);
module.exports = User;

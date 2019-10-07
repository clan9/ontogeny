const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const UserController = require("../controllers/user");

const router = express.Router();

// @route   POST /api/user/signin
// @desc    signin an existing user
// @access  Public
router.post("/signin", UserController.signin);

// @route   POST /api/user/signup
// @desc    signup a new user
// @access  Public
router.post("/signup", UserController.signup);

// @route   POST /api/user/logout
// @desc    logout user on one device
// @access  Private
router.post("/logout", requireAuth, UserController.logout);

// *** NOT SURE ABOUT INCORPORATING THIS ROUTE ***
// @route   POST /api/user/logoutAll
// @desc    logout user on all devices
// @access  Private
router.post("/logoutAll", requireAuth, UserController.logoutAll);

// @route   GET /api/user/listExpenses
// @desc    List all expenses for a user
// @access  Private
router.get("/listExpenses", requireAuth, UserController.getUserExpenses);

// @route   GET /api/user/listIncomes
// @desc    list all incomes for a user
// @access  Private
router.get("/listIncomes", requireAuth, UserController.getUserIncomes);

module.exports = router;

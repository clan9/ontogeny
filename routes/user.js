const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const requireAdmin = require("../middleware/requireAdmin");
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
// @desc    logout user
// @access  Private
router.post("/logout", requireAuth, UserController.logout);

// @route   GET /api/user/listExpenses
// @desc    List all expenses for a user
// @access  Private
router.get("/listExpenses", requireAuth, UserController.getUserExpenses);

// @route   GET /api/user/listIncomes
// @desc    list all incomes for a user
// @access  Private
router.get("/listIncomes", requireAuth, UserController.getUserIncomes);

// @route   DELETE /api/user
// @desc    delete a user (and remove expenses & incomes)
// @access  Private
router.delete("/", requireAuth, UserController.deleteUser);

// ADMIN ROUTES:

// @route   POST /api/user/signinAdmin
// @desc    signin an existing user with admin priviledges
// @access  Public
router.post("/signinAdmin", UserController.signinAdmin);

// @route   GET /api/user/listUsers
// @desc    get a list of all user names & email addresses
// @access  Private & Admin
router.get("/listUsers", requireAuth, requireAdmin, UserController.getUsers);

// @route   PATCH /api/user/toggleAdmin
// @desc    toggle Admin access for a user
// @access  Private & Admin
router.patch(
  "/toggleAdmin",
  requireAuth,
  requireAdmin,
  UserController.toggleIsAdmin
);

// @route   DELETE /api/user/adminDeleteUser/:id
// @desc    Logged in admin user deleting a user
// @access  Private & Admin
router.delete(
  "/adminDeleteUser/:id",
  requireAuth,
  requireAdmin,
  UserController.adminDeleteUser
);

module.exports = router;

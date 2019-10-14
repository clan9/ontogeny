const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const requireAdmin = require("../middleware/requireAdmin");
const ExpensesController = require("../controllers/expenses");

const router = express.Router();

// @route   GET /api/expenses/all
// @desc    list expenses for all users
// @access  Private & Admin
router.get(
  "/all",
  requireAuth,
  requireAdmin,
  ExpensesController.listAllExpenses,
);

// @route   GET /api/expenses/:id
// @desc    get an expense
// @access  Private
// *** NOT NEEDED ?? ***
// router.get("/:id", requireAuth, ExpensesController.getExpense);

// @route   POST /api/expenses
// @desc    add an expense
// @access  Private
router.post("/", requireAuth, ExpensesController.addExpense);

// @route   PATCH /api/expenses/:id
// @desc    edit an expense
// @access  Private
router.patch("/:id", requireAuth, ExpensesController.editExpense);

// @route   DELETE /api/expenses/:id
// @desc    delete an expense
// @access  Private
router.delete("/:id", requireAuth, ExpensesController.deleteExpense);

module.exports = router;

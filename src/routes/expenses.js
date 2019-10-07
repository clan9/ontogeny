const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const ExpensesController = require("../controllers/expenses");

const router = express.Router();

// @route   POST /api/expenses
// @desc    add an expense
// @access  Private
router.post("/", requireAuth, ExpensesController.addExpense);

// @route   PATCH /api/expenses/:id
// @desc    edit an expense
// @access  Private
router.patch("/:id", requireAuth, ExpensesController.editExpense);

// @route   GET /api/expenses/:id
// @desc    get an expense
// @access  Private
router.get("/:id", requireAuth, ExpensesController.getExpense);

// @route   DELETE /api/expenses/:id
// @desc    delete an expense
// @access  Private
router.delete("/:id", requireAuth, ExpensesController.deleteExpense);

module.exports = router;

const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const IncomeController = require("../controllers/income");

const router = express.Router();

// @route   POST /api/income
// @desc    add an income
// @access  Private
router.post("/", requireAuth, IncomeController.addIncome);

// @route   PATCH /api/income/:id
// @desc    edit an income
// @access  Private
router.patch("/:id", requireAuth, IncomeController.editIncome);

// @route   GET /api/income/:id
// @desc    get an income
// @access  Private
router.get("/:id", requireAuth, IncomeController.getIncome);

// @route   DELETE /api/income/:id
// @desc    delete an income
// @access  Private
router.delete("/:id", requireAuth, IncomeController.deleteIncome);

module.exports = router;

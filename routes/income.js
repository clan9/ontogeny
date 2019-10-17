const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const requireAdmin = require("../middleware/requireAdmin");
const IncomeController = require("../controllers/income");

const router = express.Router();

// @route   GET /api/income/all
// @desc    list expenses for all users
// @access  Private & Admin
router.get("/all", requireAuth, requireAdmin, IncomeController.listAllIncomes);

// // @route   GET /api/income/:id
// // @desc    get an income
// // @access  Private
// router.get("/:id", requireAuth, IncomeController.getIncome);

// @route   POST /api/income
// @desc    add an income
// @access  Private
router.post("/", requireAuth, IncomeController.addIncome);

// @route   PATCH /api/income/:id
// @desc    edit an income
// @access  Private
router.patch("/:id", requireAuth, IncomeController.editIncome);

// @route   DELETE /api/income/:id
// @desc    delete an income
// @access  Private
router.delete("/:id", requireAuth, IncomeController.deleteIncome);

module.exports = router;

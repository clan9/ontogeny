const request = require("supertest");
const app = require("../app");
const Expenses = require("../models/Expenses");
const {
  userOne,
  userTwo,
  expenseOne,
  expenseTwo,
  expenseThree,
  setupDatabase,
} = require("./fixtures/db");

describe("Expenses routes", () => {
  beforeEach(setupDatabase);

  it("Should add a new expense for logged in user", async () => {
    const newExpense = {
      description: "Test new expense",
      note: "Note added",
      amount: 123,
    };
    const response = await request(app)
      .post("/api/expenses")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send(newExpense)
      .expect(201);

    // Assert new expense added to db
    const expense = await Expenses.findById(response.body._id);
    expect(expense).not.toBeNull();
  });

  it("Should not add a new expense for a user with no auth token", async () => {
    const newExpense = {
      description: "Test new expense",
      note: "Note added",
      amount: 123,
    };

    await request(app)
      .post("/api/expenses")
      .send(newExpense)
      .expect(401);
  });

  it("Should fetch an expense by id", async () => {
    const response = await request(app)
      .get(`/api/expenses/${expenseOne._id}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    // Assert correct expense returned
    expect(response.body.description).toBe("Expense 1");
  });

  it("Should NOT fetch an expense that does not belong to a user", async () => {
    await request(app)
      .get(`/api/expenses/${expenseOne._id}`)
      .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
      .send()
      .expect(404);
  });

  it("Should NOT fetch a users expense if user does not have an auth token", async () => {
    await request(app)
      .get(`/api/expenses/${expenseOne._id}`)
      .send()
      .expect(401);
  });

  it("Should edit an expense that belongs to a user", async () => {
    const updates = { description: "Updated desc", amount: 765 };
    await request(app)
      .patch(`/api/expenses/${expenseTwo._id}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send(updates)
      .expect(200);

    // Assert expense updated correctly in db
    const expense = await Expenses.findById(expenseTwo._id);
    expect(expense.description).toBe(updates.description);
    expect(expense.amount).toBe(updates.amount);
  });

  it("Should not edit a users expense if they have no auth token", async () => {
    const updates = { description: "Updated desc", amount: 765 };
    await request(app)
      .patch(`/api/expenses/${expenseTwo._id}`)
      .send(updates)
      .expect(401);
  });

  it("Should not edit an expense that does not belong to a user", async () => {
    const updates = { description: "Updated desc", amount: 765 };
    await request(app)
      .patch(`/api/expenses/${expenseThree._id}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send(updates)
      .expect(404);
  });

  it("Should delete an expense", async () => {
    await request(app)
      .delete(`/api/expenses/${expenseTwo._id}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    // Assert that expense has been removed from db
    const expense = await Expenses.findById(expenseTwo._id);
    expect(expense).toBeNull();
  });

  it("Should NOT delete an expense for a user with no auth token", async () => {
    await request(app)
      .delete(`/api/expenses/${expenseTwo._id}`)
      .send()
      .expect(401);
  });

  it("Should NOT delete an expense that does not belong to a user", async () => {
    await request(app)
      .delete(`/api/expenses/${expenseThree._id}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(404);
  });

  it("Should return all expenses for each user for admin user", async () => {
    const response = await request(app)
      .get("/api/expenses/all")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    // Assert that response body is array of all expenses (there are 3)
    expect(response.body.length).toBe(3);
  });

  it("Should NOT return all expenses for each user for NON-admin user", async () => {
    await request(app)
      .get("/api/expenses/all")
      .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
      .send()
      .expect(401);
  });
});

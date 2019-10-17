const request = require("supertest");
const app = require("../app");
const Income = require("../models/Income");
const {
  userOne,
  userTwo,
  incomeOne,
  incomeTwo,
  incomeThree,
  setupDatabase,
} = require("./fixtures/db");

describe("Income routes", () => {
  beforeEach(setupDatabase);

  it("Should add a new income for logged in user", async () => {
    const newIncome = {
      description: "Test new income",
      note: "Note added",
      amount: 123,
    };
    const response = await request(app)
      .post("/api/income")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send(newIncome)
      .expect(201);

    // Assert new income added to db
    const income = await Income.findById(response.body._id);
    expect(income).not.toBeNull();
  });

  it("Should not add a new income for a user with no auth token", async () => {
    const newIncome = {
      description: "Test new income",
      note: "Note added",
      amount: 123,
    };

    await request(app)
      .post("/api/income")
      .send(newIncome)
      .expect(401);
  });

  // it("Should fetch an income by id", async () => {
  //   const response = await request(app)
  //     .get(`/api/income/${incomeOne._id}`)
  //     .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
  //     .send()
  //     .expect(200);

  //   // Assert correct income returned
  //   expect(response.body.description).toBe("Income 1");
  // });

  // it("Should NOT fetch an expense that does not belong to a user", async () => {
  //   await request(app)
  //     .get(`/api/income/${incomeOne._id}`)
  //     .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
  //     .send()
  //     .expect(404);
  // });

  // it("Should NOT fetch a users income if user does not have an auth token", async () => {
  //   await request(app)
  //     .get(`/api/income/${incomeOne._id}`)
  //     .send()
  //     .expect(401);
  // });

  it("Should edit an income that belongs to a user", async () => {
    const updates = { description: "Updated desc", amount: 765 };
    await request(app)
      .patch(`/api/income/${incomeTwo._id}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send(updates)
      .expect(200);

    // Assert income updated correctly in db
    const income = await Income.findById(incomeTwo._id);
    expect(income.description).toBe(updates.description);
    expect(income.amount).toBe(updates.amount);
  });

  it("Should not edit a users income if they have no auth token", async () => {
    const updates = { description: "Updated desc", amount: 765 };
    await request(app)
      .patch(`/api/income/${incomeTwo._id}`)
      .send(updates)
      .expect(401);
  });

  it("Should not edit an income that does not belong to a user", async () => {
    const updates = { description: "Updated desc", amount: 765 };
    await request(app)
      .patch(`/api/income/${incomeThree._id}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send(updates)
      .expect(404);
  });

  it("Should delete an income", async () => {
    await request(app)
      .delete(`/api/income/${incomeTwo._id}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    // Assert that income has been removed from db
    const income = await Income.findById(incomeTwo._id);
    expect(income).toBeNull();
  });

  it("Should NOT delete an income for a user with no auth token", async () => {
    await request(app)
      .delete(`/api/income/${incomeTwo._id}`)
      .send()
      .expect(401);
  });

  it("Should NOT delete an income that does not belong to a user", async () => {
    await request(app)
      .delete(`/api/income/${incomeThree._id}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(404);
  });

  it("Should return all incomes for each user for admin user", async () => {
    const response = await request(app)
      .get("/api/income/all")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    // Assert that response body is array of all incomes (there are 3)
    expect(response.body.length).toBe(3);
  });

  it("Should NOT return all incomes for each user for NON-admin user", async () => {
    await request(app)
      .get("/api/income/all")
      .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
      .send()
      .expect(401);
  });
});

const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const Expenses = require("../models/Expenses");
const Income = require("../models/Income");
const {
  userOne,
  userOneId,
  userTwo,
  userTwoId,
  setupDatabase
} = require("./fixtures/db");

describe("User routes tests", () => {
  beforeEach(setupDatabase);

  it("Should sign up a new user", async () => {
    const response = await request(app)
      .post("/api/user/signup")
      .send({
        name: "Jess",
        email: "jess@test.com",
        password: "grumpyCat"
      })
      .expect(201);

    // Assert that db was updated
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assert password has not been saved as plaintext
    expect(user.password).not.toBe("grumpyCat");
  });

  it("Should NOT sign up a new user with invalid email", async () => {
    await request(app)
      .post("/api/user/signup")
      .send({
        name: "Jess",
        email: "Jess123",
        password: "grumpyCat"
      })
      .expect(400);
  });

  it("Should NOT sign up a new user with invalid password", async () => {
    await request(app)
      .post("/api/user/signup")
      .send({
        name: "Jess",
        email: "jess@test.com",
        password: "grump"
      })
      .expect(400);
  });

  it("Should log in an existing user", async () => {
    await request(app)
      .post("/api/user/signin")
      .send({
        email: userOne.email,
        password: userOne.password
      })
      .expect(200);
  });

  it("Should not login a non-existing user", async () => {
    await request(app)
      .post("/api/user/signin")
      .send({
        email: "random@test.com",
        password: "notAUser"
      })
      .expect(400);
  });

  it("Should list expenses for a user", async () => {
    const response = await request(app)
      .get("/api/user/listExpenses")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    // Check length of returned expenses array
    expect(response.body.length).toBe(2);
  });

  it("Should not list expenses for unauthorized user", async () => {
    await request(app)
      .get("/api/user/listExpenses")
      .send()
      .expect(401);
  });

  it("Should list incomes for a user", async () => {
    const response = await request(app)
      .get("/api/user/listIncomes")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    // Check length of returned incomes array
    expect(response.body.length).toBe(2);
  });

  it("Should not list incomes for unauthorized user", async () => {
    await request(app)
      .get("/api/user/listIncomes")
      .send()
      .expect(401);
  });

  it("Should toggle the isAdmin property for another user when user who is submitting request has admin priviledges", async () => {
    await request(app)
      .patch("/api/user/toggleAdmin")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        email: userTwo.email
      })
      .expect(200);

    // Assert that the user is now an Admin user
    const user = await User.findOne({ email: userTwo.email });
    expect(user.isAdmin).toBe(true);
  });

  it("should NOT toggle the isAdmin property if the admin user submitting the request is trying to remove their own access", async () => {
    await request(app)
      .patch("/api/user/toggleAdmin")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        email: userOne.email
      })
      .expect(400);

    // Assert that user is still an admin user
    const user = await User.findOne({ email: userOne.email });
    expect(user.isAdmin).toBe(true);
  });

  it("Should NOT toggle the isAdmin property for another user when user who is submitting request does NOT HAVE admin priviledges", async () => {
    await request(app)
      .patch("/api/user/toggleAdmin")
      .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
      .send({
        email: userOne.email
      })
      .expect(401);
  });

  it("Should logout a user", async () => {
    const response = await request(app)
      .post("/api/user/logout")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    // Assert logout message received
    expect(response.body.msg).toBe("Logged out");

    // Assert that user tokens array is empty
    const user = await User.findById(userOneId);
    expect(user.tokens.length).toEqual(0);
  });

  it("Should delete a user, along with their expenses and incomes", async () => {
    await request(app)
      .delete("/api/user")
      .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
      .send()
      .expect(200);

    // Assert correct user was deleted from sb
    const user = await User.findById(userTwoId);
    expect(user).toBeNull();

    // Assert users expenses were removed
    const expenses = await Expenses.find({ ownerName: "Lee" });
    expect(expenses).toEqual([]);

    // Assert user incomes were removed
    const incomes = await Income.find({ ownerName: "Lee" });
    expect(incomes).toEqual([]);
  });

  it("Should NOT delete a user with no auth token", async () => {
    await request(app)
      .delete("/api/user")
      .send()
      .expect(401);
  });
});

// it("Should logout a user on all devices", async () => {
//   const response = await request(app)
//     .post("/api/user/logoutAll")
//     .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
//     .send()
//     .expect(200);

//   // Assert logout message received
//   expect(response.body.msg).toBe("You are now logged out on all devices");

//   // Assert that all auth tokens removed from the instance tokens arrray
//   const user = await User.findById(userOneId);
//   expect(user.tokens.length).toBe(0);
// });

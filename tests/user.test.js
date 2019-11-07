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
        name: "jess",
        email: "jess@test.com",
        password: "grumpyCat"
      })
      .expect(201);

    // Assert that db was updated and name was capitalised
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();
    expect(user.name).toBe('Jess');

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

  it("should return a list of users for authorized user", async () => {
    const response = await request(app)
      .get("/api/user/listUsers")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    // Assert that correct data is returned
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe("Simon");
    expect(response.body[1].name).toBe("Lee");
  });

  it("Should NOT return list of users details for someone who does not have admin access", async () => {
    await request(app)
      .get("/api/user/listUsers")
      .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
      .send()
      .expect(401);
  });

  it("Should toggle the isAdmin property for another user when user who is submitting request has admin priviledges", async () => {
    const response = await request(app)
      .patch("/api/user/toggleAdmin")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        email: userTwo.email
      })
      .expect(200);

    // Assert that the user is now an Admin user
    const user = await User.findOne({ email: userTwo.email });
    expect(user.isAdmin).toBe(true);

    // Assert that a list of all users is returned
    expect(response.body.length).toBe(2);
  });

  it("should NOT toggle the isAdmin property if the admin user submitting the request is trying to remove their own access and they are the only admin user set up", async () => {
    await request(app)
      .patch("/api/user/toggleAdmin")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        email: userOne.email
      })
      .expect(403);

    // Assert that user is still an admin user
    const user = await User.findOne({ email: userOne.email });
    expect(user.isAdmin).toBe(true);
  });

  it("should allow an admin user to remove their own admin access if they are not the only user to have admin access", async () => {
    // setup userTwo with admin access
    await request(app)
      .patch("/api/user/toggleAdmin")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        email: userTwo.email
      })
      .expect(200);

    // now as userOne, remove your own admin access
    await request(app)
      .patch("/api/user/toggleAdmin")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        email: userOne.email
      })
      .expect(200);

    // Assert that admin access has been removed
    const user = await User.findOne({ email: userOne.email });
    expect(user.isAdmin).toBe(false);
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

    // Assert correct user was deleted from db
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

  it("should NOT delete a user if they are the sole user with admin access", async () => {
    await request(app)
      .delete("/api/user")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(403);
  });

  it("should allow admin user to delete another user account", async () => {
    await request(app)
      .delete(`/api/user/adminDeleteUser/${userTwoId}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
  });

  it("should NOT allow admin user to delete their own account if they are the only user with admin access", async () => {
    await request(app)
      .delete(`/api/user/adminDeleteUser/${userOneId}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(403);
  });

  it("should allow admin user to delete their own account if they are NOT the only user with admin access", async () => {
    // setup userTwo with admin access
    await request(app)
      .patch("/api/user/toggleAdmin")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({ email: userTwo.email })
      .expect(200);

    // now as userOne, delete your account
    await request(app)
      .delete(`/api/user/adminDeleteUser/${userOneId}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    // Assert correct user was deleted from db
    const user = await User.findById(userOneId);
    expect(user).toBeNull();

    // Assert users expenses were removed
    const expenses = await Expenses.find({ ownerName: "Simon" });
    expect(expenses).toEqual([]);

    // Assert user incomes were removed
    const incomes = await Income.find({ ownerName: "Simon" });
    expect(incomes).toEqual([]);
  });
});

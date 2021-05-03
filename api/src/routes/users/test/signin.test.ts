import request from "supertest";
import { app } from "../../../app";
import { User } from "../../../models/user";

// user
const user = {
  firstName: "name",
  lastName: "lastname",
  company: "Company",
  email: "mr.bonilla99@gmail.com",
  password: "123123123",
};

beforeAll(async () => {
  // creates a user
  await request(app)
    .post("/api/users/signup")
    .send({
      ...user,
    })
    .expect(201);
});

it("Sign in with valid credentials", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: user.email,
      password: user.password,
    })
    .expect(200);
});

it("login in wrong credentials", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: user.email,
      password: "123",
    })
    .expect(400);
});

it("login with invalid email", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "email",
      password: user.password,
    })
    .expect(400);
});

it("login with invalid form", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: user.email,
    })
    .expect(400);
});

afterAll(async () => {
  User.remove({}, () => {
    return;
  });
});

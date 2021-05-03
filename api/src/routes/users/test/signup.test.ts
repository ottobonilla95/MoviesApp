import request from "supertest";
import { app } from "../../../app";
import { User } from "../../../models/user";

const user = {
  firstName: "NAME_SIGNUP",
  lastName: "LASTNAME_SIGNUP",
  company: "COMPANY_SIGNUP",
  email: "mr.bonillaSINGUP@gmail.com",
  password: "123123123",
};

afterEach(async () => {
  User.remove({}, () => {
    return;
  });
});

// normal signup
it("Sign up", () => {
  return request(app)
    .post("/api/users/signup")
    .send({ ...user })
    .expect((res) => {
      // check body
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("user");
      expect(res.body).toHaveProperty("token");

      // check user object
      expect(res.body.user.id).toBeTruthy();
      expect(res.body.user.firstName).toEqual(user.firstName);
      expect(res.body.user.lastName).toEqual(user.lastName);
      expect(res.body.user.email).toEqual(user.email);
      expect(res.body.user.company).toEqual(user.company);
      expect(res.body.user.password).toBeUndefined();
    })
    .expect(201);
});

it("Sign up with a incomplete form", () => {
  return request(app)
    .post("/api/users/signup")
    .send({ ...user, firstName: undefined })
    .expect(400);
});

it("Sign up with a wrong email", () => {
  return request(app)
    .post("/api/users/signup")
    .send({ ...user, email: "email" })
    .expect(400);
});

it("Sign up with a existinig email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ ...user })
    .expect(201);

  return request(app)
    .post("/api/users/signup")
    .send({ ...user })
    .expect(400);
});

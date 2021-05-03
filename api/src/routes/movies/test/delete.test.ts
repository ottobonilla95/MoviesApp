import request from "supertest";

// app
import { app } from "../../../app";
import { User } from "../../../models/user";
import { registeredUser, userToRegister } from "../../users/test/models";

// mock clodinary
jest.mock("../../../services/Cloudinary");

// movie
const movie = {
  name: "name",
  description: "description",
  image: "image",
};

// user
const user: userToRegister = {
  firstName: "name",
  lastName: "lastname",
  company: "Company",
  email: "mr.bonilla99@gmail.com",
  password: "123123123",
};

let finalUser: registeredUser;
let token: string;

beforeAll(async () => {
  // creates a user
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      ...user,
    })
    .expect(201);

  finalUser = response.body.user;
  token = response.body.token;
});

// delete user
afterAll(async () => {
  User.remove({}, () => {
    return;
  });
});

it("delete a movie", async () => {
  // create a movie
  const response = await request(app)
    .post("/api/movies")
    .auth(token, { type: "bearer" })
    .send({ ...movie })
    .expect(201);

  // delete movie
  await request(app)
    .delete(`/api/movies/${response.body.movie.id}`)
    .auth(token, { type: "bearer" })
    .expect(200);
});

it("try to delete a movie without proper objectId", async () => {
  await request(app)
    .delete(`/api/movies/123`)
    .auth(token, { type: "bearer" })
    .expect(400);
});

it("try to delete a movie without authorization header", async () => {
  await request(app).delete(`/api/movies/507f1f77bcf86cd799439011`).expect(401);
});

it("try to delete a movie that does not exists in the db", async () => {
  await request(app)
    .delete(`/api/movies/507f1f77bcf86cd799439011`)
    .auth(token, { type: "bearer" })
    .expect(404);
});

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

afterAll(async () => {
  User.remove({}, () => {
    return;
  });
});

it("creates a movie", async () => {
  await request(app)
    .post("/api/movies")
    .auth(token, { type: "bearer" })
    .send({ ...movie })
    .expect(201)
    .expect((res) => {
      expect(res.body.message).toBeTruthy();
      expect(res.body.movie).toBeTruthy();

      expect(res.body.movie.name).toBe(movie.name);
      expect(res.body.movie.description).toBe(movie.description);
      expect(res.body.movie.image).toBe(movie.image);
      expect(res.body.movie.userId).toBe(finalUser.id);
    });
});

it("try to create a movie with incomplete form", async () => {
  await request(app)
    .post("/api/movies")
    .auth(token, { type: "bearer" })
    .send({ ...movie, name: undefined })
    .expect(400);
});

it("try to create a movie without authentication", async () => {
  await request(app)
    .post("/api/movies")
    .send({ ...movie })
    .expect(401);
});

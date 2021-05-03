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

  // create a movie
  await request(app)
    .post("/api/movies")
    .auth(token, { type: "bearer" })
    .send({ ...movie })
    .expect(201);
});

afterAll(async () => {
  User.remove({}, () => {
    return;
  });
});

it("get all movies", async () => {
  await request(app)
    .get("/api/movies/all")
    .auth(token, { type: "bearer" })
    .expect((res) => {
      expect(res.body.movies.length).toBe(1);

      expect(res.body.movies[0].name).toBe(movie.name);
      expect(res.body.movies[0].description).toBe(movie.description);
      expect(res.body.movies[0].image).toBe(movie.image);
      expect(res.body.movies[0].userId).toBe(finalUser.id);
    })
    .expect(200);
});

it("get all movies without authorization header", async () => {
  await request(app).get("/api/movies/all").expect(401);
});

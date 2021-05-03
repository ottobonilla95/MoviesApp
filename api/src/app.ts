import express, { Application, Request, Response } from "express";
import "express-async-errors";

// cors
var cors = require("cors");

// bodyParser
var bodyParser = require("body-parser");

// // // // routes // // // //
// user
import { userSignUpRouter } from "./routes/users/signup";
import { userSignInRouter } from "./routes/users/signin";
import { userSignOutRouter } from "./routes/users/signout";

// fmovies
import { getAllMovies } from "./routes/movies/get-all";
import { newMovie } from "./routes/movies/new";
import { deleteMovie } from "./routes/movies/delete";

// errors
import { errorHandler } from "./middlewares/error-handler";

const app: Application = express();

// middlewares
app.use(cors());

// app.set("trust proxy", 1);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// // // // routes // // // //
app.get("/test", (req: Request, res: Response) =>
  res.send({ message: "welcome" })
);
// user
app.use(userSignUpRouter);
app.use(userSignInRouter);
app.use(userSignOutRouter);

// movies
app.use(getAllMovies);
app.use(newMovie);
app.use(deleteMovie);

// error middleware
app.use(errorHandler);

export { app };

import express, { Request, Response } from "express";

// middlewares
import { requireAuth } from "../../middlewares/require-auth";
import { currentUser } from "../../middlewares/current-user-middleware";

// model
import { Movie } from "../../models/movie";

const router = express.Router();

router.get(
  "/api/movies/all",
  currentUser,
  requireAuth,

  (req: Request, res: Response) => {
    Movie.find({}, function (err, movies) {
      res.send({ movies });
    });
  }
);

export { router as getAllMovies };

import express, { Request, Response } from "express";

// model
import { Movie } from "../../models/movie";

// middlewares
import { currentUser } from "../../middlewares/current-user-middleware";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validation-request-middleware";

// validate express
import { param } from "express-validator";

// errors
import { DatabaseError } from "../../errors/database-error";
import { NotFoundError } from "../../errors/not-found-error";
import { NotAuthorizedError } from "../../errors/not-authorized";

const route = express.Router();

route.delete(
  "/api/movies/:id",
  currentUser,
  requireAuth,
  param("id").isMongoId(),
  validateRequest,
  async (req: Request, res: Response) => {
    const movieId = req.params.id;

    // get movie
    const movie = await Movie.findById(movieId);

    // check if the movie exists
    if (!movie) {
      throw new NotFoundError();
    }

    // check if the user owns the movie
    if (movie.userId !== req.currentUser?.id) {
      throw new NotAuthorizedError();
    }

    // delete
    try {
      await movie.remove();
      res.send({ message: "Movie deleted!" });
    } catch (ex) {
      throw new DatabaseError();
    }
  }
);

export { route as deleteMovie };

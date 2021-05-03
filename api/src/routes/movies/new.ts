import express, { Request, Response } from "express";

// model
import { Movie } from "../../models/movie";

// middlewares
import { currentUser } from "../../middlewares/current-user-middleware";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validation-request-middleware";

// validate express
import { body } from "express-validator";

// errors
import { CloudinaryError } from "../../errors/cloudinary-error";
import { DatabaseError } from "../../errors/database-error";

// cloudinary
import CloudinaryManager from "../../services/Cloudinary";

const route = express.Router();

route.post(
  "/api/movies",
  currentUser,
  requireAuth,
  body("name").isString(),
  body("description").isString(),
  body("image").isString(),
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, description, image } = req.body;

    //  upload image
    const result = await CloudinaryManager.uploadImage(image);

    // const result = { url: "url" };
    if (!result.url) {
      throw new CloudinaryError();
    }

    const movie = Movie.build({
      name,
      description,
      image: result.url,
      userId: req.currentUser!.id,
    });

    try {
      await movie.save();
      res.status(201).send({ message: "Movie created!", movie });
    } catch (ex) {
      throw new DatabaseError();
    }
  }
);

export { route as newMovie };

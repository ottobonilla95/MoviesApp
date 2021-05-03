import express, { Request, Response } from "express";
import { User } from "../../models/user";

// validation
import { body } from "express-validator";

// jwt
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config";

// middlewares
import { validateRequest } from "../../middlewares/validation-request-middleware";

// errors
import { DatabaseError } from "../../errors/database-error";
import { BadRequestError } from "../../errors/bad-request-error";

const router = express.Router();

// create a new user
router.post(
  "/api/users/signup",
  body("firstName").isString(),
  body("lastName").isString(),
  body("email").isEmail(),
  body("password").isString(),
  body("company").isString(),
  validateRequest,

  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, company } = req.body;

    // find out if email is already in use

    let userFound;
    try {
      userFound = await User.findOne({ email });
    } catch (ex) {
      throw new DatabaseError();
    }

    if (userFound) {
      throw new BadRequestError("Email already in use");
    }
    // create the new user
    try {
      const newUser = User.build({
        email,
        firstName,
        lastName,
        company,
        password,
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        JWT_SECRET
      );

      res
        .status(201)
        .send({ message: "User created!", user: newUser, token: token });
    } catch (err) {
      throw new DatabaseError();
    }
  }
);

export { router as userSignUpRouter };

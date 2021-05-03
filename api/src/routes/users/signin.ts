import express, { Request, Response } from "express";
import { User } from "../../models/user";

//  validation
import { body } from "express-validator";

// jwt
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config";

// errors
import { DatabaseError } from "../../errors/database-error";

// middlewares
import { validateRequest } from "../../middlewares/validation-request-middleware";

// password hash
import { PasswordHashingManager } from "../../services/password";
import { BadRequestError } from "../../errors/bad-request-error";

const router = express.Router();

// sign in
router.post(
  "/api/users/signin",
  body("email").isEmail(),
  body("password").isString(),
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    let userFound;
    try {
      userFound = await User.findOne({ email: email });
    } catch (err) {
      throw new DatabaseError();
    }

    if (!userFound) {
      throw new BadRequestError("Invalid credentials");
    }

    if (PasswordHashingManager.compare(userFound!.password, password)) {
      const token = jwt.sign(
        { id: userFound.id, email: userFound.email },
        JWT_SECRET
      );

      res.send({ message: "User signed in!", user: userFound, token });
    } else {
      throw new BadRequestError("Invalid credentials");
    }
  }
);

export { router as userSignInRouter };

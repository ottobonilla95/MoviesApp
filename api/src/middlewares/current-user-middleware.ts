import { Request, Response, NextFunction } from "express";

// jwt
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

interface ICurrentUser {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: ICurrentUser;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next();
  }

  const token = authHeader.split(" ")[1];
  const payload = jwt.verify(token, JWT_SECRET) as ICurrentUser;
  req.currentUser = payload;

  next();
};

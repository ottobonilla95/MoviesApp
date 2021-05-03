import { Request, Response, NextFunction } from "express";

// validation
import { validationResult } from "express-validator";

// errors
import { RequestValidationError } from "../errors/request-validation-errors";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  next();
};

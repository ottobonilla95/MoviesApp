import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    const error = err as CustomError;

    return res
      .status(error.statusCode)
      .send({ errors: error.serializeErrors() });
  }

  console.log(err)
  res.status(400).send([{ message: "Error" }]);
};

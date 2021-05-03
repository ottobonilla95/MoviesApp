

import { CustomError } from "./custom-error";

export class DatabaseError extends CustomError {
  statusCode = 500;

  constructor() {
    super("Database error");

    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
    return [{ message: "Database error" }];
  }
}

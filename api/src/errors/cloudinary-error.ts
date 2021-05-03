import { CustomError } from "./custom-error";

export class CloudinaryError extends CustomError {
  statusCode = 500;

  constructor() {
    super("Cloudiinary error");

    Object.setPrototypeOf(this, CloudinaryError.prototype);
  }

  serializeErrors() {
    return [{ message: "Cloudiinary error" }];
  }
}

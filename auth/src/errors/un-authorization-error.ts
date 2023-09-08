import { CustomError } from "./custom-error";

export class UnauthorizationError extends CustomError {
  statusCode = 401;

  constructor() {
    super("You are unauthorized");

    Object.setPrototypeOf(this, UnauthorizationError.prototype);
  }

  serializeError() {
    return [{ message: "Unauthorization" }];
  }
}

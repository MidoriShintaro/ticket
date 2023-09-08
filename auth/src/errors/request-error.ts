import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestErrorValidation extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Invalid request");

    Object.setPrototypeOf(this, RequestErrorValidation.prototype);
  }

  serializeError() {
    return this.errors.map((error) => {
      return {
        message: error.msg,
        field: error.msg.toLowerCase().startsWith("email")
          ? "email"
          : "password",
      };
    });
  }
}

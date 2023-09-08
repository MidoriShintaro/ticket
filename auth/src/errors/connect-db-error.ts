import { CustomError } from "./custom-error";

export class ConnectDatabaseError extends CustomError {
  reason = "Error connecting to database";
  statusCode = 500;
  constructor() {
    super("Error connecting to database");

    Object.setPrototypeOf(this, ConnectDatabaseError.prototype);
  }

  serializeError() {
    return [{ message: this.reason }];
  }
}

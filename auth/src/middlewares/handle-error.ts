import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ status: "false", errors: err.serializeError() });
  }

  res
    .status(400)
    .json({ status: false, errors: [{ message: "Something went wrong" }] });
};

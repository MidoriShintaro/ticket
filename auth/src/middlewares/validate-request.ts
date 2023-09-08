import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestErrorValidation } from "../errors/request-error";

export const validateRequest = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestErrorValidation(errors.array());
  }

  next();
};

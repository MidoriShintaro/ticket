import { NextFunction, Request, Response } from "express";
import { UnauthorizationError } from "../errors/un-authorization-error";

export const Authorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) throw new UnauthorizationError();

  next();
};

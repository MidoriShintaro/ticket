import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { RequestErrorValidation } from "../errors/request-error";
import { User } from "../model/user";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";

const router = Router();

router.post(
  "/api/users/register",
  [
    body("email").isEmail().withMessage("Email invalid"),
    body("password")
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be 4 between 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestErrorValidation(errors.array());
    }
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new BadRequestError("Email already exists");
    const user = await User.create({ email, password });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );

    req.session = {
      token: token,
    };
    res.status(201).json({ status: "success", user });
  }
);

export default router;

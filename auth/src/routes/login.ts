import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../model/user";
import { NotFoundError } from "../errors/not-found-error";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";

const router = Router();

router.post(
  "/api/users/login",
  [
    body("email").isEmail().withMessage("Email invalid"),
    body("password").isEmpty().withMessage("Password must have provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new NotFoundError();
    if (!(await user.comparePassword(password, user.password)))
      throw new BadRequestError("Invalid Credentials");

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );

    req.session = { token };
    res.status(200).json({ status: "success", user });
  }
);

export default router;

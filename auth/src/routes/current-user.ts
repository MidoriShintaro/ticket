import { Request, Response, Router } from "express";
import { currentUser } from "../middlewares/current-user";
const router = Router();

router.get(
  "/api/users/current-user",
  currentUser,
  (req: Request, res: Response) => {
    res.status(200).json({ status: "success", user: req.currentUser || null });
  }
);

export default router;

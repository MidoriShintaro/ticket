import { Request, Response, Router } from "express";

const router = Router();

router.post("/api/users/logout", (req: Request, res: Response) => {
  req.session = null;

  res.status(200).send({});
});

export default router;

//library
import express, { Request, Response } from "express";
import cookieSession from "cookie-session";
import "express-async-errors";
const app = express();

//other
import currentUserRoute from "./routes/current-user";
import loginRoute from "./routes/login";
import logoutRoute from "./routes/logout";
import registerRoute from "./routes/register";
import { handleError } from "./middlewares/handle-error";
import { NotFoundError } from "./errors/not-found-error";

//middleware
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    secure: process.env.NODE_ENV !== "test",
    signed: false,
  })
);

//router
app.use(currentUserRoute);
app.use(loginRoute);
app.use(logoutRoute);
app.use(registerRoute);

//not found routes
app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});

//global error handler
app.use(handleError);

export { app };

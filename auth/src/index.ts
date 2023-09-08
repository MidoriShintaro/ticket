import mongoose from "mongoose";
import { app } from "./app";
const port = process.env.PORT || 5000;

const start = async () => {
  //connect db
  try {
    await mongoose.connect("mongodb://auth-mongo-service:27017/auth");
    console.log("DB connection established");
  } catch (error) {
    console.log(error);
  }

  app.listen(port, () => {
    console.log("Server listening on port " + port);
  });
};

start();

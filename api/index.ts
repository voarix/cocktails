import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import config from "./config";
import cookieParser from "cookie-parser";
import usersRouter from "./routers/users";
import cocktailsRouter from "./routers/cocktails";
import adminRouter from "./routers/admin";

const app = express();
const port = 8000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/users", usersRouter);
app.use("/cocktails", cocktailsRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);

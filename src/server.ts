import express from "express";
import router from "./routes";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";
import { customErrorHandler } from "./handlers/error";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "test" });
});

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signin);

app.use(customErrorHandler);

export default app;

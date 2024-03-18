import express from "express";
import router from "./routes";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signin);

export default app;

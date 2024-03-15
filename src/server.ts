import express from "express";
import router from "./routes";
import morgan from "morgan";
import { protect } from "./modules/auth";

const app = express();
app.use(morgan("dev"));

app.use("/", protect, router);

export default app;

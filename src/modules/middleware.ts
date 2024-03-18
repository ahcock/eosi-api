import { Middleware } from "../types/middleware.type";
import { validationResult } from "express-validator";

export const handleInputError: Middleware = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(405);
    res.json({ errors: error.array() });
  } else {
    next();
    res.json({ message: "여기는 미들웨어" });
  }
};

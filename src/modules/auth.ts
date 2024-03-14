import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

type User = {
  id: string;
  username: string;
};
export const createJWT = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_TOKEN ?? "",
  );
  return token;
};

export const protect = (
  req: Request & {
    user?: JwtPayload | string;
  },
  res: Response,
  next: NextFunction,
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "Not Authorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "Not Valid Token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SCREET ?? "");
    req.user = user;
    next();
  } catch {
    res.status(401);
    res.json({ message: "Not Valid Token" });
    return;
  }
};

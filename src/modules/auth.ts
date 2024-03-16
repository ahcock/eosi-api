import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../types/user.type";

export const comparePassword = (password: string | Buffer, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  // 더 안전한 salt 사용을 위해 추후 바꿀 것.

  return bcrypt.hash(password, 5);
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

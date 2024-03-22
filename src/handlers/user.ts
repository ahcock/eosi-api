import prisma from "../db";
import { Request, Response } from "express";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";
import type { User } from "@prisma/client";

export const createNewUser = async (
  req: Request<User>,
  res: Response,
  next: any,
) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req: Request<User>, res: Response, next: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(401);
      res.json({ message: "아이디가 잘못되었어요." });
      return;
    }

    const isValid = await comparePassword(
      req.body.password,
      user.password ?? "",
    );

    if (!isValid) {
      res.status(401);
      res.json({ message: "비밀번호가 일치하지 않습니다." });
      return;
    }

    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

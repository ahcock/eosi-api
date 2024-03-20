import { Request, Response } from "express";

export type Handler<T = {}> = (req: Request & T, res: Response) => any;

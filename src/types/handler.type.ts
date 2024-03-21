import { RequestHandler } from "express";

export type Handler<T = {}> = RequestHandler<any, any, T>;

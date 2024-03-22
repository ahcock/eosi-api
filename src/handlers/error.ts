import { ErrorRequestHandler } from "express";

export const customErrorHandler: ErrorRequestHandler = (err, _, res) => {
  console.error(err.stack);
  res.status(500).json({
    message: `오류가 발생했어요. 잠시후 다시 시도해 주실래요? 오류 내용: ${err.message}`,
  });
};

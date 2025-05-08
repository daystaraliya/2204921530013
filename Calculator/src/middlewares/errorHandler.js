import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
  const status = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({
    success: false,
    message,
  });
};

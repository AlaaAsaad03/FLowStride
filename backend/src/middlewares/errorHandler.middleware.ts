import { ErrorRequestHandler, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/appError";
import { z, ZodError } from "zod";
import { ErrorCodeEnum } from "../enums/error-code.enum";

export const formatZodError = (res: Response, error: z.ZodError) => {
    const errors = error?.issues?.map((err) => ({
        field: err.path.join("."),
        message: err.message,
    }));
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "Validation failed",
        errors: errors,
        errorCode: ErrorCodeEnum.VALIDATION_ERROR,
    });
};

export const errorHandler: ErrorRequestHandler = (error, req, res, next): any => {

    console.error(`Error Occurred on PATH: ${req.path}`, error);

    if (error instanceof SyntaxError) {
        return res.status(HTTPSTATUS.BAD_REQUEST).json({
            message: "Invalid JSON payload format. Please check your request body and try again",
        })
    }

    if (error instanceof ZodError) {
        return formatZodError(res, error);
    }

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
            errorCode: error.errorCode,
        })
    }


    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        error: error?.message || "Unknown error occurred",
    })
}
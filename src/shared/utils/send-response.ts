import { Response } from "express";

const sendResponse = <T>(
    res: Response,
    payload: {
        success: boolean;
        statusCode: number;
        message: string;
        pagination?: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data?: T | null | undefined;
    },
) => {
    res.status(payload.statusCode).json({
        success: payload.success,
        statusCode: payload.statusCode,
        message: payload.message,
        pagination: payload.pagination || null || undefined,
        data: payload.data || null || undefined,
    });
};

export default sendResponse;

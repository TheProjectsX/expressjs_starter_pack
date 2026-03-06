import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "@/shared/utils/catch-async";
import sendResponse from "@/shared/utils/send-response";
import ProfileServices from "./profile.service";

const getCurrentUser = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const result = await ProfileServices.getCurrentUser(user);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: result.message,
        data: result.data,
    });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const payload = req.body;

    if (req.file) {
        payload.avatar = req.file.filename;
    }

    const result = await ProfileServices.updateProfile(payload, user);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: result.message,
        data: result.data,
    });
});

export default {
    getCurrentUser,
    updateProfile,
};

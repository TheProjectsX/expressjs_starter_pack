import prisma from "@/shared/utils/prisma";
import { StatusCodes } from "http-status-codes";
import { UserPayload } from "@/app/middlewares/auth";
import { UserProfileUpdateInput } from "./profile.validation";
import ApiError from "@/shared/errors/api-error";
import { deleteFile } from "@/shared/helpers/file-system/file.delete";

// Get Me (/users/me - Current User Profile)
const getCurrentUser = async (user: UserPayload) => {
    const userData = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            id: true,
            email: true,
            role: true,
            profile: {
                omit: {
                    userId: true,
                    createdAt: true,
                    updatedAt: true,
                    id: true,
                },
            },
        },
    });

    return {
        message: "User profile fetched successfully",
        data: userData,
    };
};

// Update Profile Info
const updateProfile = async (
    payload: UserProfileUpdateInput,
    user: UserPayload,
) => {
    const profile = await prisma.profile.findUnique({
        where: {
            userId: user.id,
        },
    });

    if (!profile) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Profile not found");
    }

    const updatedProfile = await prisma.profile.update({
        where: {
            userId: user.id,
        },
        data: payload,
    });

    // Delete the old avatar if new is provided
    if (payload.avatar && profile.avatar) {
        await deleteFile(profile.avatar);
    }

    return {
        message: "User profile updated successfully",
        data: updatedProfile,
    };
};

export default {
    getCurrentUser,
    updateProfile,
};

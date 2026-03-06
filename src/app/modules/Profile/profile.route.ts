import { Router } from "express";
import ProfileController from "./profile.controller";
import auth from "@/app/middlewares/auth";
import { upload } from "@/shared/helpers/file-system/file.upload";
import { parseBodyData } from "@/app/middlewares/parseBodyData";

const router = Router();

router.get("/profile", auth(), ProfileController.getCurrentUser);

router.patch(
    "/profile",
    auth(),
    upload.single("avatar"),
    parseBodyData,
    ProfileController.updateProfile,
);

export const ProfileRoutes = router;

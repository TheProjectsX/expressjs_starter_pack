import express, { RequestHandler } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { ProfileRoutes } from "../modules/Profile/profile.route";

const router = express.Router();

const moduleRoutes = [
    {
        path: "/auth",
        handlers: [AuthRoutes],
    },
    {
        path: "/profile",
        handlers: [ProfileRoutes],
    },
] satisfies {
    path: string;
    handlers: RequestHandler[];
}[];

moduleRoutes.forEach((route) => router.use(route.path, ...route.handlers));

export default router;

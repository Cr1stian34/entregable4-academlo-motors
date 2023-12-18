import express from "express";
import { router as userRouter } from "../modules/users/users.route.js";
import { router as repairRouter } from "../modules/repairs/repairs.route.js";

export const router = express.Router();

router.use("/users", userRouter);
router.use("/repairs", repairRouter);

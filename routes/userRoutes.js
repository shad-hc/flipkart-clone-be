import express from "express";
import { userAuthMiddleware } from "../middleware/authMiddleware.js";
import * as xyz from "../controllers/userController.js";

const router = express.Router();

router.get("/me",userAuthMiddleware,xyz.getMe);
router.put("/me",userAuthMiddleware,xyz.updateMe);
router.put("/me/password",userAuthMiddleware,xyz.updatePassword);

export default router;
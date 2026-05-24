import express from "express";
import * as auth from "../controllers/authController.js"
import { validateSignup,validateSignin } from "../validators/authValidator.js";

const router = express.Router();


router.post("/signup" , validateSignup, auth.signup);
router.post("/signin", validateSignin, auth.signin);

export default router;
import express from "express";
import * as AuthService from "../service/AuthService.js";

const router = express.Router();

// Register a new user
router.post("/signup", AuthService.signup);
// Sign in a user
router.post("/signin", AuthService.signin);

export default router;

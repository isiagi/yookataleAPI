import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.route("/login").post(userController.login);
router.route("/signup").post(userController.register);

export default router;

import express from "express";
import userController from "../controllers/userController";
import { authenticationMiddleware } from "../middleware/protect";
import upload from "../../utils/multer";

const router = express.Router();

router.route("/login").post(userController.login);
router.route("/signup").post(upload, userController.register);
router
  .route("/userprofile")
  .get(authenticationMiddleware, userController.getUser);
router
  .route("/userprofile/update")
  .patch(authenticationMiddleware, upload, userController.updateUser);

export default router;

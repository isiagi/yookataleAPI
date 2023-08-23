import express from "express";
import userController from "../controllers/userController";
import { authenticationMiddleware } from "../middleware/protect";

const router = express.Router();

router.route("/login").post(userController.login);
router.route("/signup").post(userController.register);
router
  .route("/userprofile")
  .get(authenticationMiddleware, userController.getUser);
router
  .route("/userprofile/update")
  .patch(authenticationMiddleware, userController.updateUser);

export default router;

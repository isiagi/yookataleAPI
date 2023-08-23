// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import express from "express";
import orderController from "../controllers/orderController";
import { authenticationMiddleware } from "../middleware/protect";

const router = express.Router();

router.route("/").get(authenticationMiddleware, orderController.getOrders);
router
  .route("/create")
  .post(authenticationMiddleware, orderController.createOrder);
router.route("/my/:id").get(orderController.getOrderById);
router.route("/delete/:id").delete(orderController.deleteOrder);

export default router;

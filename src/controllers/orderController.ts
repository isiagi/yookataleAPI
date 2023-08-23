// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Request, Response } from "express";
import Order from "../models/OrderModel";
import { log } from "console";

const orderController = {
  getOrders: async (req: Request, res: Response) => {
    const loggedInUser = req.user.id;
    try {
      let orders = await Order.find({ userId: loggedInUser });

      res.status(200).json({ data: orders });
    } catch (error) {
      log(error);
      res.status(500).json({ error });
    }
  },

  createOrder: (req, res) => {
    try {
      const { cartItems } = req.body;

      let totalPrice = 0;
      const products = [];

      cartItems.forEach((item) => {
        console.log(item);

        products.push({ productId: item._id, qty: item.qty });
        totalPrice += item.price * item.qty;
      });

      const createOrder = new Order({
        userId: req.user.id,
        products,
        totalPrice,
      });

      createOrder.save();

      res.status(201).send(createOrder);
    } catch (error) {
      res.status(500).send({ message: "Error in creating order" });
    }
  },

  getOrderById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id).populate({
        path: "userId",
        select: "_id email",
      });

      res.status(200).json({ data: order });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  deleteOrder: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = await Order.findByIdAndDelete(id);
      if (order === null) {
        return res.status(400).json({ message: "Order Not Found" });
      }
      res.status(200).json({ message: `Order successfully deleted` });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default orderController;

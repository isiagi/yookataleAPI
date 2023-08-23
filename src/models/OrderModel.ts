import { Schema, Types, model } from "mongoose";

interface UserOrder {
  userId: Types.ObjectId;
  totalPrice: Number;
  status: String;
  createdAt: Date;
  products: [];
}

const orderSchema = new Schema<UserOrder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user id"],
  },
  totalPrice: {
    type: Number,
    required: [true, "Please provide total price"],
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["pending", "completed", "closed"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = model<UserOrder>("Order", orderSchema);

export default Order;

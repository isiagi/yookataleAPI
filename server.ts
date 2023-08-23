import express, { Express, Request, Response } from "express";
import cors from "cors";
import userRouter from "./src/routers/userRouter";
import ordersRouter from "./src/routers/orderRouter";
import dbConnect from "./src/db/connect";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth/", userRouter);
app.use("/api/v1/order/", ordersRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To YooKatale API");
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log(`Server Up and Running On http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();

import express, { Express, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import userRouter from "./src/routers/userRouter";
import ordersRouter from "./src/routers/orderRouter";
import dbConnect from "./src/db/connect";

const app: Express = express();

app.use(helmet());

// Rate Limiting
const limit = rateLimit({
  max: 80, // max requests
  windowMs: 60 * 60 * 1000, // 1 Hour of ban
  message: "Too many requests", // error message to send
});

app.use(limit);

app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());

// Data Sanitization against NoSQL Injection Attacks
app.use(mongoSanitize());

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

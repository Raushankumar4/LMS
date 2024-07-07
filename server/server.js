import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import UserRouter from "./routes/userRouter.js";
import courseRoutes from "./routes/courseRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import Razorpay from "razorpay";
import cors from "cors";

dotenv.config();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/uploads", express.static("uploads"));

// user routes
app.use("/api", UserRouter);

// course routes

app.use("/api", courseRoutes);

// admin routes
app.use("/api", adminRoutes);

app.listen(port, () => console.log(`server is running on ${port}`));
connectDb();

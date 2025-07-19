import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectingDb from "./configs/db.js";
import userrouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userrouter);
app.use("/api/owner", ownerRouter);

connectingDb();
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});

import express from "express";
import mongoose from "mongoose";
import userRouter from "./modules/user/userRouter.js";
import companyRouter from "./modules/company/companyRouter.js";
import cors from "cors";

const PORT = 3001;
const DB_URL =
  "mongodb+srv://dmeze:admin@cluster0.oh6id.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", userRouter, companyRouter);

const start = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log("Server started on " + PORT));
  } catch (e) {
    console.log(e);
  }
};

start();

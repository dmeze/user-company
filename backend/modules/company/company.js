import mongoose from "mongoose";
import { userShema } from "../user/user.js";

const Company = new mongoose.Schema({
  companyName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  creator: { type: { id: String, creatorName: String }, required: true },
  users: {
    type: [userShema],
    required: true,
  },
  createdBy: { type: Date, required: true },
  updatedBy: { type: Date, required: true },
});

export default mongoose.model("Company", Company);

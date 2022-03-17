import mongoose from "mongoose";

export const userShema = {
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: String, required: true },
  creator: { type: { id: String, creatorName: String }, required: true },
  company: { id: String, companyName: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdBy: { type: Date, required: true },
  updatedBy: { type: Date, required: true },
  role: { type: String, required: true },
};

const User = new mongoose.Schema(userShema);

export default mongoose.model("User", User);

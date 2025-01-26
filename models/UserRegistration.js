import mongoose from "mongoose";

const { Schema } = mongoose;

const UserRegisterSchema = new Schema({
  CNIC: {
    type: Number,
    required: true,
    unique: true,
    // max: [13, "CNIC must not exceed 13 numbers"],
    // min: [13, "CNIC must have 13 numbers"],
  },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const UserRegistration = mongoose.model(
  "UserRegistrations",
  UserRegisterSchema
);

export default UserRegistration;

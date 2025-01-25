import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "student", "teacher", "admin"],
      default: "user",
    },
    isAdmin: { type: Boolean, default: false },
    isTeacher: { type: Boolean, default: false },
    isStudent: { type: Boolean, default: false },
    gender: { type: String, enum: ["Male", "Female", "male", "female"] },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", UserSchema);

export default User;

import mongoose from "mongoose";

const { Schema } = mongoose;

const LoanCategorySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "paid", "unpaid"],
    default: "pending",
  },
  imageUrl: { type: String, required: true },
});

const LoanCategory = mongoose.model("LoanCategories", LoanCategorySchema);

export default LoanCategory;

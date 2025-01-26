import mongoose from "mongoose";

const { Schema } = mongoose;

const SubCategoriesSchema = new Schema({
  loanTitle: { type: String, required: true },
  loanDescription: { type: String, required: true },
  loanAmount: { type: Number, required: true,max: [5000000, "loanAmount must not exceed 5000000"], },
  loanTerms: {
    type: String,
    required: true,
    max: [10, "loanTerms must not exceed 10"],
  },
  intialAmount: { type: Number, required: true },
  additionalDetail: { type: String },
  mainCategory: { type: mongoose.Schema.Types.ObjectId, ref: "LoanCategories" },
});

const SubCategories = mongoose.model("SubCategories", SubCategoriesSchema);

export default SubCategories;

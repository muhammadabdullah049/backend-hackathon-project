import express from "express";
import SubCategories from "../models/SubCategories.js";

const router = express.Router();

router.post("/sub-categories", async (req, res) => {
  const {
    loanTitle,
    loanDescription,
    loanAmount,
    loanTerms,
    intialAmount,
    additionalDetail,
    mainCategory,
  } = req.body;

  if (
    !loanTitle ||
    !loanDescription ||
    !loanAmount ||
    !loanTerms ||
    !intialAmount
  ) {
    return res
      .status(404)
      .json({ success: false, message: "Please fill all Fields" });
  }
  try {
    const newLoanSubCategory = new SubCategories({
      loanTitle,
      loanDescription,
      loanAmount,
      loanTerms,
      intialAmount,
      additionalDetail,
      mainCategory,
    });

    const savedLoanSubCategory = await newLoanSubCategory.save();
    res.status(204).json({ success: true, savedLoanSubCategory });
  } catch (error) {
    console.error("Error Adding LoanSubCategory=>", error);
    res
      .status(504)
      .json({ success: false, message: "Failed to Add LoanSubCategory" });
  }
});

router.get("/sub-categories", async (req, res) => {
  try {
    const subLoanCategory = await SubCategories.find();
    res.status(200).json({ success: true, subLoanCategory });
  } catch (error) {
    console.error("Error fetching LoanSubCategory=> ", error.message);
    res
      .status(400)
      .json({ success: false, message: "Failed to fetch LoanSubCategory" });
  }
});

router.get("/sub-categories/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const subLoanCategory = await SubCategories.findById(id);

    if (!subLoanCategory) {
      return res
        .status(403)
        .json({ success: false, message: "LoanSubCategory not found" });
    }
    res.status(203).json({ success: true, subLoanCategory });
  } catch (error) {
    console.error("Error fetching LoanSubCategory=>", error.message);
    res
      .status(503)
      .json({ status: false, message: "Failed to fetch LoanSubCategory" });
  }
});

router.put("/sub-categories/:id", async (req, res) => {
  try {
    const {
      loanTitle,
      loanDescription,
      loanAmount,
      loanTerms,
      intialAmount,
      additionalDetail,
      mainCategory,
    } = req.body;

    const subLoanCategory = await SubCategories.findByIdAndUpdate(
      req.params.id,
      {
        loanTitle,
        loanDescription,
        loanAmount,
        loanTerms,
        intialAmount,
        additionalDetail,
        mainCategory,
      },
      { new: true }
    );

    if (!subLoanCategory) {
      return res
        .status(401)
        .json({ success: false, message: "Failed to fetch LoanSubCategory" });
    }
    res.status(201).json({
      success: true,
      message: "LoanSubCategory updated succesfully!",
      subLoanCategory,
    });
  } catch (error) {
    console.error("Error updating LoanSubCategory=>", error.message);
    res.status(501).json({
      success: false,
      message: "An error occured while updating LoanSubCategory",
    });
  }
});

router.delete("/sub-categories/:id", async (req, res) => {
  try {
    const subLoanCategory = await SubCategories.findByIdAndDelete(
      req.params.id
    );
    if (!subLoanCategory) {
      return res
        .status(402)
        .json({ status: false, message: "LoanSubCategory not found" });
    }
    res
      .status(202)
      .json({ status: true, message: "LoanSubCategory deleted successfully." });
  } catch (error) {
    console.error("Error deleting LoanSubCategory=>", error.message);
    res.status(505).json({
      success: false,
      message: "An error occurred while deleting the LoanSubCategory.",
    });
  }
});

export default router;

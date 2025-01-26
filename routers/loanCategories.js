import express from "express";
import LoanCategory from "../models/LoanCategories.js";

const router = express.Router();

router.post("/loan-categories", async (req, res) => {
  const { title, description, status, imageUrl } = req.body;

  if (!title || !description || !imageUrl) {
    return res
      .status(404)
      .json({ success: false, message: "Please fill all Fields" });
  }
  try {
    const newLoanCategory = new LoanCategory({
      title,
      description,
      status,
      imageUrl,
    });

    const savedLoanCategory = await newLoanCategory.save();
    res.status(204).json({ success: true, savedLoanCategory });
  } catch (error) {
    console.error("Error Adding LoanCategory=>", error);
    res
      .status(504)
      .json({ success: false, message: "Failed to Add LoanCategory" });
  }
});

router.get("/loan-categories", async (req, res) => {
  try {
    const loanCategory = await LoanCategory.find();
    res.status(200).json({ success: true, loanCategory });
  } catch (error) {
    console.error("Error fetching loanCategory=> ", error.message);
    res
      .status(400)
      .json({ success: false, message: "Failed to fetch loanCategory" });
  }
});

router.get("/loan-categories/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const loanCategory = await LoanCategory.findById(id);

    if (!loanCategory) {
      return res
        .status(403)
        .json({ success: false, message: "LoanCategory not found" });
    }
    res.status(203).json({ success: true, loanCategory });
  } catch (error) {
    console.error("Error fetching LoanCategory=>", error.message);
    res
      .status(503)
      .json({ status: false, message: "Failed to fetch LoanCategory" });
  }
});

router.put("/loan-categories/:id", async (req, res) => {
  try {
    const { title, description, status, imageUrl } = req.body;

    const loanCategory = await LoanCategory.findByIdAndUpdate(
      req.params.id,
      { title, description, status, imageUrl },
      { new: true }
    );

    if (!loanCategory) {
      return res
        .status(401)
        .json({ success: false, message: "Failed to fetch loanCategory" });
    }
    res
      .status(201)
      .json({ success: true, message: "LoanCategory updated succesfully!", loanCategory });
  } catch (error) {
    console.error("Error updating loanCategory=>", error.message);
    res.status(501).json({
      success: false,
      message: "An error occured while updating loanCategory",
    });
  }
});

router.delete("/loan-categories/:id", async (req, res) => {
  try {
    const loanCategory = await LoanCategory.findByIdAndDelete(req.params.id);
    if (!loanCategory) {
      return res.status(402).json({ status: false, message: "LoanCategory not found" });
    }
    res
      .status(202)
      .json({ status: true, message: "LoanCategory deleted successfully." });
  } catch (error) {
    console.error("Error deleting loanCategory=>", error.message);
    res.status(505).json({
      success: false,
      message: "An error occurred while deleting the loanCategory.",
    });
  }
});

export default router;

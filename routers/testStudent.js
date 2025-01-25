import express from "express";
import TestStudent from "../models/TestStudent.js";

const router = express.Router();

router.post("/testStudent", async (req, res) => {
  const { studentName, studentEmail, studentPhone, studentAddress } = req.body;

  if (!studentName || !studentEmail || !studentPhone || !studentAddress) {
    return res
      .status(404)
      .json({ success: false, message: "Please fill all Fields" });
  }
  try {
    const newStudent = new TestStudent({
      studentName,
      studentEmail,
      studentPhone,
      studentAddress,
    });

    const savedStudent = await newStudent.save();
    res.status(202).json({ success: true, savedStudent });
  } catch (error) {
    console.error("Error Adding Student=>", error);
    res.status(505).json({ success: false, message: "Failed to Add Student" });
  }
});

export default router;

import express from "express";
import UserRegistration from "../models/UserRegistration.js";

const router = express.Router();

router.post("/userRegistration", async (req, res) => {
  const { CNIC, name, email, password, role } = req.body;

  if (!CNIC || !name || !email) {
    return res
      .status(404)
      .json({ success: false, message: "Please fill all Fields" });
  }
  try {
    const newUserRegister = new UserRegistration({
      CNIC,
      name,
      email,
      password,
      role,
    });

    const savedUserRegister = await newUserRegister.save();
    res.status(204).json({ success: true, savedUserRegister });
  } catch (error) {
    console.error("Error Register User=>", error);
    res
      .status(504)
      .json({ success: false, message: "Failed to Register User" });
  }
});

router.get("/userRegistration", async (req, res) => {
  try {
    const userRegister = await UserRegistration.find();
    res.status(200).json({ success: true, userRegister });
  } catch (error) {
    console.error("Error fetching userRegister=> ", error.message);
    res
      .status(400)
      .json({ success: false, message: "Failed to fetch userRegister" });
  }
});

router.get("/userRegistration/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userRegister = await UserRegistration.findById(id);

    if (!userRegister) {
      return res
        .status(403)
        .json({ success: false, message: "UserRegister not found" });
    }
    res.status(203).json({ success: true, userRegister });
  } catch (error) {
    console.error("Error fetching userRegister=>", error.message);
    res
      .status(503)
      .json({ status: false, message: "Failed to fetch UserRegister" });
  }
});

router.put("/userRegistration/:id", async (req, res) => {
  try {
    const { CNIC, name, email, password, role } = req.body;

    const userRegister = await UserRegistration.findByIdAndUpdate(
      req.params.id,
      { CNIC, name, email, password, role },
      { new: true }
    );

    if (!userRegister) {
      return res
        .status(401)
        .json({ success: false, message: "Failed to fetch userRegister" });
    }
    res.status(201).json({
      success: true,
      message: "UserRegister updated succesfully!",
      userRegister,
    });
  } catch (error) {
    console.error("Error updating userRegister=>", error.message);
    res.status(501).json({
      success: false,
      message: "An error occured while updating userRegister",
    });
  }
});

router.delete("/userRegistration/:id", async (req, res) => {
  try {
    const userRegister = await UserRegistration.findByIdAndDelete(
      req.params.id
    );
    if (!userRegister) {
      return res
        .status(402)
        .json({ status: false, message: "UserRegister not found" });
    }
    res
      .status(202)
      .json({ status: true, message: "UserRegister deleted successfully." });
  } catch (error) {
    console.error("Error deleting userRegister=>", error.message);
    res.status(505).json({
      success: false,
      message: "An error occurred while deleting the userRegisterF.",
    });
  }
});

export default router;

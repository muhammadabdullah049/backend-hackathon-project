import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/users", async (req, res) => {
  const { name, email, password, gender, phone, address, isAdmin, isStudent } =
    req.body;

  if (!name || !email || !password || !gender || !phone || !address) {
    return res
      .status(404)
      .json({ success: false, message: "Please fill all Fields" });
  }
  try {
    const newUser = new User({
      name,
      email,
      password,
      gender,
      phone,
      address,
      isAdmin,
      isStudent,
    });

    const savedUser = await newUser.save();
    res.status(204).json({ success: true, savedUser });
  } catch (error) {
    console.error("Error Adding Student=>", error);
    res.status(504).json({ success: false, message: "Failed to Add User" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching student=> ", error.message);
    res.status(400).json({ success: false, message: "Failed to fetch User" });
  }
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "User not found" });
    }
    res.status(203).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching student=>", error.message);
    res.status(503).json({ status: false, message: "Failed to fetch User" });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      gender,
      phone,
      address,
      isAdmin,
      isStudent,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password, gender, phone, address, isAdmin, isStudent },
      { new: true }
    );

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Failed to fetch User" });
    }
    res
      .status(201)
      .json({ success: true, message: "User updated succesfully!", user });
  } catch (error) {
    console.error("Error updating User=>", error.message);
    res.status(501).json({
      success: false,
      message: "An error occured while updating User",
    });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(402).json({ status: false, message: "User not found" });
    }
    res
      .status(202)
      .json({ status: true, message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting User=>", error.message);
    res
      .status(505)
      .json({
        success: false,
        message: "An error occurred while deleting the User.",
      });
  }
});

export default router;

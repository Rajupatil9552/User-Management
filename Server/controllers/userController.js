
import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, location } = req.body;

    if (!name || !email || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const user = await User.create({ name, email, location });
    return res.status(201).json(user);
  } catch (err) {
    console.error("createUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.json(users);
  } catch (err) {
    console.error("getUsers error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (err) {
    console.error("getUserById error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, location } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, location },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user);
  } catch (err) {
    console.error("updateUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({ message: "User deleted" });
  } catch (err) {
    console.error("deleteUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

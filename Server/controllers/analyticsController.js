
import User from "../models/User.js";

export const getUsersByLocation = async (req, res) => {
  try {
    const breakdown = await User.aggregate([
      {
        $group: {
          _id: "$location",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const totalUsers = await User.countDocuments();
    const majorLocation = breakdown.length ? breakdown[0]._id : null;

    return res.json({
      totalUsers,
      majorLocation,
      breakdown
    });
  } catch (err) {
    console.error("getUsersByLocation error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

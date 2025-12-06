
import User from "../models/User.js";
import { transporter } from "../config/mailer.js";

export const notifyUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Notification from CRUD App",
      text: `Hi ${user.name}, this is a notification email from our system.`
    };

    await transporter.sendMail(mailOptions);

    return res.json({ message: "Notification email sent" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to send email" });
  }
};

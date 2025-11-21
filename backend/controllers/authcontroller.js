import { UserModel } from "../model/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import sendEmail from "../config/sendEmail.js";

// -------------------- FORGOT PASSWORD --------------------
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    const link = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendEmail(
      user.email,
      "Password Reset",
      `<p>Click the link to reset your password:</p>
       <a href="${link}">${link}</a>`
    );

    res.json({ msg: "A reset link has been sent to your email." });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// -------------------- RESET PASSWORD --------------------
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findOne({
      _id: decoded.id,
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ msg: "Invalid or expired token" });

    // Update password
    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res.json({ msg: "Password updated successfully!" });
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
};




export const registerUser = async (req, res) => {
    try {
        const { username, email, password,role } = req.body;

        if (!username || !email || !password)
            return res.status(400).json({ message: "All fields are required" });

        let user = await UserModel.findOne({ email });
        if (user)
            return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await UserModel.create({ username, email, password:hashedPassword ,role});

        res.json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                password:hashedPassword,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const loginUser = async(req,res)=>{

  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid email" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Invalid password" });

  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },process.env.JWT_SECRET,{ expiresIn: "1h" }
  );

  res.json({
    token,
     user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
  });


}







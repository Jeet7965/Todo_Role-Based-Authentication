import { UserModel } from "../model/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";


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



import { Request, Response } from "express";
import User from "../../models/user";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import * as yup from "yup";

const bodySchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

const Login = async (req: Request, res: Response) => {
  try {
    await bodySchema.validate(req.body, { abortEarly: false });

    const { email, password } = req.body;

    const user = await User.findOne({ email, signin: "email" });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPassMatch = await compare(password, user.password!);
    if (!isPassMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { email: user.email, name: user.name },
      process.env.JWT_SECRET || "123",
      {
        expiresIn: "3d",
      }
    );

    user.token = token;
    await user.save();

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000 * 24 * 3,
      })
      .status(200)
      .json({ message: "Login successful", token, user });
  } catch (err: any) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({ errors: err.errors });
    }
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

export default Login;

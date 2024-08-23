import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/user";
import * as yup from "yup";

const bodySchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  name: yup.string().required("Name is required"),
  password: yup.string().min(6).required("Password is required"),
});

const Register = async (req: Request, res: Response) => {
  try {
    await bodySchema.validate(req.body, { abortEarly: false });

    const { email, name, password } = req.body;

    const alreadyExist = await User.findOne({ email });

    if (alreadyExist) {
      return res.status(403).json({ message: "User already exists" });
    }

    const hashedPass = await bcrypt.hash(password, await bcrypt.genSalt(10));

    const user = new User({
      email,
      name,
      password: hashedPass,
      signin: "email",
      token:""
    });

    await user.save();

    return res.status(201).json({ message: "Registered successfully" });
  } catch (err: any) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({ errors: err.errors });
    }

    console.error(err);
    return res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

export default Register;

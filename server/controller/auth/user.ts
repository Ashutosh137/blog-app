import { Request, Response } from "express";
import User from "../../models/user";

const Users = async (req: any, res: Response) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    return res.status(200).json({ message: "user fetch Successfully", user });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export default Users;

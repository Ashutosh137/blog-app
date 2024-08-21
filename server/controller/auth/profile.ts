import { Request, Response } from "express";
import User from "../../models/user";
import mongoose from "mongoose";
import * as yup from "yup"

const paramsSchema = yup.object().shape({
    id: yup
        .string()
        .required("ID is required")
        .test("is-mongo-objectid", "Invalid ID format", (value) =>
            mongoose.Types.ObjectId.isValid(value)
        ),
});
const Profile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await paramsSchema.validate(req.params, { abortEarly: false });
        const user = await User.findById(id);
        if (!user) return res.status(400).json({ message: "User not found" });
        return res.status(200).json({ message: "user fetch Successfully", user });
    } catch(err) {
        if (err instanceof yup.ValidationError) {
            return res.status(400).json({ errors: err.errors });
          }
        console.log(err)
        res.status(500).json({ message: "Server error" });
    }
};

export default Profile;

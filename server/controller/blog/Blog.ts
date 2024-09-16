import { Request, Response } from "express";
import Blog from "../../models/Blog";
import * as yup from "yup";
import mongoose from "mongoose";

const paramsSchema = yup.object().shape({
  _id: yup
    .string()
    .required("ID is required")
    .test("is-mongo-objectid", "Invalid ID format", (value) =>
      mongoose.Types.ObjectId.isValid(value),
    ),
});

const Blog_ = async (req: Request, res: Response) => {
  try {
    await paramsSchema.validate(req.params, { abortEarly: false });

    const { _id } = req.params;

    const blogPost = await Blog.findById(_id);
    if (!blogPost) {
      return res.status(200).json({ message: "Blog not found", blogPost: [] });
    }

    return res.status(200).json({ blogPost });
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export default Blog_;

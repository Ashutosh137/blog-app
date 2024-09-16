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

const bodySchema = yup.object().shape({
  content: yup.string().required("Content is required"),
  title: yup.string().required("title is required"),
  tags: yup.array().of(yup.string()).required("Tags are required"),
});

const UpdateBlog = async (req: Request, res: Response) => {
  try {
    await paramsSchema.validate(req.params, { abortEarly: false });
    await bodySchema.validate(req.body, { abortEarly: false });
    const { content, tags, title } = req.body;
    const { _id } = req.params;

    const blogPost = await Blog.findByIdAndUpdate(
      _id,
      { content, tags, title, created_at: new Date() },
      { new: true },
    );

    if (!blogPost) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res
      .status(200)
      .json({ message: "Blog updated successfully", blogPost });
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

export default UpdateBlog;

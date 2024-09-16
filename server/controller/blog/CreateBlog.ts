import { Request, Response } from "express";
import Blog from "../../models/Blog";
import mongoose from "mongoose";
import * as yup from "yup";

// Define the yup schema for validation
const blogSchema = yup.object().shape({
  postedby: yup
    .string()
    .required("Posted by is required")
    .test("is-mongo-objectid", "Invalid ObjectId", (value) =>
      mongoose.Types.ObjectId.isValid(value),
    ),
  content: yup.string().required("Content is required"),
  title: yup.string().required("Title is required"),
  tags: yup.array().of(yup.string()).required("Tags are required"),
});

const CreateBlog = async (req: Request, res: Response) => {
  try {
    await blogSchema.validate(req.body, { abortEarly: false });

    const { postedby, content, tags, title } = req.body;

    const blogPost = await Blog.create({
      postedby: new mongoose.Types.ObjectId(postedby as string),
      content,
      created_at: new Date(),
      title,
      tags,
    });

    return res
      .status(201)
      .json({ message: "Blog Created successfully", blogPost });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export default CreateBlog;

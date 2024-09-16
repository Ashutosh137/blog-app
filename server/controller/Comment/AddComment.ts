import { Request, Response } from "express";
import CommentBlog from "../../models/Comment";
import mongoose from "mongoose";
import * as yup from "yup";

const bodySchema = yup.object().shape({
  postedBy: yup
    .string()
    .required("Blog ID is required")
    .test("is-mongo-objectid", "Invalid Blog ID format", (value) =>
      mongoose.Types.ObjectId.isValid(value),
    ),
  BlogPost: yup
    .string()
    .required("Blog ID is required")
    .test("is-mongo-objectid", "Invalid Blog ID format", (value) =>
      mongoose.Types.ObjectId.isValid(value),
    ),
  content: yup.string().required("Content is required"),
});

const CreateComment = async (req: Request, res: Response) => {
  try {
    await bodySchema.validate(req.body, { abortEarly: false });

    const { postedBy, content, BlogPost } = req.body;

    const comment = await CommentBlog.create({
      postedby: new mongoose.Types.ObjectId(postedBy as string),
      text: content,
      created_at: new Date(),
      BlogPost: new mongoose.Types.ObjectId(BlogPost as string),
    });

    return res
      .status(201)
      .json({ message: "Comment created successfully", comment });
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

export default CreateComment;

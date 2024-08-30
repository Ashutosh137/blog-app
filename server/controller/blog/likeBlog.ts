import { Request, Response } from "express";
import Blog from "../../models/Blog";
import * as yup from "yup";
import mongoose from "mongoose";

const paramsSchema = yup.object().shape({
  _id: yup
    .string()
    .required("ID is required")
    .test("is-mongo-objectid", "Invalid ID format", (value) =>
      mongoose.Types.ObjectId.isValid(value)
    ),
});

const bodySchema = yup.object().shape({
  likedBy: yup
    .string()
    .required("User ID is required")
    .test("is-mongo-objectid", "Invalid ID format", (value) =>
      mongoose.Types.ObjectId.isValid(value)
    ),
});

const LikeBlog = async (req: Request, res: Response) => {
  try {
    await paramsSchema.validate(req.params, { abortEarly: false });
    await bodySchema.validate(req.body, { abortEarly: false });
    const { likedBy } = req.body;
    const { _id } = req.params;

    const blogPost = await Blog.findById(_id);

    if (!blogPost) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const isLiked = blogPost.likes.includes(likedBy);

    const updateOperation = isLiked
      ? { $pull: { likes: likedBy } }
      : { $addToSet: { likes: likedBy } };

    const updatedBlogPost = await Blog.findByIdAndUpdate(_id, updateOperation, {
      new: true,
    });

    return res.status(200).json({
      message: isLiked
        ? "Blog unliked successfully"
        : "Blog liked successfully",
      blogPost: updatedBlogPost,
    });
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

export default LikeBlog;

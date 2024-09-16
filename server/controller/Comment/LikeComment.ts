import { Request, Response } from "express";
import Blog from "../../models/Blog";
import * as yup from "yup";
import mongoose from "mongoose";
import CommentBlog from "../../models/Comment";

const paramsSchema = yup.object().shape({
  id: yup
    .string()
    .required("ID is required")
    .test("is-mongo-objectid", "Invalid ID format", (value) =>
      mongoose.Types.ObjectId.isValid(value),
    ),
});

const bodySchema = yup.object().shape({
  likedBy: yup
    .string()
    .required("User ID is required")
    .test("is-mongo-objectid", "Invalid ID format", (value) =>
      mongoose.Types.ObjectId.isValid(value),
    ),
});

const LikeComment = async (req: Request, res: Response) => {
  try {
    await paramsSchema.validate(req.params, { abortEarly: false });
    await bodySchema.validate(req.body, { abortEarly: false });
    const { likedBy } = req.body;
    const { id } = req.params;

    const comment = await CommentBlog.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }

    const isLiked = comment.likes.includes(likedBy);

    const updateOperation = isLiked
      ? { $pull: { likes: likedBy } }
      : { $addToSet: { likes: likedBy } };

    const updatedcomment = await CommentBlog.findByIdAndUpdate(
      id,
      updateOperation,
      {
        new: true,
      },
    );

    console.log(updatedcomment, comment);

    return res.status(200).json({
      message: isLiked
        ? "comment unliked successfully"
        : "comment liked successfully",
      Comment: updatedcomment,
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

export default LikeComment;

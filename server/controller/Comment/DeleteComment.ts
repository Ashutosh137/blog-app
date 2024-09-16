import { Request, Response } from "express";
import CommentBlog from "../../models/Comment";
import mongoose from "mongoose";
import * as yup from "yup";

const bodySchema = yup.object().shape({
  commentId: yup
    .string()
    .required("Comment ID is required")
    .test("is-mongo-objectid", "Invalid Comment ID format", (value) =>
      mongoose.Types.ObjectId.isValid(value),
    ),
});

const DeleteComment = async (req: Request, res: Response) => {
  try {
    await bodySchema.validate(req.params, { abortEarly: false });

    const { commentId } = req.params;

    const deletedComment = await CommentBlog.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    return res.status(200).json({ message: "Comment deleted successfully" });
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

export default DeleteComment;

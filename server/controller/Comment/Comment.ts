import { Request, Response } from "express";
import CommentBlog from "../../models/Comment";
import mongoose from "mongoose";
import * as yup from "yup";

const paramsSchema = yup.object().shape({
  _id: yup
    .string()
    .required("blogId is required as params")
    .test("is-mongo-objectid", "Invalid Blog ID format", (value) =>
      mongoose.Types.ObjectId.isValid(value)
    ),
});

const Comments = async (req: Request, res: Response) => {
  try {
    await paramsSchema.validate(req.params, { abortEarly: false });

    const { _id } = req.params;

    const blogPostComments = await CommentBlog.find({
      BlogPost: new mongoose.Types.ObjectId(_id),
    });

    if (!blogPostComments.length) {
      return res
        .status(200)
        .json({ message: "No comments found for this blog post", comments: [] });
    }

    return res.status(200).json({ comments: blogPostComments });
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

export default Comments;

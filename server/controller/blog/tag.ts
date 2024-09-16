import { Request, Response } from "express";
import Blog from "../../models/Blog";
import * as yup from "yup";

const paramsSchema = yup.object().shape({
  tag: yup.string().required("tag is required"),
});

const Tag = async (req: Request, res: Response) => {
  try {
    await paramsSchema.validate(req.params, { abortEarly: false });

    const { tag } = req.params;

    const blogPost = await Blog.find({
      tags: {
        $elemMatch: { $eq: tag },
      },
    });
    if (!blogPost) {
      return res.status(404).json({ message: "Blog not found" });
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

export default Tag;

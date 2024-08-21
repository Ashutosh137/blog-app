import { Request, Response } from "express";
import Blog from "../../models/Blog";

const Blogs = async (req: Request, res: Response) => {
  try {
    const BlogPost = await Blog.find();

    return res.status(201).json({ BlogPost });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export default Blogs;

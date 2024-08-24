import express from "express";
import CreateBlog from "../controller/blog/CreateBlog";
import UpdateBlog from "../controller/blog/UpdateBlog";
import DeleteBlog from "../controller/blog/DeleteBlog";
import Blogs from "../controller/blog/Blogs";
import VerifyLogin from "../middleware/verifyjwt";
import Blog_ from "../controller/blog/Blog";
import Tag from "../controller/blog/tag";
import Comments from "../controller/Comment/Comment";
import Blog from "../models/Blog";
import User from "../models/user";
import sendEmail from "../Utilities/SendNewBlogMail";

const BlogRouter = express.Router();
BlogRouter.get("/", Blogs);
BlogRouter.get("/:_id", Blog_);
BlogRouter.get("/:_id/comments", Comments);
BlogRouter.get("/tag/:tag", Tag);
BlogRouter.post("/createBlog", VerifyLogin, CreateBlog);
BlogRouter.put("/update/:_id", VerifyLogin, UpdateBlog);
BlogRouter.delete("/delete/:_id", VerifyLogin, DeleteBlog);

const BlogChanger = Blog.watch();
BlogChanger.on("change", async (change) => {
  if (change.operationType === "insert") {
    const newBlog = change.fullDocument;

    const users = await User.find();

    users.map(async (user) => {
      sendEmail(user.email, newBlog);
    });
  }
});

export default BlogRouter;

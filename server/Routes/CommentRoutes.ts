import express from "express";
import CreateComment from "../controller/Comment/AddComment";
import DeleteComment from "../controller/Comment/DeleteComment";
import VerifyLogin from "../middleware/verifyjwt";
import LikeComment from "../controller/Comment/LikeComment";

const CommentRouter = express.Router();
CommentRouter.post("/create", VerifyLogin, CreateComment);
CommentRouter.delete("/delete/:commentId", VerifyLogin, DeleteComment);
CommentRouter.put("/like/:id", LikeComment);

export default CommentRouter;

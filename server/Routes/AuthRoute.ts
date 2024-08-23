import express, { Request, Response } from "express";
import Register from "../controller/auth/register";
import Login from "../controller/auth/login";
import VerifyLogin from "../middleware/verifyjwt";
import Users from "../controller/auth/user";
import Profile from "../controller/auth/profile";
import UserBlog from "../controller/blog/UserBlogs";
const AuthRouter = express.Router();
AuthRouter.get("/user",VerifyLogin,Users)
AuthRouter.get("/profile/:id",Profile)
AuthRouter.get("/profile/:id/blogs",UserBlog)
AuthRouter.post("/register", Register);
AuthRouter.post("/login", Login);

export default AuthRouter;

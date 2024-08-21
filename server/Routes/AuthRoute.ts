import express, { Request, Response } from "express";
import Register from "../controller/auth/register";
import Login from "../controller/auth/login";
import GoogleLogin from "../controller/auth/googleLogin";
import GoogleRegister from "../controller/auth/GoogleRegister";
import VerifyLogin from "../middleware/verifyjwt";
import Users from "../controller/auth/user";
import Profile from "../controller/auth/profile";
const AuthRouter = express.Router();


AuthRouter.get("/user",VerifyLogin,Users)
AuthRouter.get("/profile/:id",Profile)
AuthRouter.post("/register", Register);
AuthRouter.post("/login", Login);
AuthRouter.post("/google/login", GoogleLogin);
AuthRouter.post("/google/register", GoogleRegister);

export default AuthRouter;

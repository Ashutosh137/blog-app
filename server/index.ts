require("dotenv").config();
import helmet from "helmet";
import conn from "./config/database";
import morgen from "morgan";
import hpp from "hpp";
import { Request, Response } from "express";
import AuthRouter from "./Routes/AuthRoute";
import BlogRouter from "./Routes/BlogRoutes";
import CommentRouter from "./Routes/CommentRoutes";
const compression = require("compression");
const express = require("express");
const http = require("http");
const sanitize = require("express-mongo-sanitize");
const app = express();
const server = http.createServer(app);
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(sanitize());
app.use(morgen("dev"));
app.use(hpp());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "build")));

// Handle any requests that don't match the static files
// app.get("*", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, '../app/dist', 'index.html'));
// });
app.get("/", (req: Request, res: Response) => {
  res.send("server is running 🔥🔥🔥");
});
app.use("/auth", AuthRouter);
app.use("/blog", BlogRouter);
app.use("/comment", CommentRouter);

const PORT = process.env.PORT || 4000;

conn.then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

import express from "express";
//import bodyParser from 'body-parser' > now part of express framework by default. Use app.use(express.json()); to parse JSON bodies.
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
dotenv.config();

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import postRoutes from "./routes/postsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

connectDB(); //mongoDB 연결
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
// const __dirname = new URL(".", import.meta.url).pathname; // Resolve __dirname
// app.use("/assets", express.static(path.join(__dirname, "public")));
//app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use('/uploads', express.static('uploads'));

//allows cookies to be sent with the request with settings
app.use(cors({ origin: "http://localhost:5173", credentials: true })); //this need to be initialized before the routes
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); //needed for post req
app.use(cookieParser()); //parse Cookie header on the req and give data as req.cookies, if secret was provided req.signedCookies
//app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

//middleware for errors
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`server running on ${PORT}`));

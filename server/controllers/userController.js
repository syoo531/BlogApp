import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import Post from "../models/postModel.js";

//@desc Register a new user
//@route POST /users
//@access Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409); //409?
    throw new Error("이미 사용된 이메일 주소입니다.");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("password does not match");
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds (usually 12 is used)
  const user = await User.create({
    name,
    username,
    email,
    password: hashedPwd,
  });

  if (user) {
    //can create jwt token and send it here
    res.status(200).json({ message: `new user ${user.name} created` });
  } else {
    res.status(400);
    throw new Error("문제가 발생했습니다.");
  }
});

//@desc Get user profile (posts)
//@route GET /users/profile
//@ access Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const userPosts = await Post.find({ user: req.user.id }).sort({ _id: -1 });
  res.status(200).json({ userPosts });
});

//@desc Update user profile
//@route GET /users/profile
//@ access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update User Profile" });
});

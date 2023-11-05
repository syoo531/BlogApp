import Post from "../models/postModel.js";
import mongoose from "mongoose";
import fs from "fs";

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const regex = new RegExp(searchQuery, "i"); //test Test TEST will all be the same with i + using regexp coz its easier for mongodb to search

    const posts = await Post.find({
      $or: [{ title: regex }, {message: regex}, { tags: { $in: tags.split(",") }}],
    }); //either title or tags IN array
    res.json({ data: posts });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const { page } = req.query;
    const LIMIT = 8; //posts per page
    const startIndex = (Number(page) - 1) * LIMIT; //start index of a post on a specific page
    const totalPosts = await Post.countDocuments({});

    const posts = await Post.find()
      .sort({ _id: -1 }) //give newest post with -1 > skip all until start index
      .limit(LIMIT)
      .skip(startIndex); //skip up to start Index

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(totalPosts / LIMIT),
    });
    //const posts = await Post.find();
    //res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  let post = req.body;
  let imageUrl = null;
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/assets/${
      req.file.originalname
    }`;
  }

  const newPost = new Post({
    ...post,
    user: req.user.id,
    creator: req.user.username,
    img: imageUrl,
    tags: post.tags.split(" ")
  }); //req.user set is verifyJWT
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err.message); // "PostMessage validation failed: creator: Path `creator` is required."
    res.status(409).json({ message: err.message }); //conflict error
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  try {
    const postToUpdate = await Post.findOne({ _id });
    if (postToUpdate.user.toString() !== req.user.id) {
      return res.status(401).send("You are not authorized to update this post");
    }

    const updatedPost = await Post.findByIdAndUpdate(_id, post, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  const post = await Post.findOne({ _id });
  if (post.user.toString() !== req.user.id) {
    return res.status(401).send("You are not authorized to update this post");
  }

  await Post.findByIdAndRemove(_id);
  res.json({ message: "Post deleted" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with that id");
  }

  if (!req.user)
    return res.json({ message: "Unauthenticated- please login to like post" });

  const post = await Post.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.user.id));

  console.log(req.user.id);

  //user id가 없다면 likePost 가능
  if (index === -1) {
    post.likes.push(req.user.id);
  } else {
    //있다면 like 삭제
    post.likes = post.likes.filter((id) => id !== String(req.user.id));
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    // { likeCount: post.likeCount + 1 },
    post, //update with the updated post above
    { new: true }
  );
  res.json(updatedPost);
};

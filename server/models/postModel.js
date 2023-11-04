import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  tags: [String],
  selectedFile: String,
  img: String,
  // img: {
  //   data: Buffer, // Store the binary image data
  //   contentType: String, // Store the content type of the image (e.g., image/jpeg)
  // },
  likeCount: {
    type: Number,
    default: 0,
  },
  likes: {
    type: [String],
    default: []
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;

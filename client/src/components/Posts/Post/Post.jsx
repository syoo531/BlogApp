/* @jsxImportSource @emotion/react */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../../api/services";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { styles } from "./styles";

const Post = ({ post, setCurrentId, isProfile }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile")); //get user info from local and use its id?
  const message = useSelector((state) => state.posts.error);
  const [likes, setLikes] = useState(post?.likes);
  const hasLikedPost = post?.likes.find((like) => like === user?.id); //likes is array of user id [id, id]
  //! const isLiked = Boolean(likes[loggedInUserId]);

  function handleLike(postId) {
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== user.id)); //exclude id from array
    } else {
      setLikes([...post.likes, user.id]);
    }
    dispatch(API.postLikePost(postId));
  }

  function handleDeletePost(postId) {
    dispatch(API.deletePost(postId))
      .unwrap()
      .catch((err) => {
        console.log(err);
        window.alert(`${message}`);
      });
  }

  return (
    <Card css={styles.card}>
        <div style={{ position: "relative" }}>
          <CardMedia
            css={styles.media}
            // component="img"
            // src={post.img}
            component="div"
            image={post.img}
            title={post.title}
          />
          <div css={styles.overlay}>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2">
              {moment(post.createdAt).fromNow()}
            </Typography>
          </div>
          <div css={styles.overlay2}>
            {isProfile && (
              <Button
                style={{ color: "white" }}
                size="small"
                onClick={() => setCurrentId(post._id)}
              >
                <MoreHorizIcon fontSize="default" />
              </Button>
            )}
          </div>
          <div css={styles.tags}>
            <Typography variant="body2" color="textSecondary">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </div>
        </div>
        <div style={{ height: "40px" }}>
          <Typography
            css={styles.message}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              lineClamp: 2,
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {post.message}
          </Typography>
        </div>
        <CardContent sx={{ marginTop: 1 }}>
          <Typography variant="h7" gutterBottom>
            {`- ${post.creator}`}
          </Typography>
        </CardContent>
      <CardActions css={styles.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => handleLike(post._id)}
        >
          <ThumbUpAltIcon fontSize="small" /> Like {likes?.length}
        </Button>
        {isProfile && (
          <Button
            size="small"
            color="primary"
            onClick={() => handleDeletePost(post._id)}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;

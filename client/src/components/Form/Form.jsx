/* @jsxImportSource @emotion/react */
import { useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";

//import FileBase from "react-file-base64";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { styles } from "./styles";
//import Dropzone from "react-dropzone";
import * as API from "../../redux/api";

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const imageInput = useRef();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: null,
  });

  const selectedPost = useSelector((state) =>
    currentId
      ? state.allPosts.posts.find((post) => post._id === currentId)
      : null
  );

  //!if there is post data, populate the form (setPostData) with the post data > this works coz values are set to state
  useEffect(() => {
    if (selectedPost) setPostData(selectedPost);
  }, [selectedPost]);

  //create new, update post
  const handleSubmit = (e) => {
    e.preventDefault();

    //console.log(postData.selectedFile);
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("message", postData.message);
    formData.append("tags", postData.tags);

    if (postData.selectedFile) {
      formData.append("image", postData.selectedFile);
      formData.append("selectedFile", postData.selectedFile.name);
    }
    //testing formData
    // for (const [key, value] of formData.entries()) {
    //   console.log(`Key: ${key}, Value: ${value}`);
    // }

    if (currentId) {
      clear();
      dispatch(API.updatePost({ currentId, formData }))
        .then((result) => console.log("post updated", result))
        .catch((err) => console.log(err));
    } else {
      dispatch(API.createPost(formData))
        .then((result) => console.log("post created", result))
        .catch((err) => console.log(err));
    }

    clear();
    imageInput.current.value = null //need to use dom ref because image input is uncontrolled
  };

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper css={styles.paper}>
      <form
        css={styles.form}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <Typography variant="h6">
          {currentId ? "포스트 수정하기" : "새 포스트 쓰기"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          helperText="제목을 입력하세요"
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div>
          <input
            type="file"
            name="file"
            onChange={(e) =>
              setPostData({ ...postData, selectedFile: e.target.files[0] })
            }
            ref={imageInput}
          ></input>
        </div>
        {/* 
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => {
            const selectedFile = acceptedFiles[0];
            setPostData({ ...postData, selectedFile });
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              style={{
                border: "1px dashed #0074b7",
                padding: "5px",
                margin: "5px",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />
              {!postData.selectedFile ? (
                <p>Upload iamge here</p>
              ) : (
                <div>
                  <p>{postData.selectedFile.name}</p>
                </div>
              )}
            </div>
          )}
        </Dropzone> */}

        {/* <div css={styles.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div> */}
        <Button
          css={styles.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          {currentId ? "포스트 수정" : "새글 등록"}
        </Button>
        <Button
          css={styles.buttonSubmit}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          취소
        </Button>
      </form>
    </Paper>
  );
};

export default Form;

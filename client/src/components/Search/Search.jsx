/* @jsxImportSource @emotion/react */
import { useRef, useState } from "react";
// import { useState, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Select, MenuItem } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
//import * as API from "../../redux/api"

//import { useSelector } from "react-redux"
//import Form from "../Form/Form";
//import {setProfileState} from "../../redux/authSlice"

const Search = () => {
  //const dispatch = useDispatch();
  //const navigate = useNavigate();
  const searchInput = useRef();
  //const tagsInput = useRef([])

  //   const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isSearch, setIsSearch] = useState("search by keyword")

  // const handleSearchPost = async () => {
  //     if (search.trim() || tags) {
  //         console.log("test")
  //       navigate(`search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
  //       dispatch(API.searchPost( {obj: { search, tags }}));
  //     } else {
  //       navigate("/");
  //     }
  //   };

  const handleSearchPost = () => {
    console.log(searchInput.current.value);
    console.log(tags);
  };

  //   const searchPost = async () => {
  //     if (search.trim() || tags) {
  //       navigate(`search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);

  //       const { data } = await axios.get(
  //         `http://localhost:5000/posts/search?searchQuery=${
  //           search || "none"
  //         }&tags=${tags.join(",") || "none"}`
  //       );
  //       dispatch(setAllPosts(data));
  //     } else {
  //       navigate("/");
  //     }
  //   };

  const handleKeyPress = (e) => {
    if (e.keyCode == 13) {
      //search for post
    }
  };

  return (
    <Box
      // component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "80ch" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
    >
    <Select
      value={isSearch}
      sx={{
        marginTop: 35,
        width: 250,
        height: 50,
      }}
      onChange={(e) => setIsSearch(e.target.value)}
    >
      <MenuItem selected={true} value={1}>Search by keyword</MenuItem>
      <MenuItem value={2}>Search by tags</MenuItem>
    </Select>

      <TextField
        name="search"
        placeholder="글 검색"
        variant="standard"
        autoComplete="off"
        inputRef={searchInput}
        onKeyPress={handleKeyPress}
        // onChange={(e) => {setSearch(e.target.value)}}
        sx={{
          "& input": {
            textAlign: "center",
            padding: "16px 0",
          },
        }}
        fullWidth
      />
      <MuiChipsInput
        variant="standard"
        // inputRef={tagsInput}
        inputProps={{
          placeholder: tags ? "태그 검색" : "",
          maxLength: 12,
        }}
        autoComplete="off"
        onChange={(newValue) => setTags(newValue)}
        value={tags}
        clearInputOnBlur
        onFocus={() => setIsFocused(true)}
        helperText={isFocused ? "Double click to edit a chip" : ""}
        sx={{
          "& .MuiInputBase-root.MuiInput-root": {
            padding: "10px 0",
          },
          "& input": {
            textAlign: "center",
            justifySelf: "center",
          },
        }}
      />
      <Button
        size="medium"
        variant="outlined"
        style={{ width: "200px" }}
        onClick={handleSearchPost}
      >
        Search by tag
      </Button>
      <Button
        size="medium"
        variant="outlined"
        style={{ width: "200px" }}
        onClick={handleSearchPost}
      >
        Search
      </Button>
    </Box>
  );
};

export default Search;

/* @jsxImportSource @emotion/react */
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as API from "../../api/services";

import {
  Box,
  TextField,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchInput = useRef();
  //const tagsInput = useRef([]) //cant use useRef on muichips

  const [tags, setTags] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isSearch, setIsSearch] = useState(true);

  const handleSearchPost = () => {
    const search = searchInput?.current?.value.trim();
    if (isSearch && search) {
      dispatch(API.searchPost({ search }));
      searchInput.current.value = "";
    } else if (!isSearch && tags.length > 0) {
      dispatch(API.searchPost({ tags}));
      setTags([]);
    } else {
      return;
    }

    navigate(
      `search?searchQuery=${search || "none"}&tags=${tags?.join(",") || "none"}`
    );
  };

  const toggleSearchFilter = () => {
    setIsSearch((cur) => !cur);
    setTags([]);
  };

  return (
    <Box // component="form"
      sx={{
        "& > :not(style)": { my: 6, mx: 1, width: "70%" },
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        height: 150,
      }}
      noValidate
      autoComplete="off"
    >
      <Select
        variant="standard"
        value={isSearch}
        sx={{
          maxWidth: 180,
        }}
        onChange={toggleSearchFilter}
      >
        <MenuItem value={true}>Search by keyword</MenuItem>
        <MenuItem value={false}>Search by tags</MenuItem>
      </Select>

      {/* toggle between filters */}
      {isSearch ? (
        <TextField
          name="search"
          placeholder="글 검색"
          variant="standard"
          autoComplete="off"
          inputRef={searchInput}
          sx={{
            "& input": {
              textAlign: "center",
            },
          }}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearchPost}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <MuiChipsInput
          variant="standard"
          // inputRef={tagsInput} cant use useRef on MuiChips
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
              padding: "0 0",
            },
            "& .MuiButtonBase-root.MuiChip-root": {
              height: "28px",
            },
            "& .MuiInputBase-root.MuiInput-root input": {
              paddingTop: "2px",
              textAlign: "center",
              justifySelf: "center",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ marginTop: 2 }}>
                <IconButton onClick={handleSearchPost}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    </Box>
  );
};

export default Search;

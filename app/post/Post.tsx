"use client"
import React, { useState } from "react";
import { Box, TextField, Button, useMediaQuery, useTheme } from "@mui/material";
import PostDialog from "./PostDialog";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: 16,
    backgroundColor: "white",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
  },
});


const Post = () => {
  const [description,setDescription] = useState<string>('');
   const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleDescriptionChange = (event :  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  return (
    <Box
    sx={{
      display: "flex",
      alignItems: "center",
      p: 4,
      height: "100vh",
      flexDirection: "column",
      gap: 4,
      backgroundColor: theme.palette.background.default,
    }}
  >
    <Box
      sx={{
        mt: 6,
        fontSize: isSmallScreen ? 32 : 48,
        fontWeight: "bold",
        color: theme.palette.text.primary,
        textAlign: "center",
      }}
    >
      POST DETAILS
    </Box>
    <Box
      sx={{
        width: isSmallScreen ? "90%" : "50%",
        maxWidth: 600,
      }}
    >
      <StyledTextField
        aria-label="description"
        color="primary"
        multiline
        rows={6}
        name="description"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Add Description"
        variant="outlined"
        fullWidth
      />
    </Box>
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: isSmallScreen ? "column" : "row",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => console.log(description)}
        sx={{
          borderRadius: 16,
        }}
      >
        Post
      </Button>
      <PostDialog description={description} />
    </Box>
    <Box
      sx={{
        mt: 4,
        width: isSmallScreen ? "90%" : "50%",
        maxWidth: 600,
      }}
    ></Box>
  </Box>
  );
};

export default Post;

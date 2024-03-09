import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface likesType {
    value : number
}

const LikeButton = ( {value} : likesType) => {
  const [like, setLike] = React.useState(false);
  const updateLikes = (values : number) => {
    if(like) values += 1;
    return values
  }
  return (
    <Box
    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
  >
      {like ? (
        <FavoriteIcon
          sx={{ cursor: "pointer", color: "red" }}
          onClick={() => setLike(false)}
        />
      ) : (
        <FavoriteBorderIcon
          sx={{
            cursor: "pointer",
            "&:hover": { color: "red" },
          }}
          onClick={() => setLike(true)}
        />
      )}
      <Box sx={{ fontSize: 12 }}>{updateLikes(value)} likes</Box>
    </Box>
  );
};

export default LikeButton;

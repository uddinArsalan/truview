"use client";
import * as React from "react";
import { IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
// import FormLabel from "@mui/material/FormLabel";
// import FormControl from "@mui/material/FormControl";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import RadioGroup from "@mui/material/RadioGroup";
// import Radio from "@mui/material/Radio";
// import { Avatar } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import { AccountCircle } from "@mui/icons-material";
import LikeButton from "./LikeButton";
// import ImageComponent from "./ImageComponent";

import Image from "next/image";
import Paper from "@mui/material/Paper";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/material";
// import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

export default function Feed() {
  const { user, error, isLoading } = useUser();
  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value));
  };

  const jsx = `
<Grid container spacing={${spacing}}>
`;

  return (
    <>
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: 32,
          display: "flex",
          justifyContent: "center",
          p: 4,
          w: "100%",
          wordWrap: "break-word",
        }}
      >
        WELCOME {user?.name?.toUpperCase()}
      </Box>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={spacing}>
            {[16, 27, 32, 45, 7, 9, 237, 58].map((value, index) => (
              <Grid key={value} item>
                <Paper
                  sx={{
                    height: 300,
                    width: 300,
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                >
                  <Image
                    src={`https://source.unsplash.com/1000x1200/?movies&n=${index}`}
                    width={300}
                    height={200}
                    style={{ objectFit: "cover" }}
                    className="rounded-md"
                    alt="Hero Image"
                  />
                  <Box
                    sx={{
                      p: 2,
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident repellendus voluptate cumque laboriosam fugit iste
                    qui necessitatibus natus vero facere, saepe temporibus nemo.
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      p: 1,
                      pb: 0,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        p: 2,
                        gap: 3,
                      }}
                    >
                      <LikeButton value={value}/>
                      <ChatBubbleOutlineIcon
                        sx={{ cursor: "pointer", "&:hover": { color: "blue" } }}
                      />
                    </Box>
                    <AccountCircle sx={{ ml: 2 }} />
                    {/* <Avatar
                      alt="Remy Sharp"
                      src={`/static/images/avatar/${index}.jpg`}
                    /> */}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Grid container>
            <Grid item>
              <FormControl component="fieldset">
                <FormLabel component="legend">spacing</FormLabel>
                <RadioGroup
                  name="spacing"
                  aria-label="spacing"
                  value={spacing.toString()}
                  onChange={handleChange}
                  row
                >
                  {[0, 0.5, 1, 2, 3, 4, 8, 12].map((value) => (
                    <FormControlLabel
                      key={value}
                      value={value.toString()}
                      control={<Radio />}
                      label={value.toString()}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
        <HighlightedCode code={jsx} language="jsx" />
      </Grid> */}
      </Grid>
    </>
  );
}

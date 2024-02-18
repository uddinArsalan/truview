"use client";
import * as React from "react";
import { IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { Avatar } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
// import ImageComponent from "./ImageComponent";

import Image from "next/image";
import Paper from "@mui/material/Paper";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Box } from "@mui/material";
// import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
{
  /* <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
{itemData.map((item) => (
  <ImageListItem key={item.img}>
    <img
      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
      alt={item.title}
      loading="lazy"
    />
  </ImageListItem>
))}
</ImageList> */
}

export default function Feed() {
  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value));
  };

  const jsx = `
<Grid container spacing={${spacing}}>
`;

  return (
    <>
      <Grid sx={{ flexGrow: 1, pt: 4 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={spacing}>
            {[0, 1, 2, 3, 4, 5].map((value, index) => (
              <Grid key={value} item>
                <Paper
                  sx={{
                    height: 300,
                    width: 300,
                    display: "flex",
                    // gap: 2,
                    flexDirection: "column",
                    // zIndex: 0,
                    // alignItems: "center" ,
                    // justifyContent: "center",
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                >
                  <Image
                    src={`https://source.unsplash.com/1000x1200/?landscape&n=${index}`}
                    width={300}
                    height={200}
                    // fill={true}
                    className="rounded-md"
                    alt="Hero Image"
                  />
                  <Box
                    sx={{
                      p: 2,
                      // border : 1,
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      // zIndex: 2,
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident repellendus voluptate cumque laboriosam fugit iste
                    qui necessitatibus natus vero facere, saepe temporibus nemo.
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      // gap : 2,
                      p : 1,
                      pb : 0,
                      // border : 2,
                      justifyContent: "space-between",
                      alignItems: "center",
                      // zIndex: 1,
                      // height: "100%",
                    }}
                  >
                    <IconButton
                      sx={{
                        display: "flex",
                        p : 2,
                        gap : 1,
                      }}
                    >
                      <FavoriteBorderIcon sx={{ cursor: "pointer" , "&:hover": { color: "red" }}} />
                      <ChatBubbleOutlineIcon sx={{ cursor: "pointer" , "&:hover": { color: "blue" }}} />
                    </IconButton>
                    <AccountCircle sx={{ml : 2}}/>
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

"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Box } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { convertImgUrl } from "@/utils";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface propsTypes {
  description: string;
}

export default function PostDialog({ description }: propsTypes) {
  const [open, setOpen] = React.useState(false);
  // const [isLoading, setIsLoading] = React.useState(false);
  const [imageUrlRes, setImageUrl] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState<string | Blob>("");
  const theme = useTheme();

  const postImageToBackBlazeAndGetUrl = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(
        "http://localhost:3000/api/uploadImage/uploads",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response) {
        const imageUrl = await response.json(); // This should be the URL where the image is stored
        console.log("Image uploaded successfully:", imageUrl);
        setOpen(false);
        setImageUrl(imageUrl.url);
        return imageUrl;
        // Set the image URL in your component state or display it in your application
      } else {
        console.error("Error uploading image:");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  console.log(imageUrlRes)

  const postToDatabaseAndShowIt = async () => {
    const imageUrl = imageUrlRes;
    const descriptionOfImage = description;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/createPost",
        { imageUrl, descriptionOfImage }
      );
      if (response) {
        const data = response.data;
        console.log("Successfully posted data to a database ", data);
      }
    } catch (error) {
      console.log("Error posting post to Database", error);
    }
  };

  const handleImageChange = async (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget && e.currentTarget.files && e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0];
      setSelectedFile(file);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
  <Button
    variant="contained"
    color="primary"
    onClick={handleClickOpen}
    sx={{ borderRadius: 16 }}
  >
    Add Photo
  </Button>
  <Dialog
    open={open}
    maxWidth="sm"
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
    fullWidth
  >
    <DialogTitle
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
    >
      {"Choose your photo or video"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText
        id="alert-dialog-slide-description"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          border: 2,
          mt: 2,
          borderColor: theme.palette.primary.main,
          height: 400,
          borderRadius: 2,
          padding: 4,
        }}
      >
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{ borderRadius: 16 }}
        >
          Choose Pic
          <VisuallyHiddenInput
            type="file"
            name="image"
            onChange={(e) => handleImageChange(e)}
          />
        </Button>
        {selectedFile && (
          <Image
            src={convertImgUrl(selectedFile as Blob)}
            alt="selectedImg"
            width={300}
            style={{ objectFit: "cover", borderRadius: 8 }}
            height={300}
          />
        )}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        color="error"
        onClick={handleClose}
        sx={{ borderRadius: 16 }}
      >
        Cancel
      </Button>
      <Button
        color="success"
        onClick={postImageToBackBlazeAndGetUrl}
        sx={{ borderRadius: 16 }}
      >
        Upload
      </Button>
    </DialogActions>
  </Dialog>
</React.Fragment>
);
}

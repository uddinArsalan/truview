"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import image from "../../public/assets/gallery.png";
import { TransitionProps } from "@mui/material/transitions";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";

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

export default function PostDialog() {
  const [open, setOpen] = React.useState(false);
  // const [selectedImg, setSelectedImg] = React.useState<string | Blob>("");

  //   const reader = new FileReader();

  //   reader.onload = (e) => {
  //     setSelectedImg(e.target?.result as string);
  //   };

  //   reader.readAsDataURL(file);

  const handleImageChange = async (e: React.FormEvent<HTMLInputElement>) => {
    // Change ChangeEvent to FormEvent
    if (e.currentTarget && e.currentTarget.files && e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0];
      const formData = new FormData();
      formData.append("image", file);

      // Iterate over the formData entries
      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }
      try {
        const response = await fetch("http://localhost:3000/api/uploadImage", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const imageUrl = await response.json(); // This should be the URL where the image is stored
          console.log("Image uploaded successfully:", imageUrl);
          // Set the image URL in your component state or display it in your application
        } else {
          console.error("Error uploading image:", response.statusText);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
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
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Photo
      </Button>
      <Dialog
        open={open}
        maxWidth="xs"
        TransitionComponent={Transition}
        keepMounted
        sx={{ backgroundImage: `url(${image})` }}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Choose your photo or video"}</DialogTitle>
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
              borderBlockColor: "blue",
              height: 150,
            }}
          >
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Choose Pic
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => handleImageChange(e)}
              />
            </Button>
            {/* {selectedImg && (
              <Image
                src={selectedImg as string}
                alt="selectedImg"
                width={56}
                height={56}
              />
            )} */}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="success">Post</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

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
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Avatar } from "@mui/material";

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
  const [selectedImg, setSelectedImg] = React.useState<string | null>(null);
  const { user } = useUser();
  // console.log(user?.sub);
  const getData = async () => {
    const user_Id = user?.sub;
    try {
      const res = await axios.patch(
        "http://localhost:3000/api/auth/profileUpdate",
        { selectedImg, user_Id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Profile pic updated", res.data);
    } catch (error) {
      console.log("Error updating profile picture", error);
    }
  };

  const handleImageChange = (e: React.FormEvent<HTMLInputElement>) => {
    // Change ChangeEvent to FormEvent
    if (e.currentTarget && e.currentTarget.files && e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImg(e.target?.result as string);
      };

      reader.readAsDataURL(file);
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
      <div onClick={getData}>Click</div>
      <Avatar
        alt="profile pic"
        src={user?.picture || ""}
      />
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
            {selectedImg && (
              <Image
                src={selectedImg}
                alt="selectedImg"
                width={56}
                height={56}
              />
            )}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="success" onClick={handleClose}>
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

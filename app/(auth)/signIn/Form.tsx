"use client";
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

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

const Form = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const { user } = useUser();
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
  // console.log(user?.sub);
  const updateProfilePic = async () => {
    const user_Id = user?.sub;
    try {
      const res = await axios.patch(
        "http://localhost:3000/api/profileUpdate",
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
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        backgroundColor: "white",
        borderRadius: 2,
        // border: 1,
        p: 4,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div>
          You can change your cover pic here,{" "}
          <Box
            sx={{
              color: "blue",
              textDecorationLine: "underline",
              cursor: "pointer",
              fontWeight : "light"
            }}
          >
            select your profile pic
          </Box>
        </div>
        <Box sx={{display : "flex",gap : 2}}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            CHANGE PROFILE PIC
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => handleImageChange(e)}
            />
          </Button>
          <Button variant="outlined" color="error" onClick={updateProfilePic}>
            Upload
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <a href="/api/auth/login">
          <Button variant="contained" color="success" sx={{ w: "100%" }}>
            LogIn
          </Button>
        </a>
        <a href="/api/auth/logout">
          <Button variant="outlined" color="error">
            LogOut
          </Button>
        </a>
      </Box>
    </Box>
  );
};

export default Form;

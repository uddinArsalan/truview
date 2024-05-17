"use client";
import React, { useEffect } from "react";
import { Box, Button, Typography, useMediaQuery, useTheme,IconButton ,Avatar} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { convertImgUrl } from "@/utils";


const Form = () => {
  const [selectedFile, setSelectedFile] = React.useState<string | Blob>("");
  const theme = useTheme();
  const { user } = useUser();

  useEffect(()=> {
    console.log("Inside useEeffect")
    async function updateUserData(){
      if(user){
        console.log("Make Rrequest")
        try{
          const res = await axios.post("http://localhost:3000/api/createUser");

          console.log(res);
        }catch(error){
          console.log("Error creating user")
        }

      }
    }
    updateUserData()
  },[user])

  const handleImageChange = async (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget && e.currentTarget.files && e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0];
      setSelectedFile(file);
    }
  };

  const getProfileUrl = async () => {
    const formData = new FormData();
    formData.append("cover-image", selectedFile);
    try {
      const response = await fetch("http://localhost:3000/api/uploadImage/CoverImages", {
        method: "POST",
        body: formData,
      });
      const data = await response.json()
      return data; 
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const updateProfilePic = async () => {
    const user_Id = user?.sub;
    try {
      const ImageUrlObject = await getProfileUrl();
      const imageUrl = ImageUrlObject.url;
      console.log(imageUrl)
      const res = await axios.patch(
        "http://localhost:3000/api/profileUpdate",
        { imageUrl, user_Id },
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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      bgcolor: 'background.paper',
      p: 4,
      gap: 4,
    }}
  >
    <Typography variant="h5" component="h1" gutterBottom>
      Update Profile Picture
    </Typography>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        bgcolor: 'background.default',
        p: 4,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Avatar
        src={convertImgUrl(selectedFile as Blob)}
        alt="Profile Picture"
        sx={{ width: 80, height: 80 }}
      />
      <Typography variant="body1">
        Select a new profile picture
      </Typography>
      <Button
        component="label"
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        sx={{ borderRadius: 2 }}
      >
        Upload
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={updateProfilePic}
        sx={{ borderRadius: 2 }}
      >
        Save
      </Button>
    </Box>
    <Box sx={{ display: 'flex', gap: 2 }}>
      <IconButton
        component="a"
        href="/api/auth/login"
        sx={{ borderRadius: 2 }}
      >
        <Button variant="contained" color="success">
          Login
        </Button>
      </IconButton>
      <IconButton
        component="a"
        href="/api/auth/logout"
        sx={{ borderRadius: 2 }}
      >
        <Button variant="outlined" color="error">
          Logout
        </Button>
      </IconButton>
    </Box>
  </Box>
  );
};

export default Form;

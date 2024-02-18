"use client"
import React from "react";
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "white",
        borderRadius : 2,
        border: 1,
        p: 4,
      }}
    >
      <FormControl>
        <InputLabel htmlFor="email">Email</InputLabel>
        <OutlinedInput
          id="email"
          placeholder="Enter your email address"
          label="Email"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          placeholder="Enter your Password"
          label="Password"
        />
      </FormControl>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Choose Cover Pic
        <VisuallyHiddenInput type="file" />
      </Button>
      <Button color="success">Submit</Button>
    </Box>
  );
};

export default Form;

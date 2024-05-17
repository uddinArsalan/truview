"use client"
import React from "react";
import Form from "./Form";
import { Box ,Typography,useTheme} from "@mui/material";

const SignInPage = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        // height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: theme.palette.background.default,
        p: 4,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color={theme.palette.text.primary}
        mb={4}
      >
        Welcome to Truview
      <Form />
      </Typography>
    </Box>
  );
};

export default SignInPage;

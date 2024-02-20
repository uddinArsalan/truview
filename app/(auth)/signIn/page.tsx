import React from "react";
import Navbar from "@/app/components/Navbar";
import Form from "./Form";
import { Box } from "@mui/material";

const page = () => {
  return (
    <Box sx={{  height: 800,gap: 3 }}>
    {/* <Navbar /> */}
    <Box sx={{fontFamily : "monospace",fontSize : 48,fontWeight : "bold",display : "flex",justifyContent : "center",m: 3}}>Sign In</Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent : "center",
        //   border : 4,
          // height : "60%"
        }}
      >
        <Form />
      </Box>
    </Box>
  );
};

export default page;

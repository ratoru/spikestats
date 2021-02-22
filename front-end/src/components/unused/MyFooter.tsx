import React from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

export const MyFooter = () => {
  return (
    <Box mt={12}>
      <Divider />
      <Typography align="center">
        <a
          href="https://ratoru.com"
          style={{ textDecoration: "inherit", color: "inherit" }}
        >
          Created by Raphael
        </a>
      </Typography>
    </Box>
  );
};

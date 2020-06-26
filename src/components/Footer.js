import React from "react";
import { Box, Container, makeStyles } from "@material-ui/core";

function Footer(props) {
  const classes = useStyles();

  return (
    <Box component="footer" bgcolor="primary.main">
      <Container component="header" className={classes.header}>
        Footer
      </Container>
    </Box>
  );
}

const useStyles = makeStyles({
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },
});

export default Footer;

import React from "react";

import { Container, Box, makeStyles } from "@material-ui/core";

import LinkButton from "./custom/LinkButton";
import { Link } from "react-router-dom";

function Header() {
  const classes = useStyles();
  return (
    <Box component="header" bgcolor="primary.main">
      <Container className={classes.header}>
        <Link to="/" className={classes.logo}>
          <img src="/logo.png" alt="Bio Bid Logo" />
          BioBid
        </Link>
        <Box className={classes.buttons}>
          <LinkButton to="/dashboard">Dashboard</LinkButton>
          {/* <LinkButton to="/login">
            Logout
            <img src="/logo.png" alt="Login" width="30" />
          </LinkButton> */}
        </Box>
      </Container>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },
  logo: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: theme.spacing(0, 1, 0, 0),
    fontWeight: "bold",
    fontSize: "1.6rem",
    color: "white",
    textDecoration: "none",
    "& img": {
      width: 80,
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

export default Header;

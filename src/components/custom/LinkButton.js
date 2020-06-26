import React from "react";
import { ListItem } from "@material-ui/core";
import { Link } from "react-router-dom";

function LinkButton({ children, to, ...theRest }) {
  return (
    <ListItem button component={Link} to={to} {...theRest}>
      {children}
    </ListItem>
  );
}

export default LinkButton;

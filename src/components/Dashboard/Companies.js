import React from "react";
import { useQuery } from "@apollo/client";
import { GET_COMPANIES } from "../../data/queries";
import LoadingIndicator from "../custom/LoadingIndicator";
import { makeStyles, Box } from "@material-ui/core";
import LinkButton from "../custom/LinkButton";

function Companies(props) {
  const classes = useStyles();
  const { loading, data } = useQuery(GET_COMPANIES);

  if (loading) return <LoadingIndicator />;

  return (
    <Box className={classes.content}>
      <Box className={classes.header}>
        <h2>Company List</h2>
        <Box>
          <LinkButton className={classes.button} to="/dashboard/add-new">
            + Add New Company
          </LinkButton>
        </Box>
      </Box>
      <Box className={classes.companyList}></Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(0, 2),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export default Companies;

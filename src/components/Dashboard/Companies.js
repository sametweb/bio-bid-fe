import React from "react";
import { useQuery } from "@apollo/client";
import { GET_COMPANIES } from "../../data/queries";
import LoadingIndicator from "../custom/LoadingIndicator";
import { makeStyles, Box } from "@material-ui/core";
import LinkButton from "../custom/LinkButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

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
      <Box className={classes.companyList}>
        <List className={classes.root}>
          {data.companies.map((company) => {
            return (
              <React.Fragment key={company.id}>
                <Divider component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <img
                      style={{ width: 120 }}
                      alt={company.name}
                      src={company.logoURL}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={company.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {company.overview}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },

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

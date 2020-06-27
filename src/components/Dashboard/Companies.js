import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { makeStyles, Box, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";

import LoadingIndicator from "../custom/LoadingIndicator";
import LinkButton from "../custom/LinkButton";
import { GET_COMPANIES } from "../../data/queries";

function Companies(props) {
  const classes = useStyles();
  const { loading, data } = useQuery(GET_COMPANIES);
  const history = useHistory();

  return (
    <Box className={classes.content}>
      <Box className={classes.header}>
        <h2>Service Provider Companies</h2>
        <Box>
          <LinkButton className={classes.button} to="/dashboard/add-new">
            + Add New Company
          </LinkButton>
        </Box>
      </Box>
      <Box>
        <List className={classes.root}>
          {loading ? (
            <LoadingIndicator />
          ) : (
            data.companies.map((company) => {
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
                            color="textPrimary"
                          >
                            {company.overview}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        history.push(`/dashboard/edit/${company.id}`)
                      }
                    >
                      Edit
                    </Button>
                  </ListItem>
                </React.Fragment>
              );
            })
          )}
        </List>
      </Box>
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
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default Companies;

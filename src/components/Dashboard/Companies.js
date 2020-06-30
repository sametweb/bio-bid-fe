import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useHistory, useLocation, Link } from "react-router-dom";

import { makeStyles, Box, IconButton, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import EditIcon from "@material-ui/icons/Edit";
import DeleteCompanyModel from "./DeleteCompanyModal";
import { GET_COMPANIES } from "../../data/queries";
import LoadingIndicator from "../custom/LoadingIndicator";

function Companies(props) {
  const classes = useStyles();
  const [open, setOpen] = useState({ status: false, id: "", name: "" });
  const { hash } = useLocation();

  const handleClickOpen = (company) => {
    setOpen({ status: true, id: company.id, name: company.name });
  };

  const handleClose = (args) => {
    setOpen({ status: false, id: "", name: "" });
    args.deleted && refetch();
  };

  const { loading, data, refetch, networkStatus } = useQuery(GET_COMPANIES, {
    notifyOnNetworkStatusChange: true,
  });
  const history = useHistory();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Box className={classes.content}>
      <Box className={classes.header}>
        <h2>Service Provider Companies</h2>
        <Box>
          <Button
            component={Link}
            to="#add-new-company"
            color="primary"
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
          >
            Add New Company
          </Button>
        </Box>
      </Box>
      <Box>
        <List className={classes.root}>
          {loading && networkStatus !== 4 ? (
            <LoadingIndicator />
          ) : (
            <>
              {networkStatus === 4 && <LoadingIndicator />}
              {data?.companies.map((company) => {
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
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => history.push(`#edit-company`, company)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleClickOpen(company)}>
                        <DeleteForeverIcon color="secondary" />
                      </IconButton>
                      {open.status && company.id === open.id && (
                        <DeleteCompanyModel
                          open={open}
                          handleClose={handleClose}
                        />
                      )}
                    </ListItem>
                  </React.Fragment>
                );
              })}
            </>
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

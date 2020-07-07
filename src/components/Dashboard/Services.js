import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import {
  Box,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CloseIcon from "@material-ui/icons/Close";

import DeleteServiceModal from "./DeleteServiceModal";
import LoadingIndicator from "../custom/LoadingIndicator";
import { GET_SERVICES } from "../../data/queries";
import { CREATE_SERVICE_ITEM, EDIT_SERVICE_ITEM } from "../../data/mutations";

function Services() {
  const [open, setOpen] = useState({ status: false, id: "" });

  const handleClickOpen = (service) => {
    setOpen({ status: true, id: service.id, name: service.name });
  };

  const handleClose = () => {
    setOpen({ status: false, id: "" });
  };

  const classes = useStyles();
  const [edit, setEdit] = useState("");
  const [input, setInput] = useState("");
  const [newInput, setNewInput] = useState("");

  const { loading, data } = useQuery(GET_SERVICES, {
    notifyOnNetworkStatusChange: true,
  });

  const [createServiceItem, { loading: createLoading }] = useMutation(
    CREATE_SERVICE_ITEM,
    {
      onCompleted: () => setNewInput(""),
      refetchQueries: ["serviceItems"],
      notifyOnNetworkStatusChange: true,
    }
  );

  const [updateServiceItem, { loading: updateLoading }] = useMutation(
    EDIT_SERVICE_ITEM,
    {
      onCompleted: () => setEdit(""),
      refetchQueries: ["serviceItems"],
      notifyOnNetworkStatusChange: true,
    }
  );

  const onAddSubmit = (e) => {
    e.preventDefault();
    createServiceItem({ variables: { name: newInput } });
  };

  const onEditSubmit = (e, name) => {
    e.preventDefault();
    updateServiceItem({ variables: { name, updated_name: input } });
  };

  const onEditButton = (service) => {
    setEdit(edit && edit === service.id ? "" : service.id);
    setInput(service.name);
  };

  return (
    <Box className={classes.content}>
      <Box className={classes.header}>
        <h2>Services</h2>
        <form onSubmit={onAddSubmit}>
          {createLoading ? (
            <CircularProgress />
          ) : (
            <TextField
              name="input"
              label="Add New Service"
              variant="outlined"
              size="small"
              color="primary"
              value={newInput}
              onChange={(e) => setNewInput(e.target.value)}
              style={{ width: 250 }}
            />
          )}
        </form>
      </Box>
      <Box>
        {loading && <LoadingIndicator />}
        <List className={classes.root}>
          {data?.serviceItems.map((service) => {
            return (
              <ListItem key={service.id} dense button>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                {!updateLoading && edit === service.id ? (
                  <form onSubmit={(e) => onEditSubmit(e, service.name)}>
                    <TextField
                      autoFocus
                      name="input"
                      variant="outlined"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      size="small"
                    />
                  </form>
                ) : updateLoading && edit === service.id ? (
                  <CircularProgress size={28} />
                ) : (
                  <ListItemText id={service.id} primary={service.name} />
                )}
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => onEditButton(service)}
                  >
                    {edit === service.id ? <CloseIcon /> : <EditIcon />}
                  </IconButton>
                  <IconButton onClick={() => handleClickOpen(service)}>
                    <DeleteForeverIcon color="secondary" />
                  </IconButton>
                  {open.status && service.id === open.id && (
                    <DeleteServiceModal open={open} handleClose={handleClose} />
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
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
}));

export default Services;

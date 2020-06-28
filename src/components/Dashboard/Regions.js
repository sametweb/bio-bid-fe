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
import PublicIcon from "@material-ui/icons/Public";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CloseIcon from "@material-ui/icons/Close";

import DeleteRegionModal from "./DeleteRegionModal";
import LoadingIndicator from "../custom/LoadingIndicator";
import { GET_REGIONS } from "../../data/queries";
import { EDIT_REGION } from "../../data/mutations";

function Regions(props) {
  const [open, setOpen] = useState({ status: false, id: "" });

  const handleClickOpen = (region) => {
    setOpen({ status: true, id: region.id, name: region.name });
  };

  const handleClose = () => {
    setOpen({ status: false, id: "" });
  };

  const classes = useStyles();
  const [edit, setEdit] = useState("");
  const [input, setInput] = useState("");

  const { loading, data } = useQuery(GET_REGIONS);

  const [updateRegion, { loading: updatedLoading }] = useMutation(EDIT_REGION, {
    onCompleted: () => setEdit(""),
    onError: () => setEdit(""),
  });

  const onEditButton = (region) => {
    setEdit(edit && edit === region.id ? "" : region.id);
    setInput(region.name);
  };

  const onEditSubmit = (e, name) => {
    e.preventDefault();
    const updated_name = e.target.input.value;
    updateRegion({ variables: { name, updated_name } });
  };
  return (
    <Box className={classes.content}>
      <Box className={classes.header}>
        <h2>Regions</h2>
      </Box>
      <Box>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <List className={classes.root}>
            {data?.regions.map((region) => {
              return (
                <ListItem key={region.id} dense button>
                  <ListItemIcon>
                    <PublicIcon />
                  </ListItemIcon>
                  {!updatedLoading && edit === region.id ? (
                    <form onSubmit={(e) => onEditSubmit(e, region.name)}>
                      <TextField
                        autoFocus
                        name="input"
                        variant="outlined"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        size="small"
                      />
                    </form>
                  ) : updatedLoading && edit === region.id ? (
                    <CircularProgress size={28} />
                  ) : (
                    <ListItemText id={region.id} primary={region.name} />
                  )}
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => onEditButton(region)}
                    >
                      {edit === region.id ? <CloseIcon /> : <EditIcon />}
                    </IconButton>
                    <IconButton onClick={() => handleClickOpen(region)}>
                      <DeleteForeverIcon color="secondary" />
                    </IconButton>
                    {open.status && region.id === open.id && (
                      <DeleteRegionModal
                        open={open}
                        handleClose={handleClose}
                      />
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        )}
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

export default Regions;

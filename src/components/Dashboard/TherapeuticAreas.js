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
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CloseIcon from "@material-ui/icons/Close";

import DeleteTherapeuticModal from "./DeleteTherapeuticModal";
import LoadingIndicator from "../custom/LoadingIndicator";
import { GET_THERAPEUTICS } from "../../data/queries";
import { EDIT_THERAPEUTIC } from "../../data/mutations";

function TherapeuticAreas(props) {
  const [open, setOpen] = useState({ status: false, id: "" });

  const handleClickOpen = (therapeutic) => {
    setOpen({ status: true, id: therapeutic.id, name: therapeutic.name });
  };

  const handleClose = () => {
    setOpen({ status: false, id: "" });
  };

  const classes = useStyles();
  const [edit, setEdit] = useState("");
  const [input, setInput] = useState("");

  const { loading, data } = useQuery(GET_THERAPEUTICS);

  const [updateTherapeutic, { loading: updatedLoading }] = useMutation(
    EDIT_THERAPEUTIC,
    {
      onCompleted: () => setEdit(""),
      onError: () => setEdit(""),
    }
  );

  const onEditButton = (therapeutic) => {
    setEdit(edit && edit === therapeutic.id ? "" : therapeutic.id);
    setInput(therapeutic.name);
  };

  const onEditSubmit = (e, name) => {
    e.preventDefault();
    const updated_name = e.target.input.value;
    updateTherapeutic({ variables: { name, updated_name } });
  };
  return (
    <Box className={classes.content}>
      <Box className={classes.header}>
        <h2>Therapeutic Areas</h2>
      </Box>
      <Box>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <List className={classes.root}>
            {data?.therapeutics.map((therapeutic) => {
              return (
                <ListItem key={therapeutic.id} dense button>
                  <ListItemIcon>
                    <LocalHospitalIcon />
                  </ListItemIcon>
                  {!updatedLoading && edit === therapeutic.id ? (
                    <form onSubmit={(e) => onEditSubmit(e, therapeutic.name)}>
                      <TextField
                        autoFocus
                        name="input"
                        variant="outlined"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        size="small"
                      />
                    </form>
                  ) : updatedLoading && edit === therapeutic.id ? (
                    <CircularProgress size={28} />
                  ) : (
                    <ListItemText
                      id={therapeutic.id}
                      primary={therapeutic.name}
                    />
                  )}
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => onEditButton(therapeutic)}
                    >
                      {edit === therapeutic.id ? <CloseIcon /> : <EditIcon />}
                    </IconButton>
                    <IconButton onClick={() => handleClickOpen(therapeutic)}>
                      <DeleteForeverIcon color="secondary" />
                    </IconButton>
                    {open.status && therapeutic.id === open.id && (
                      <DeleteTherapeuticModal
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

export default TherapeuticAreas;

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { DELETE_THERAPEUTIC } from "../../data/mutations";

function DeleteTherapeuticModal({ open, handleClose }) {
  const [deleteTherapeutic, { loading }] = useMutation(DELETE_THERAPEUTIC, {
    onCompleted: () => handleClose(),
    refetchQueries: ["therapeutics"],
  });

  return (
    <Dialog
      open={open.status}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Do you want to delete {open.name}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          "{open.name}" will be removed from company profiles.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        {loading ? (
          <CircularProgress size={36} />
        ) : (
          <>
            <Button onClick={handleClose} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={() =>
                deleteTherapeutic({ variables: { name: open.name } })
              }
              color="secondary"
              variant="outlined"
              autoFocus
            >
              Delete
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default DeleteTherapeuticModal;

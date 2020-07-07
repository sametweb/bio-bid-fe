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
import { DELETE_SERVICE_ITEM } from "../../data/mutations";

function DeleteServiceModal({ open, handleClose }) {
  const [deleteServiceItem, { loading }] = useMutation(DELETE_SERVICE_ITEM, {
    onCompleted: () => handleClose(),
    refetchQueries: ["serviceItems"],
    notifyOnNetworkStatusChange: true,
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
          "{open.name}" and all related specialtes/sub-specialties will be
          removed from company profiles.
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
                deleteServiceItem({ variables: { name: open.name } })
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

export default DeleteServiceModal;

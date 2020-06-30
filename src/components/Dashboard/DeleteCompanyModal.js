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
import { DELETE_COMPANY } from "../../data/mutations";

function DeleteCompanyModel({ open, handleClose }) {
  const [deleteCompany, { loading }] = useMutation(DELETE_COMPANY, {
    onCompleted: () => handleClose({ deleted: true }),
    refetchQueries: ["companies"],
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
          "{open.name}" and all the associated information will be removed.
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
              onClick={() => deleteCompany({ variables: { id: open.id } })}
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

export default DeleteCompanyModel;

import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

function ConfirmationDialog(props) {
    const { message, onCancel, onAccept, open } = props;

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
            open={open}
        >
            <DialogTitle id="confirmation-dialog-title">Confirm</DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" gutterBottom>
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={onAccept} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;

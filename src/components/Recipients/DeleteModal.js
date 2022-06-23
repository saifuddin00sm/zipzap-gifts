import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecipients } from "../../hooks/recipients";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DeleteModal = ({ open, setOpen, recipientId }) => {
  const { removeRecipient } = useRecipients();
  const navigate = useNavigate();
  const onClose = () => {
    setOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await removeRecipient(recipientId);
    navigate("/recipients");
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are You Sure You Want To Delete This Recipient?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            They Will Be Removed From Your Recipient List And Any Scheduled
            Gifts For Them Will Be Voided. You Will Be Refunded For Any Gifts
            You Have Already Paid For, For This Recipient
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={onClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DeleteModal;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipients } from "../../hooks/recipients";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import RecipientSuccess from "./RecipientSuccess";

const DeleteModal = ({ open, setOpen, recipientId }) => {
  const { removeRecipient } = useRecipients();
  let navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await removeRecipient(recipientId);
    setSuccess(true);
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
          <Button onClick={onClose} autofocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* to be replaced with alert notifications soon */}
    </>
  );
};
export default DeleteModal;

const style = {
  width: "40%",
  borderRadius: "9px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  "& .closeBtn": {
    display: "flex",
    justifyContent: "flex-end",
    padding: "13px 13px 0px 0px",
    "& .mainBtn": {
      background: "#343436",
      display: "flex",
      justifyContent: "center",
      borderRadius: "100%",
      alignItems: "center",
      width: "30px",
      cursor: "pointer",
      height: "30px",
    },
  },

  "& .successHead": {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "30px",
    lineHeight: "45px",
    textTransform: "capitalize",
    color: "#343436",
    marginBottom: "15px",
  },
  "& .subHead": {
    fontStyle: "normal",
    fontWeight: 300,
    fontSize: "20px",
    lineHeight: "30px",
    color: "#000000",
    marginBottom: "20px",
  },
};

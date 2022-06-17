import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeRecipient } from "../../hooks/recipients";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RecipientSuccess from "./RecipientSuccess";

const DeleteModal = ({ open, setOpen, recipientId }) => {
  console.log(recipientId);
  let navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const onClose = () => {
    setOpen(false);
    // navigate("/recipients");
    // setSuccess(true);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await removeRecipient(["id", recipientId]);
    setSuccess(true);
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Box className="closeBtn">
            <IconButton className="mainBtn" onClick={() => setOpen(false)}>
              <ClearIcon sx={{ color: "#ffff" }} />
            </IconButton>
          </Box>
          <Box sx={{ p: 4, paddingTop: 0 }}>
            <Typography
              variant="h5"
              className="successHead"
              sx={{ textAlign: "center" }}
            >
              Are You Sure You Want To Delete This Recipient?
            </Typography>
            <Box sx={{ textAlign: "center", padding: "20px 0 60px 0" }}>
              <Button variant="contained" onClick={handleDelete}>
                Confirm Delete
              </Button>
            </Box>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", fontWeight: 500, fontSize: "12px" }}
            >
              They Will Be Removed From Your Recipient List And Any Scheduled
              Gifts For Them Will Be Voided. You Will Be Refunded For Any Gifts
              You Have Already Paid For, For This Recipient
            </Typography>
          </Box>
        </Box>
      </Modal>
      <RecipientSuccess
        text="Recipient Deletion Successful!"
        subText="Successfully Deleted This Recipient. You Will Be Refunded For Any You Will Be Refunded For Any Gifts You Have Already Paid For, For This Recipient "
        open={success}
        setOpen={setSuccess}
        close={() => navigate("/recipients")}
        button={false}
      />
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

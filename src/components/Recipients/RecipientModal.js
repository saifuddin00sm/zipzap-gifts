import React from "react";
import AddRecipient from "./AddRecipient";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  width: "100%",
  minHeight: "80vh",
  maxHeight: "80vh",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "5px",
  },

  "&::-webkit-scrollbar-track": {
    background: "#ffff",
  },

  "&::-webkit-scrollbar-thumb": {
    background: "#98B1C2",
    borderRadius: "15px",
  },
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
      width: "34px",
      cursor: "pointer",
      height: "34px",
    },
  },
};

const RecipientModal = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  return (
    <Box sx={style}>
      <Box className="closeBtn">
        <IconButton className="mainBtn" onClick={handleClose}>
          <ClearIcon sx={{ color: "#ffff" }} />
        </IconButton>
      </Box>
      <Box sx={{ p: 4, paddingTop: 0 }}>
        <AddRecipient />
      </Box>
    </Box>
  );
};
export default RecipientModal;

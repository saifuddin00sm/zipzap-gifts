import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const RecipientSuccess = ({ text, subText, open, onClose, button }) => {
  const handleClose = () => onClose();

  return (
    <Modal open={open}>
      <Box sx={style}>
        <Box className="closeBtn">
          <IconButton className="mainBtn" onClick={handleClose}>
            <ClearIcon sx={{ color: "#ffff" }} />
          </IconButton>
        </Box>
        <Box sx={{ p: 4, paddingTop: 0 }}>
          <Typography variant="h5" className="successHead">
            {text}
          </Typography>
          <Typography variant="body2" className="subHead">
            {subText}
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            {button ? (
              <Button
                id="confetti-id"
                variant="contained"
                onClick={handleClose}
              >
                Send Email
              </Button>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default RecipientSuccess;

const style = {
  textAlign: "center",
  borderRadius: "9px",
  width: "40%",
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
      width: "34px",
      cursor: "pointer",
      height: "34px",
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
    fontSize: "16px",
    lineHeight: "30px",
    color: "#000000",
    marginBottom: "20px",
  },
};

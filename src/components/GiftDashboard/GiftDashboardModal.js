import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 1,
  "& .closeBtn": {
    display: "flex",
    justifyContent: "flex-end",
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
  borderRadius: "10px",
  "& .congrats_text": {
    lineHeight: "96px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    color: "#343436",
    padding: "12px",
  },
};

export default function BasicModal({ open, setOpen }) {
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box className="closeBtn">
          <IconButton
            className="mainBtn"
            sx={{ padding: 0 }}
            onClick={handleClose}
          >
            <ClearIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
        <Box className="congrats_text">
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            No Recipients Uploaded
          </Typography>
          <Typography>
            To start creating gifts, upload a recipient that you can ship a gift
            to!
          </Typography>
        </Box>
        <Box sx={{ padding: 2, textAlign: "right" }}>
          <Button onClick={() => navigate("/recipients")} size="small">
            Go to Recipient Page
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

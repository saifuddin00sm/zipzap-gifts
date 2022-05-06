import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import Link from "@mui/material/Link";
import ConfettiExplosion from "react-confetti-explosion";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
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
    fontSize: "20px",
    lineHeight: "30px",
    textTransform: "capitalize",
    color: "#000000",
    marginBottom: "20px",
  },
};

const RecipientSuccess = ({ text, subText, open, setOpen }) => {
  const handleClose = () => setOpen(!open);
  return (
    <Modal open={open} onClose={handleClose}>
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
          <ConfettiExplosion colors={["#abc6bd", "#c5d5e2", "#abc4d6"]} />
          <Typography variant="body2" className="subHead">
            {subText}
          </Typography>
          {/* <Box sx={{ textAlign: "center" }}>
            <Button variant="contained">
              <Link
                sx={{ textDecoration: "none", color: "#000" }}
                href="mailto:connect@zipzapgifts.com"
              >
                Send Email
              </Link>
            </Button>
          </Box> */}
        </Box>
      </Box>
    </Modal>
  );
};

export default RecipientSuccess;

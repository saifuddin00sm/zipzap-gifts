import React, { useState, forwardRef } from "react";
import { API } from "aws-amplify";
import { Auth } from "@aws-amplify/auth";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RecipientSuccess = ({ text, subText, open, onClose, button, ids }) => {
  const [messageStatus, setMessageStatus] = useState("success");
  const [message, setMessage] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const handleClose = () => onClose();
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
    handleClose();
  };

  const sendEmails = async () => {
    if (emailLoading) {
      return;
    }

    setEmailLoading(true);
    try {
      const currentSession = await Auth.currentSession();
      const accessToken = currentSession.getAccessToken();
      const token = accessToken.getJwtToken();
      const { count } = await API.post("recipients", "/favorites/survey", {
        body: { token, ids },
      });

      if (count === ids.length) {
        setMessageStatus("success");
        setMessage("Successfully emailed recipients!");
      } else {
        setMessageStatus("warning");
        setMessage(
          "Unable to send emails at this time. Please try again later."
        );
      }
    } catch (error) {
      setMessageStatus("error");
      setMessage("Error sending email!");
    }
    setSnackOpen(true);
    setEmailLoading(false);
  };

  return (
    <Modal open={open}>
      <Box sx={style}>
        <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={handleSnackClose}
        >
          <Alert
            onClose={handleClose}
            severity={messageStatus}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
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
            {button && (
              <Button
                id="confetti-id"
                variant="contained"
                onClick={sendEmails}
                disabled={emailLoading}
              >
                {emailLoading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  `Send Email`
                )}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default RecipientSuccess;

const style = {
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

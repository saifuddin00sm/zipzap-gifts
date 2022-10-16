import React, { forwardRef, useState } from "react";
import { API } from "aws-amplify";
import { Auth } from "@aws-amplify/auth";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Email from "@mui/icons-material/Email";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Root = styled("div")(({ theme }) => ({
  marginTop: "20px",
  "& .infos": {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    width: "100%",
    marginBottom: "25px",
    "& .keys": {
      color: "#343436",
      fontWeight: 500,
      fontSize: "20px",
      lineHight: "30px",
    },
  },
}));

const questionMap = {
  "What is your favorite color out of these colors:": "Favorite Color",
  "What category does your favorite snack belong to:": "Favorite Snack Type",
  "What are your favorite pieces of swag?": "Favorite Swag Item",
  "Which hobbies do you enjoy the most?": "Hobbies",
  "Anything we should know? (A gift specialist will contact you for more info)":
    "Allergies/ Aversions/ Goals",
  "Shirt Size": "Shirt Size",
};

const GiftProfile = ({ info }) => {
  const { id, favorites = [], suggestedGift } = info;
  const [messageStatus, setMessageStatus] = useState("success");
  const [message, setMessage] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const sendEmail = async () => {
    if (emailLoading) {
      return;
    }

    setEmailLoading(true);
    try {
      const currentSession = await Auth.currentSession();
      const accessToken = currentSession.getAccessToken();
      const token = accessToken.getJwtToken();
      const { count } = await API.post("recipients", "/favorites/survey", {
        body: { token, ids: [id] },
      });

      if (count === 1) {
        setMessageStatus("success");
        setMessage("Successfully emailed recipient!");
      } else {
        setMessageStatus("warning");
        setMessage(
          "Unable to send email at this time. Please try again later."
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
    <Root>
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={messageStatus}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Box>
        {favorites.length > 0 ? (
          favorites.map(
            ({ type, value }) =>
              questionMap[type.trim()] && (
                <Box className="infos" key={type}>
                  <Typography className="keys">
                    {questionMap[type.trim()]}
                  </Typography>
                  <Typography>{value || "N/A"}</Typography>
                </Box>
              )
          )
        ) : (
          <Box>
            <Typography className="keys">
              No favorites yet! Send email again?
              <IconButton
                sx={{ color: "#263238" }}
                aria-label="send email"
                component="span"
                onClick={sendEmail}
              >
                {emailLoading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <Email />
                )}
              </IconButton>
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h3" sx={{ marginBottom: "14px" }}>
          Suggested Gifts
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 2 }}>
          {suggestedGift.map(({ giftName, image: { alt, src } = {}, id }) => (
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={id}>
              <Card
                sx={{
                  height: "223px",
                  maxWidth: "223px",
                  width: "100%",
                  background: "#FFFFFF",
                  border: "1px solid #C4C4C4",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  borderRadius: "5px",
                }}
              >
                <CardContent>
                  <Typography sx={{ mb: 2, textTransform: "capitalize" }}>
                    {giftName}
                  </Typography>
                  <Box>
                    <img height="100%" width="100%" src={src} alt={alt} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Root>
  );
};

export default GiftProfile;

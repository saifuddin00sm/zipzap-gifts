import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Root = styled("div")(({ theme }) => ({
  "& .util_box": {
    background: "#F4F4F4",
    padding: "30px",
    borderRadius: "10px",
  },
  "& .gift_cards": {
    textAlign: "center",
    "& .title": {
      textTransform: "capitalize",
      fontWeight: 500,
      fontSize: "22px",
      lineHeight: "33px",
    },
    "& .subTitle": {
      textTransform: "capitalize",
      fontWeight: 400,
      fontSize: "15px",
      lineHeight: "22px",
    },
  },
}));

const UtilizationAndDefault = ({ utilization, defaultGifts }) => {
  return (
    <Root>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item lg={6} xl={6} md={6} xs={12} sm={12}>
          <Box className="util_box">
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                fontSize: "25px",
                lineHeight: "38px",
                textTransform: "capitalize",
                textAlign: "center",
                marginBottom: "20px",
                color: "#747474",
              }}
            >
              Monthly Gift Utilization
            </Typography>
            <Box
              sx={{
                maxHeight: "300px",
                maxWidth: "300px",
                width: "100%",
                margin: "auto",
              }}
            >
              <CircularProgressbar
                value={utilization}
                text={`${utilization}%`}
                strokeWidth={20}
                styles={buildStyles({
                  pathColor: "#ABC4D6",
                  textColor: "#747474",
                })}
              />
            </Box>
            <Typography
              sx={{
                fontWeight: 300,
                fontSize: "20px",
                lineHeight: "20px",
                textTransform: "capitalize",
                textAlign: "center",
                marginTop: "30px",
                color: "#000",
              }}
            >
              {utilization ? (
                `You've sent ${utilization}% of your Recipients a gift this month`
              ) : (
                <>
                  You haven't sent any Gifts this Month.
                  <br />
                  <Link to="/gifts" className="button-link">
                    Send one now!
                  </Link>
                </>
              )}
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={6} xl={6} md={6} xs={12} sm={12}>
          <Box className="gift_cards">
            {defaultGifts.length > 0 &&
              defaultGifts.map(
                ({ status, giftType, image: { src, alt } = {}, id }) => (
                  <Card
                    key={id}
                    sx={{
                      mb: 2,
                      background: "#FFFFFF",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      borderRadius: "10px",
                    }}
                  >
                    <CardContent>
                      <Typography className="title" variant="h5">
                        {giftType}
                      </Typography>
                      <Typography className="subTitle" variant="h5">
                        {status.map((event) => (
                          <React.Fragment key={event}>
                            {event}
                            <br />
                          </React.Fragment>
                        ))}
                      </Typography>
                      <img height="200" width="230" src={src} alt={alt} />
                    </CardContent>
                  </Card>
                )
              )}
          </Box>
        </Grid>
      </Grid>
    </Root>
  );
};

export default UtilizationAndDefault;

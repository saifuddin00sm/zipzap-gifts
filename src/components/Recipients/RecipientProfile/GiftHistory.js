import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const GiftHistory = ({ info }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 2 }}>
        {info.map(({ date, giftName, image: { alt, src } = {}, id }) => (
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={id}>
            <Typography sx={{ mb: 1 }}>{date}</Typography>
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
                  <img
                    height="100%"
                    width="100%"
                    src="https://img.freepik.com/free-photo/gift-box-present-isolated_63260-52.jpg?w=2000"
                    alt={alt}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GiftHistory;

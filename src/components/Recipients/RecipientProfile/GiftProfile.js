import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";

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

const GiftProfile = ({ info }) => {
  const { favFood, favColor, favItems, hobbies, suggestedGift } = info;
  console.log(suggestedGift);
  return (
    <Root>
      <Box>
        <Box className="infos">
          <Typography className="keys">Favorite</Typography>
          <Typography>{favFood === null ? "N/A" : favFood}</Typography>
        </Box>
        <Box className="infos">
          <Typography className="keys">Favorite Color</Typography>
          <Typography>{favColor === null ? "N/A" : favColor}</Typography>
        </Box>
        <Box className="infos">
          <Typography className="keys">Hobbies</Typography>
          <Typography>
            {hobbies.length === 0
              ? "N/A"
              : hobbies.map((i) => (
                  <Typography key={i} variant="body">
                    {i + ", "}
                  </Typography>
                ))}
          </Typography>
        </Box>
        <Box className="infos">
          <Typography className="keys">Favorite Items</Typography>
          <Typography>
            {favItems.length === 0
              ? "N/A"
              : favItems.map((i) => (
                  <Typography key={i} variant="body">
                    {i + ", "}
                  </Typography>
                ))}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h3" sx={{ marginBottom: "14px" }}>
          Suggested Gifts
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 2 }}>
          {suggestedGift.map(({ giftName, image: { alt, src } = {}, id }) => (
            <Grid item xs={3} key={id}>
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
    </Root>
  );
};

export default GiftProfile;

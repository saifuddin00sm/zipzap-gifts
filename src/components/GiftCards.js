import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box, createTheme, ThemeProvider } from "@mui/system";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Toolbar)(({ theme }) => ({
  background: "#ffff",
  borderRadius: "10px",
  boxShadow: "2px 4px 8px 2px rgba(0, 0, 0, 0.25)",
  width: "254px",
  height: "100%",
  "& .inner_card": {
    textAlign: "center",
    fontfamily: "Poppins",
    fontStyle: "normal",
    color: "#505050",
    padding: "15px 0",
    "& .select_btn": {
      width: "146px",
      height: "29px",
      background: "#ABC4D6",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "5px",
      border: "none",
      outline: "none",
      cursor: "pointer",
      fontWeight: 500,
      fontSize: "15px",
      lineHeight: "22px",
      textAlign: "center",
      textTransform: "capitalize",
    },
  },
}));

const theme = createTheme({
  palette: {
    background: {
      paper: "#E1E1E1",
      white: "#fffff",
    },
  },
});

const GiftCards = ({ data }) => {
  console.log("data from cards", data);
  return (
    <>
      {/* Recommend gitfs */}
      <ThemeProvider theme={theme}>
        <Typography
          sx={{
            fontfamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "40px",
            lineHeight: "60px",
            color: "#505050",
            margin: "20px",
          }}
          variant="h4"
        >
          Recommend Gifts
        </Typography>
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 9,
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={5}>
            {data &&
              data?.listGifts?.items.map((item) => (
                <>
                  <Grid key={item.id} item columns={{ xs: 4, sm: 8, md: 12 }}>
                    <StyledCard>
                      <div className="inner_card">
                        {item?.pictures?.items.map(({ src, alt }) => (
                          <img
                            style={{
                              width: "100%",
                              height: "174px",
                              objectFit: "cover",
                            }}
                            src={src}
                            alt={alt}
                          />
                        ))}
                        <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
                          {item.name}
                        </Typography>
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {item.description}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "20px",
                            lineHeight: "30px",
                            color: "#98B1C2",
                            margin: "3px 0px",
                          }}
                        >
                          ${item.price}
                        </Typography>
                        <button className="select_btn">Select</button>
                      </div>
                    </StyledCard>
                  </Grid>
                </>
              ))}
          </Grid>
        </Box>
      </ThemeProvider>
      {/* Most popular gifts */}
      <ThemeProvider theme={theme}>
        <Typography
          sx={{
            fontfamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "40px",
            lineHeight: "60px",
            color: "#505050",
            margin: "20px",
          }}
          variant="h4"
        >
          Most popular Gifts
        </Typography>
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 9,
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={5}>
            {data &&
              data?.listGifts?.items.map((item) => (
                <>
                  <Grid key={item.id} item columns={{ xs: 4, sm: 8, md: 12 }}>
                    <StyledCard>
                      <div className="inner_card">
                        {item?.pictures?.items.map(({ src, alt }) => (
                          <img
                            style={{
                              width: "100%",
                              height: "174px",
                              objectFit: "cover",
                            }}
                            src={src}
                            alt={alt}
                          />
                        ))}
                        <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
                          {item.name}
                        </Typography>
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {item.description}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "20px",
                            lineHeight: "30px",
                            color: "#98B1C2",
                            margin: "3px 0px",
                          }}
                        >
                          ${item.price}
                        </Typography>
                        <button className="select_btn">Select</button>
                      </div>
                    </StyledCard>
                  </Grid>
                </>
              ))}
          </Grid>
        </Box>
      </ThemeProvider>
      {/* other gifts */}
      <ThemeProvider theme={theme}>
        <Typography
          sx={{
            fontfamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "40px",
            lineHeight: "60px",
            color: "#505050",
            margin: "20px",
          }}
          variant="h4"
        >
          Other Gifts
        </Typography>
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 9,
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={5}>
            {data &&
              data?.listGifts?.items.map((item) => (
                <>
                  <Grid key={item.id} item columns={{ xs: 4, sm: 8, md: 12 }}>
                    <StyledCard>
                      <div className="inner_card">
                        {item?.pictures?.items.map(({ src, alt }) => (
                          <img
                            style={{
                              width: "100%",
                              height: "174px",
                              objectFit: "cover",
                            }}
                            src={src}
                            alt={alt}
                          />
                        ))}
                        <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
                          {item.name}
                        </Typography>
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {item.description}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "20px",
                            lineHeight: "30px",
                            color: "#98B1C2",
                            margin: "3px 0px",
                          }}
                        >
                          ${item.price}
                        </Typography>
                        <button className="select_btn">Select</button>
                      </div>
                    </StyledCard>
                  </Grid>
                  <Grid key={item.id} item columns={{ xs: 4, sm: 8, md: 12 }}>
                    <StyledCard>
                      <div className="inner_card">
                        {item?.pictures?.items.map(({ src, alt }) => (
                          <img
                            style={{
                              width: "100%",
                              height: "174px",
                              objectFit: "cover",
                            }}
                            src={src}
                            alt={alt}
                          />
                        ))}
                        <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
                          {item.name}
                        </Typography>
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {item.description}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "20px",
                            lineHeight: "30px",
                            color: "#98B1C2",
                            margin: "3px 0px",
                          }}
                        >
                          ${item.price}
                        </Typography>
                        <button className="select_btn">Select</button>
                      </div>
                    </StyledCard>
                  </Grid>
                </>
              ))}
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default GiftCards;

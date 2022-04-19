import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";

const options = [
  { opt: "To Recipients Home Address", price: "22", selected: true, id: 1 },
  {
    opt: "To central office: 200 2000 S America",
    price: "12",
    id: 2,
    selected: false,
  },
];

const cards = [
  {
    cardName: "credit card",
    ending: 1993993,
    exp: "12/2065",
    name: "Name on Card: Victoria Skylan Black",
    isSelected: false,
  },
  {
    cardName: "credit card",
    ending: 9393939,
    exp: "12/2065",
    name: "Name on Card: Victoria Skylan Black",
    isSelected: true,
  },
  {
    cardName: "credit card",
    ending: 9923939,
    exp: "12/2065",
    name: "Name on Card: Victoria Skylan Black",
    isSelected: false,
  },
  {
    cardName: "credit card",
    ending: 4393939,
    exp: "12/2065",
    name: "Name on Card: Victoria Skylan Black",
    isSelected: true,
  },
];

const Root = styled("div")(({ theme }) => ({
  "& .headings_text": {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "30px",
    textTransform: "capitalize",
    marginBottom: "15px",
    color: "#343436",
  },
  "& .card_container": {
    display: "flex",
    gap: "30px",
    marginBottom: "65px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
    "& .small_card": {
      background: "#FFFFFF",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: " 10px",
      padding: "15px",
      width: "164px",
      height: "128px",
    },
    "& .big_text": {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "30px",
      lineHeight: "45px",
      textTransform: "capitalize",
      color: "#C4C4C4",
      marginBottom: "15px",
    },
  },

  "& .shipping_cards": {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    "& .address": {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "21px",
      textTransform: "capitalize",
      color: "#343436",
    },
    "& .prices": {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "15px",
      lineHeight: "22px",
      textTransform: "capitalize",
      color: "#747474",
    },
  },

  "& .credit_card": {
    background: "#ABC4D6",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    width: "100%",
    height: "100%",
    "& .card_top": {
      height: "67px",
      padding: "10px",
      borderRadius: "10px 10px 0px 0px",
    },
    "& .card_bottom": {
      height: "67px",
      padding: "10px",
      borderRadius: "0px 0px 10px 10px",
      "& h6": {
        color: "#343436",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "14px",
        lineHeight: "21px",
        textTransform: "capitalize",
      },
      "& p": {
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "10px",
        lineHeight: "15px",
        textTransform: "capitalize",
        color: "#343436",
      },
    },
  },
  "& .inner_card": {
    padding: 0,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    marginBottom: "30px",
    [theme.breakpoints.down(1260)]: {
      gridTemplateColumns: "1fr",
    },
    gap: "20px",
  },
  "& .totalPrice": {
    textAlign: "right",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "30px",
    lineHeight: "45px",
    textTransform: "capitalize",
    color: "#C4C4C4",
    marginTop: "15px",
    [theme.breakpoints.down(768)]: {
      fontSize: "20px",
    },
  },

  "& .package_btn": {
    textDecoration: "none",
  },
}));

const Checkout = () => {
  return (
    <Root>
      <Grid
        container
        sx={{ justifyContent: "center" }}
        rowSpacing={1}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={6}>
          <Box sx={{ background: "#F4F4F4", padding: "30px" }}>
            <Typography className="headings_text" variant="h6">
              Gift Summary
            </Typography>
            <Box className="card_container">
              <Box className="small_card">
                <img src="" alt="Gift images" />
              </Box>
              <Box>
                <Typography variant="h5" className="big_text">
                  X 3 recipients
                </Typography>
                <Button variant="outlined">
                  <Link
                    className="package_btn"
                    href="mailto:connect@zipzapgifts.com"
                  >
                    Want Custom Packaging
                  </Link>
                </Button>
              </Box>
            </Box>
            <Box className="shipping_container">
              <Typography className="headings_text" variant="h6">
                Choose Shipping Option
              </Typography>
              <Box>
                {options.map(({ opt, price, selected, id }) => (
                  <Box
                    key={id}
                    className="shipping_cards"
                    sx={{ background: selected ? "#ABC6BD" : "#fff" }}
                  >
                    <Typography className="address" variant="body">
                      {opt}
                    </Typography>
                    <Typography className="prices" variant="body2">
                      {"$" + price}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              background: "#fffff",
              padding: "30px",
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography className="headings_text" variant="h6">
                Choose Credit Card Option
              </Typography>
              <Box className="credit_cards">
                <Box className="inner_card">
                  {cards.map(({ cardName, exp, name, isSelected, ending }) => (
                    <Box key={ending} className="credit_card">
                      <Box
                        className="card_top"
                        sx={{ background: isSelected ? "#F1F1F1" : "#C5D6E2" }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            textAlign: "right",
                            textTransform: "capitalize",
                          }}
                        >
                          {cardName}
                        </Typography>
                      </Box>
                      <Box
                        className="card_bottom"
                        sx={{ background: isSelected ? "#DEDEDE" : "#ABC4D6" }}
                      >
                        <Typography variant="h6">Ending In {ending}</Typography>
                        <Typography variant="body2">Exp: {exp}</Typography>
                        <Typography variant="body2">{name}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Button variant="outlined">Add New Card</Button>
              </Box>
            </Box>
            <Typography variant="body" className="totalPrice">
              Total Price: $288.33
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Root>
  );
};

export default Checkout;

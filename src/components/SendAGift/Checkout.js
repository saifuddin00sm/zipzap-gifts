import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Payment from "./Payment";
import S3Image from "../S3Image";

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
      overflow: "hidden",
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
      height: "70px",
      padding: "10px",
      borderRadius: "10px 10px 0px 0px",
    },
    "& .card_bottom": {
      height: "78px",
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

const Checkout = ({
  recipientCount,
  giftImage,
  giftPrice,
  shippingAddressType,
  paymentID,
  noShippingFee,
  setInput,
  submitPayment,
  setSubmitPayment,
  setSuccess,
}) => {
  const [total, setTotal] = useState(0);
  const recipientShippingPrice = 14;
  const officeShippingPrice = 10;

  let shippingCost = 0;
  if (shippingAddressType === "RECIPIENT_ADDRESS") {
    shippingCost = recipientShippingPrice;
  } else if (shippingAddressType === "COMPANY_ADDRESS") {
    shippingCost = officeShippingPrice;
  }
  if (noShippingFee) {
    shippingCost = 0;
  }
  const totalPrice = (
    giftPrice * recipientCount +
    shippingCost * recipientCount
  ).toFixed(2);
  useEffect(() => {
    if (total !== totalPrice) {
      setInput("totalPrice", totalPrice);
      setTotal(totalPrice);
    }
  }, [setInput, total, totalPrice]);

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
                <S3Image
                  component="img"
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                  s3key={giftImage}
                  alt="Gift images"
                />
              </Box>
              <Box>
                <Typography variant="h5" className="big_text">
                  X {recipientCount} recipients
                </Typography>
                <Button variant="outlined">
                  <Link
                    className="package_btn"
                    href="mailto:connect@zipzapgifts.com?subject=Custom Packaging&body=Hi, Zip Zap!%0D%0A%0D%0AI am interested in custom packaging for my gift!"
                  >
                    Want Custom Packaging ?
                  </Link>
                </Button>
              </Box>
            </Box>
            {!noShippingFee && (
              <Box className="shipping_container">
                <Typography className="headings_text" variant="h6">
                  Choose Shipping Option
                </Typography>
                <Box>
                  <Box
                    onClick={() =>
                      setInput("shippingAddressType", "RECIPIENT_ADDRESS")
                    }
                    className="shipping_cards"
                    sx={{
                      background:
                        shippingAddressType === "RECIPIENT_ADDRESS"
                          ? "#ABC6BD"
                          : "#fff",
                    }}
                  >
                    <Typography className="address" variant="body">
                      To Recipient's Address
                    </Typography>
                    <Typography className="prices" variant="body2">
                      ${recipientShippingPrice}
                    </Typography>
                  </Box>
                  <Box
                    onClick={() =>
                      setInput("shippingAddressType", "COMPANY_ADDRESS")
                    }
                    className="shipping_cards"
                    sx={{
                      background:
                        shippingAddressType === "COMPANY_ADDRESS"
                          ? "#ABC6BD"
                          : "#fff",
                    }}
                  >
                    <Typography className="address" variant="body">
                      Ship Gifts to Company Address
                    </Typography>
                    <Typography className="prices" variant="body2">
                      ${officeShippingPrice}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
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
              <Payment
                submitPayment={submitPayment}
                paymentID={paymentID}
                setPaymentID={(id) => setInput("paymentID", id)}
                setSuccess={setSuccess}
                setSubmitPayment={setSubmitPayment}
              />
            </Box>
            <Typography variant="body" className="totalPrice">
              Estimated Total: ${totalPrice}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Root>
  );
};

export default Checkout;

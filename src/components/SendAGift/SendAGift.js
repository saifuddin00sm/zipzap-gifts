import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Header from "../Header";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import ChooseGift from "./ChooseGift";
import GiftDetails from "./GiftDetails";
import ChooseRecipient from "./ChooseRecipient";
import Checkout from "./Checkout";
import { styled } from "@mui/material/styles";
import SuccessModal from "./SuccessModal";

const Steppers = styled(Stepper)(({ theme }) => ({
  "& .Mui-active": { color: "red" },
  "& .Mui-completed": { color: "green" },
  "& .Mui-disabled .MuiStep-root": { color: "cyan" },
}));

const style = {
  background: "#ABC4D6",
  padding: "50px",
  "& .innerBox": {
    "& .heading": {
      "& > h6": {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "35px",
        lineHeight: "52px",
        textTransform: "capitalize",

        color: "#FFFFFF",
      },
      backgroundColor: "#343436",
      padding: "10px",
      textAlign: "center",
    },
    "& .box_contents": {
      background: "#ffff",
      padding: "20px",
    },
  },
};

const steps = [
  "Choose a gift",
  "Gift details",
  "Choose recipients",
  "Check out",
];

const SendAGift = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      setActiveStep(steps.length - 1);
      setOpen(true);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Container component="main">
        <Header>
          <Typography variant="h1">Send a Gift</Typography>
        </Header>
        <Box sx={style}>
          <Box className="innerBox">
            <Steppers
              activeStep={activeStep}
              sx={{ width: "180px", marginBottom: "20px", marginLeft: "auto" }}
            >
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}></StepLabel>
                  </Step>
                );
              })}
            </Steppers>
            <Box className="heading">
              <Typography variant="h6">{steps[activeStep]}</Typography>
            </Box>
            <Box className="box_contents">
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{ overflow: "auto", maxHeight: "964px", height: "100%" }}
                >
                  {activeStep === 0 ? (
                    <ChooseGift />
                  ) : activeStep === 1 ? (
                    <GiftDetails />
                  ) : activeStep === 2 ? (
                    <ChooseRecipient />
                  ) : (
                    activeStep === 3 && <Checkout />
                  )}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Create Gift" : "Next"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <SuccessModal open={open} setOpen={setOpen} />
    </>
  );
};

export default SendAGift;

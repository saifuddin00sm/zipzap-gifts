import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Header from "../Header";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import GiftDetails from "./GiftDetails";
import ChooseRecipient from "./ChooseRecipient";
import Checkout from "./Checkout";
import SuccessModal from "./SuccessModal";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import SelectGifts from "./SelectGifts";

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
  const [selectedGift, setSelectedGift] = useState("");

  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      const nextStep = prevActiveStep + 1;
      if (nextStep >= steps.length) {
        setOpen(true);
        return steps.length - 1;
      }
      return nextStep;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const StepComponent = () => {
    let component = null;
    switch (activeStep) {
      case 0:
        component = (
          <SelectGifts
            selectedGift={selectedGift}
            setSelectedGift={setSelectedGift}
          />
        );
        break;
      case 1:
        component = <GiftDetails />;
        break;
      case 2:
        component = <ChooseRecipient />;
        break;
      case 3:
      default:
        component = <Checkout />;
        break;
    }
    return component;
  };

  return (
    <>
      <Container component="main">
        <Header>
          <Typography variant="h1">Send a Gift</Typography>
        </Header>
        <Box sx={style}>
          <Box className="innerBox">
            <Stepper
              activeStep={activeStep}
              sx={{ width: "180px", marginBottom: "20px", marginLeft: "auto" }}
            >
              {steps.map((label) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}></StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <Box className="heading">
              <Typography sx={{ display: "inline-block" }} variant="h6">
                {steps[activeStep]}
              </Typography>
              {steps[activeStep] === "Choose a gift" && (
                <Tooltip
                  enterTouchDelay={0}
                  title='Select a Gift to send to one or more of your recipients by pressing "Select Gift"'
                  placement="top"
                >
                  <InfoIcon sx={{ color: "#fff", marginLeft: "15px" }} />
                </Tooltip>
              )}
            </Box>
            <Box className="box_contents">
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{ overflow: "auto", maxHeight: "964px", height: "100%" }}
                >
                  <StepComponent />
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

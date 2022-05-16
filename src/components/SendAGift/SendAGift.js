import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Header from "../Header";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GiftDetails from "./GiftDetails";
import ChooseRecipient from "./ChooseRecipient";
import Checkout from "./Checkout";
import SuccessModal from "./SuccessModal";
import GiftStepper from "./GiftStepper";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import SelectGifts from "./SelectGifts";
import { Link } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import { useReward } from "react-rewards";

const Input = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "100%",
    padding: "5px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const Root = styled("div")(({ theme }) => ({
  background: "#ABC4D6",
  padding: "20px 50px 50px",
  [theme.breakpoints.down("md")]: {
    padding: "25px",
  },
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
      "& .topItems": {
        margin: "5px 0px 41px 0",
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        width: "100%",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
        },
      },
      "& .infoBox": {
        padding: "10px",
        background: "#FFFFFF",
        border: "1px solid #000000",
        maxWidth: "475px",
        width: "100%",
        "& p": {
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "21px",
          letterSpacing: "0.03em",
          color: "#6D6E70",
        },
      },
      background: "#ffff",
      padding: "20px",
    },
  },
}));

const steps = [
  "Choose a Gift",
  "Gift Details",
  "Choose Recipients",
  "Check Out",
];

const SendAGift = () => {
  const top = useRef(null);
  const [selectedGift, setSelectedGift] = useState("");

  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);

  const { reward } = useReward("send-gift-success-id", "confetti", {
    colors: ["#abc6bd", "#c5d5e2", "#abc4d6"],
    startVelocity: 25,
    spread: 85,
    elementSize: 16,
  });

  const handleNext = () => {
    top.current.scrollIntoView({ behavior: "smooth" });
    setActiveStep((prevActiveStep) => {
      const nextStep = prevActiveStep + 1;
      if (nextStep >= steps.length) {
        setOpen(true);
        // Wait a bit for the success modal to render
        setTimeout(reward, 100);
        return steps.length - 1;
      }
      return nextStep;
    });
  };

  const handleBack = () => {
    top.current.scrollIntoView({ behavior: "smooth" });
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
      <Container sx={{ px: 0 }} component="main">
        <Header>
          <Typography variant="h1">Send a Gift</Typography>
        </Header>
        <Root ref={top}>
          <Box className="innerBox">
            <GiftStepper
              steps={steps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
            <Box className="heading">
              <Typography sx={{ display: "inline-block" }} variant="h6">
                {steps[activeStep]}
              </Typography>
              {steps[activeStep] === steps[0] && (
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
                {activeStep === 0 && (
                  <Box className="topItems">
                    <Box>
                      <Input fullWidth placeholder="Search for a gift" />
                    </Box>
                    <Box className="infoBox">
                      <Typography>
                        Don't see The perfect gift? Email{" "}
                        <Link href="mailto:connect@zipzapgifts.com">
                          connect@zipzapgifts.com
                        </Link>{" "}
                        to have a custom gift created just for you
                      </Typography>
                    </Box>
                  </Box>
                )}
                <Box
                  sx={{ overflow: "auto", maxHeight: "600px", height: "100%" }}
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
        </Root>
      </Container>
      <SuccessModal open={open} setOpen={setOpen} />
    </>
  );
};

export default SendAGift;

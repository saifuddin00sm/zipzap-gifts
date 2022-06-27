import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CircleIcon from "@mui/icons-material/Circle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";

function GiftStepIcon({ active, completed, className }) {
  let icon = <CircleIcon />;
  if (completed) {
    icon = <CheckCircleIcon />;
  }
  if (active) {
    icon = <CircleTwoToneIcon />;
  }

  return (
    <Box
      sx={{ color: "common.white" }}
      ownerState={{ active }}
      className={className}
    >
      {icon}
    </Box>
  );
}

const GiftStepper = ({ steps, activeStep, setActiveStep }) => {
  return (
    <Stepper
      sx={{ justifyContent: "flex-end" }}
      alternativeLabel
      activeStep={activeStep}
    >
      {steps.map((label, index) => (
        <Step sx={{ flex: 0 }} key={label}>
          <StepLabel
            StepIconComponent={GiftStepIcon}
            onClick={() => setActiveStep(index)}
          ></StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default GiftStepper;

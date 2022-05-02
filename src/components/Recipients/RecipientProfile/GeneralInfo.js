import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

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

const GeneralInfo = ({ info }) => {
  const {
    birthday,
    shippingAddress: { address1, address2, city, state, zip } = {},
    jobTitle,
    startDate,
    department: { name: departmentName } = {},
  } = info;

  return (
    <Root>
      <Box className="infos">
        <Typography className="keys">Birthday</Typography>
        <Typography>{birthday === null ? "N/A" : birthday}</Typography>
      </Box>
      <Box className="infos">
        <Typography className="keys">Address</Typography>
        <Typography>{`${address1}${
          address2 ? ` ${address2}` : ""
        }, ${city}, ${state}, ${zip}`}</Typography>
      </Box>
      <Box className="infos">
        <Typography className="keys">Job Title</Typography>
        <Typography>{jobTitle === null ? "N/A" : jobTitle}</Typography>
      </Box>
      <Box className="infos">
        <Typography className="keys">Date Started</Typography>
        <Typography>{startDate === null ? "N/A" : startDate}</Typography>
      </Box>
      <Box className="infos">
        <Typography className="keys">Department</Typography>
        <Typography>
          {departmentName === null ? "N/A" : departmentName}
        </Typography>
      </Box>
      <Box>
        <Button>Edit Information</Button>
      </Box>
    </Root>
  );
};

export default GeneralInfo;

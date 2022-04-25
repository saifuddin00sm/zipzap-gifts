import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import RecipientSuccess from "./RecipientSuccess";

const Root = styled("div")(({ theme }) => ({
  "& .recipientHead": {
    marginBottom: "10px",
    "& h4": {
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "45px",
      lineHeight: "68px",
      textTransform: "capitalize",
      color: "#343436",
    },
  },
}));

const Input = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    fontSize: 16,
    width: "100%",
    padding: "5px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
  },
}));

const Label = styled("label")(({ theme }) => ({
  fontSize: "16px",
  color: "#000",
  fontWeight: 600,
}));

const FormControl = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
}));

const AddRecipient = () => {
  // recipient success modal condition
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    //   TODO: make this "handleSubmit" function async await when making api call, set a loader, twick between the modals.
    e.preventDefault();
    // once the data is sent to the backend you can turn on the success modal with this set method.
    setOpen(true);
  };
  return (
    <>
      <Root>
        <Box className="recipientHead">
          <Typography variant="h4">New recipient</Typography>
        </Box>
        <Divider />
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{ marginTop: "20px" }}
        >
          <FormControl>
            <Label>First Name</Label>
            <Input placeholder="First Name" />
          </FormControl>
          <FormControl>
            <Label>Last Name</Label>
            <Input placeholder="Last Name" />
          </FormControl>
          <FormControl>
            <Label>Birthday</Label>
            <Stack>
              <Input
                id="date"
                label="Birthday"
                type="date"
                defaultValue="2017-05-24"
                sx={{ width: 220 }}
                inputlabelprops={{
                  shrink: true,
                }}
              />
            </Stack>
          </FormControl>
          <FormControl>
            <Label>Address</Label>
            <Input placeholder="Address" />
          </FormControl>
          <FormControl>
            <Label>City</Label>
            <Input placeholder="City" />
          </FormControl>
          <FormControl>
            <Label>State (i.e UT):</Label>
            <Input placeholder="State" />
          </FormControl>
          <FormControl>
            <Label>Zip Code</Label>
            <Input type="number" placeholder="Zip" />
          </FormControl>
          <FormControl>
            <Label>Job Title</Label>
            <Input placeholder="Job Title" />
          </FormControl>
          <FormControl>
            <Label>Date Started</Label>
            <Stack>
              <Input
                id="date"
                label="Started"
                type="date"
                defaultValue="2017-05-24"
                sx={{ width: 220 }}
                inputlabelprops={{
                  shrink: true,
                }}
              />
            </Stack>
          </FormControl>
          <FormControl>
            <Label>Department (optional)</Label>
            <Input placeholder="Department" />
          </FormControl>
          <FormControl
            sx={{
              justifyContent: "center",
              marginTop: "28px",
              marginBottom: 0,
            }}
          >
            <Button variant="contained" type="submit">
              Create New Recipient
            </Button>
          </FormControl>
        </Box>
      </Root>
      <RecipientSuccess open={open} setOpen={setOpen} />
    </>
  );
};

export default AddRecipient;

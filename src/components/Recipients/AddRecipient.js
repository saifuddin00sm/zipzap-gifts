import React, { useState } from "react";

import Box from "@mui/material/Box";
import { Divider, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import RecipientSuccess from "./RecipientSuccess";
import { useRecipients } from "../../hooks/recipients";

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

const FormControl = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
}));

const initialState = {
  birthday: new Date("01-01-1990"),
  email: "",
  firstName: "",
  jobTitle: "",
  lastName: "",
  phone: "",
  shippingAddress: {
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  },
  recipientType: "",
  startDate: new Date("01-01-2020"),
};

const AddRecipient = () => {
  const { addRecipient } = useRecipients();
  const [formValidation, setFormValidation] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = useState(initialState);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
    validateForm();
  }

  const handleSubmit = () => {
    if (formValidation) {
      addRecipient({ ...formState });
      setFormState(initialState);
      setOpen(true);
    }
  };

  const validateForm = () => {
    if (
      formState.lastName !== "" &&
      formState.shippingAddress.address1 !== "" &&
      formState.shippingAddress.zip !== ""
    ) {
      setFormValidation(true);
    }
  };

  return (
    <>
      <Root>
        <Box className="recipientHead">
          <Typography variant="h4">New Recipient</Typography>
        </Box>
        <Divider />
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{ marginTop: "20px" }}
        >
          <FormControl>
            <Typography
              style={{ fontSize: "16px", color: "#000", fontWeight: 600 }}
            >
              First Name
            </Typography>
            <TextField
              variant="standard"
              onChange={(event) => setInput("firstName", event.target.value)}
              value={formState.firstName}
              placeholder="First Name"
            ></TextField>
          </FormControl>
          <FormControl>
            <Typography
              style={{ fontSize: "16px", color: "#000", fontWeight: 600 }}
            >
              Last Name*
            </Typography>
            <TextField
              variant="standard"
              required
              onChange={(event) => setInput("lastName", event.target.value)}
              value={formState.lastName}
              placeholder="Last Name"
            />
          </FormControl>
          <FormControl>
            <Typography
              style={{ fontSize: "16px", color: "#000", fontWeight: 600 }}
            >
              Email{" "}
            </Typography>
            <TextField
              onChange={(event) => setInput("email", event.target.value)}
              value={formState.email}
              placeholder="Email"
              label=""
              variant="standard"
            />
          </FormControl>
          <FormControl>
            <Typography
              style={{ fontSize: "16px", color: "#000", fontWeight: 600 }}
            >
              Birthday
            </Typography>
            <Stack>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label=""
                  inputFormat="MM/dd/yyyy"
                  value={formState.birthday}
                  onChange={(value) => setInput("birthday", value)}
                  renderInput={(params) => (
                    <TextField
                      style={{ width: "165px" }}
                      variant="standard"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Stack>
          </FormControl>
          <FormControl>
            <Typography
              style={{ fontSize: "16px", color: "#000", fontWeight: 600 }}
            >
              Address*
            </Typography>
            <TextField
              variant="standard"
              required
              onChange={(event) =>
                setInput(
                  (formState.shippingAddress.address1 = event.target.value)
                )
              }
              value={formState.shippingAddress.address1}
              placeholder="Address"
            ></TextField>
          </FormControl>
          <FormControl>
            <Typography></Typography>
            <TextField
              onChange={(event) =>
                setInput(
                  (formState.shippingAddress.address2 = event.target.value)
                )
              }
              value={formState.shippingAddress.address2}
              placeholder="Address 2"
              label=""
              variant="standard"
            />
          </FormControl>
          <FormControl>
            <Typography
              style={{ fontSize: "16px", color: "#000", fontWeight: 600 }}
            >
              City
            </Typography>
            <TextField
              variant="standard"
              onChange={(event) =>
                setInput((formState.shippingAddress.city = event.target.value))
              }
              value={formState.shippingAddress.city}
              placeholder="City"
            ></TextField>
          </FormControl>
          <FormControl>
            <Typography
              style={{ fontSize: "16px", color: "#000", fontWeight: 600 }}
            >
              State (i.e UT)
            </Typography>
            <TextField
              variant="standard"
              onChange={(event) =>
                setInput((formState.shippingAddress.state = event.target.value))
              }
              value={formState.shippingAddress.state}
              placeholder="State"
            ></TextField>
          </FormControl>
          <FormControl>
            <Typography
              style={{ fontSize: "16px", color: "#000", fontWeight: 600 }}
            >
              Zip Code*
            </Typography>
            <TextField
              variant="standard"
              required
              onChange={(event) =>
                setInput((formState.shippingAddress.zip = event.target.value))
              }
              value={formState.shippingAddress.zip}
              placeholder="Zip"
              label=""
            ></TextField>
          </FormControl>
          <FormControl>
            <Typography
              style={{ fontSize: "16px", color: "#000", fontWeight: 600 }}
            >
              Job Title
            </Typography>
            <TextField
              variant="standard"
              onChange={(event) => setInput("jobTitle", event.target.value)}
              value={formState.jobTitle}
              placeholder="Job Title"
            ></TextField>
          </FormControl>
          <FormControl>
            <Typography
              style={{ fontSize: "16px", color: "#000", fontWeight: 600 }}
            >
              Date Started
            </Typography>
            <Stack>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label=""
                  inputFormat="MM/dd/yyyy"
                  value={formState.startDate}
                  onChange={(value) => setInput("startDate", value)}
                  renderInput={(params) => (
                    <TextField
                      style={{ width: "165px" }}
                      variant="standard"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Stack>
          </FormControl>

          {/* Adding back in later */}
          {/* <FormControl>
            <Typography
              style={{ fontSize: "16px", color: "#000", fontWeight: 600 }}
            >
              Department (optional)
            </Typography>
            <Input placeholder="Department" />
          </FormControl> */}
          <FormControl
            sx={{
              justifyContent: "center",
              marginTop: "28px",
              marginBottom: 0,
            }}
          >
            <Button
              onClick={handleSubmit}
              variant="contained"
              type="submit"
              disabled={!formValidation}
            >
              Create New Recipient
            </Button>
          </FormControl>
        </Box>
      </Root>
      <RecipientSuccess
        text="Recipient Added Successfully!"
        subText="Successfully Added Recipient, Send An Email To Gather Information For Customized Gifting"
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default AddRecipient;

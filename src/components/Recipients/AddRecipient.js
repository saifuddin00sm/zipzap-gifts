import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Divider, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
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

const Label = styled(InputLabel)(({ theme }) => ({
  fontSize: "16px",
  color: "#000",
  fontWeight: 600,
  width: 200,
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
  const [isFormValid, setIsFormValid] = useState(false);
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState(initialState);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
    validateForm();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      addRecipient({ ...formState });
      setFormState(initialState);
      setOpen(true);
    }
  };

  const validateForm = () => {
    if (
      formState.lastName !== "" &&
      formState.shippingAddress.address1 !== "" &&
      formState.shippingAddress.zip !== "" &&
      formState.email !== ""
    ) {
      setIsFormValid(true);
    }
  };

  function setAddressInput(key, value) {
    setFormState({
      ...formState,
      shippingAddress: { ...formState.shippingAddress, [key]: value },
    });
    validateForm();
  }

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
            <Label
              style={{
                fontSize: "16px",
                color: "#000",
                fontWeight: 600,
              }}
            >
              First Name
            </Label>
            <TextField
              variant="standard"
              fullWidth={true}
              onChange={(event) => setInput("firstName", event.target.value)}
              value={formState.firstName}
              placeholder="First Name"
            ></TextField>
          </FormControl>
          <FormControl>
            <Label>Last Name*</Label>
            <TextField
              variant="standard"
              fullWidth={true}
              required
              onChange={(event) => setInput("lastName", event.target.value)}
              value={formState.lastName}
              placeholder="Last Name"
            />
          </FormControl>
          <FormControl>
            <Label>Email*</Label>
            <TextField
              fullWidth={true}
              onChange={(event) => setInput("email", event.target.value)}
              value={formState.email}
              placeholder="Email"
              label=""
              variant="standard"
            />
          </FormControl>
          <FormControl>
            <Label>Birthday</Label>
            <DatePicker
              label=""
              inputFormat="MM/dd/yyyy"
              value={formState.birthday}
              onChange={(value) => setInput("birthday", value)}
              renderInput={(params) => (
                <TextField fullWidth="true" variant="standard" {...params} />
              )}
            />
          </FormControl>
          <FormControl>
            <Label>Address*</Label>
            <TextField
              variant="standard"
              fullWidth={true}
              required
              onChange={(event) =>
                setAddressInput("address1", event.target.value)
              }
              value={formState.shippingAddress.address1}
              placeholder="Address"
            ></TextField>
          </FormControl>
          <FormControl>
            <Label></Label>
            <TextField
              onChange={(event) =>
                setAddressInput("address2", event.target.value)
              }
              value={formState.shippingAddress.address2}
              placeholder="Address 2"
              label=""
              variant="standard"
              fullWidth={true}
            />
          </FormControl>
          <FormControl>
            <Label>City</Label>
            <TextField
              variant="standard"
              fullWidth={true}
              onChange={(event) => setAddressInput("city", event.target.value)}
              value={formState.shippingAddress.city}
              placeholder="City"
            ></TextField>
          </FormControl>
          <FormControl>
            <Label style={{ fontSize: "16px", color: "#000", fontWeight: 600 }}>
              State (i.e UT)
            </Label>
            <TextField
              variant="standard"
              fullWidth={true}
              onChange={(event) => setAddressInput("state", event.target.value)}
              value={formState.shippingAddress.state}
              placeholder="State"
            ></TextField>
          </FormControl>
          <FormControl>
            <Label>Zip Code*</Label>
            <TextField
              variant="standard"
              fullWidth={true}
              required
              onChange={(event) => setAddressInput("zip", event.target.value)}
              value={formState.shippingAddress.zip}
              placeholder="Zip"
              label=""
            ></TextField>
          </FormControl>
          <FormControl>
            <Label>Job Title</Label>
            <TextField
              variant="standard"
              fullWidth={true}
              onChange={(event) => setInput("jobTitle", event.target.value)}
              value={formState.jobTitle}
              placeholder="Job Title"
            ></TextField>
          </FormControl>
          <FormControl>
            <Label>Date Started</Label>
            <DatePicker
              label=""
              inputFormat="MM/dd/yyyy"
              value={formState.startDate}
              onChange={(value) => setInput("startDate", value)}
              renderInput={(params) => (
                <TextField fullWidth="true" variant="standard" {...params} />
              )}
            />
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
              disabled={!isFormValid}
            >
              Create New Recipient
            </Button>
          </FormControl>
        </Box>
      </Root>
      <Modal open={open} setOpen={setOpen}>
        <RecipientSuccess
          text="Recipient Added Successfully!"
          subText="Successfully Added Recipient, Send An Email To Gather Information For Customized Gifting"
          open={open}
          setOpen={setOpen}
        />
      </Modal>
    </>
  );
};
export default AddRecipient;

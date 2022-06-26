import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Input } from "@mui/material";
import TextField from "@mui/material/TextField";

import { useRecipients } from "../../../hooks/recipients";

const EditRecipientProfile = ({ info, isEdit, setIsEdit }) => {
  const {
    id,
    firstName,
    lastName,
    birthday,
    email,
    shippingAddress: { address1, address2, city, state, zip } = {},
    jobTitle,
    startDate,
    // department,
  } = info;

  const initialState = {
    id: info.id,
    firstName: info.firstName,
    lastName: info.lastName,
    birthday: info.birthday,
    email: info.email,
    jobTitle: info.jobTitle,
    phone: info.phone,
    shippingAddress: {
      address1: info.address1,
      address2: info.address2,
      city: info.city,
      state: info.state,
      zip: info.zip,
    },

    startDate: info.startDate,
    // department: info.department,
  };

  const { updateRecipient } = useRecipients();

  const [formState, setFormState] = useState(initialState);
  const [isFormValid, setIsFormValid] = useState(false);

  const [editBirthday, setEditBirthday] = useState(birthday);
  const [editAddress1, setEditAddress1] = useState(
    `${address1} ${address2} ${city} ${state} ${zip}`
  );
  const [editJobTitle, setEditJobTitle] = useState(jobTitle);
  const [editStartDate, setEditStartDate] = useState(startDate);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

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

  const handleClick = () => {
    setIsEdit(false);
  };

  const handleSubmit = async (e) => {
    console.log({ formState });
    console.log("clicked");
    e.preventDefault();
    await updateRecipient({ ...formState });
    setIsEdit(false);
    setFormState(initialState);
  };

  return (
    <Root>
      <Box onSubmit={handleSubmit} component="form" sx={{ marginTop: "20px" }}>
        <Box className="infos">
          <Typography className="keys">First Name</Typography>
          <TextField
            name="firstName"
            value={formState.firstName}
            onChange={(event) => setInput("firstName", event.target.value)}
          >
            {firstName === null ? "N/A" : firstName}
          </TextField>
        </Box>
        <Box className="infos">
          <Typography className="keys">Last Name</Typography>
          <TextField
            name="lastName"
            value={formState.lastName}
            onChange={(event) => setInput("lastName", event.target.value)}
          >
            {lastName === null ? "N/A" : lastName}
          </TextField>
        </Box>
        <Box className="infos">
          <Typography className="keys">Birthday</Typography>
          <TextField
            name="birthday"
            type="date"
            value={formState.birthday}
            onChange={(event) => setInput("birthday", event.target.value)}
          >
            {birthday === null ? "N/A" : birthday}
          </TextField>
        </Box>
        <Box className="infos">
          <Typography className="keys">Email</Typography>
          <TextField
            name="email"
            value={formState.email}
            onChange={(event) => setInput("email", event.target.value)}
          >
            {email === null ? "N/A" : email}
          </TextField>
        </Box>
        <Box className="infos">
          <Typography className="keys">Address</Typography>
          {/* <TextField
            name="address1"
            value={formState.shippingAddress.address1}
            onChange={(event) =>
              setAddressInput("address1", event.target.value)
            }
            placeholder="Address"
          >
            {formState.shippingAddress}
          </TextField> */}
        </Box>
        <Box className="infos">
          <Typography className="keys">Job Title</Typography>
          <TextField
            name="jobTitle"
            value={formState.jobTitle}
            onChange={(event) => setInput("jobTitle", event.target.value)}
          >
            {jobTitle === null ? "N/A" : jobTitle}
          </TextField>
        </Box>
        <Box className="infos">
          <Typography className="keys">Date Started</Typography>
          <TextField
            type="date"
            name="startDate"
            value={formState.startDate}
            onChange={(event) => setInput("startDate", event.target.value)}
          >
            {startDate === null ? "N/A" : startDate}
          </TextField>
        </Box>
        {/* <Box className="infos">
        <Typography className="keys">Department</Typography>
        <Input
          name="department"
          value={formState.department}
          onChange={(event) => setInput("department", event.target.value)}
        />
        {/* {department?.name === null ? "N/A" : department?.name} */}

        <Box>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Box>
        <Box>
          <Button onClick={handleClick}>Cancel</Button>
        </Box>
      </Box>
    </Root>
  );
};

export default EditRecipientProfile;

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

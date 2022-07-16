import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { useRecipients } from "../../../hooks/recipients";

const EditRecipientProfile = ({ info, setIsEdit, setOpen }) => {
  const {
    id,
    firstName,
    lastName,
    birthday,
    email,
    shippingAddress: { address1, address2, city, state, zip } = {},
    jobTitle,
    startDate,
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
  };

  const { editRecipient } = useRecipients();

  const [formState, setFormState] = useState(initialState);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  function setAddressInput(key, value) {
    setFormState({
      ...formState,
      shippingAddress: { ...formState.shippingAddress, [key]: value },
    });
  }

  const handleClick = () => {
    setIsEdit(false);
  };

  const handleSubmit = async (e) => {
    console.log({ formState });
    e.preventDefault();
    await editRecipient({ ...formState });
    setIsEdit(false);
    setFormState(initialState);
    setOpen(true);
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
          <TextField
            onChange={(event) =>
              setAddressInput("address1", event.target.value)
            }
            value={formState.shippingAddress.address1}
            placeholder="Address"
          ></TextField>
        </Box>
        <Box className="infos">
          <Label></Label>
          <TextField
            onChange={(event) =>
              setAddressInput("address2", event.target.value)
            }
            value={formState.shippingAddress.address2}
            placeholder="Address 2"
            label=""
          />
        </Box>
        <Box className="infos">
          <Typography className="keys">City</Typography>
          <TextField
            onChange={(event) => setAddressInput("city", event.target.value)}
            value={formState.shippingAddress.city}
            placeholder="City"
          ></TextField>
        </Box>
        <Box className="infos">
          <Typography className="keys">State (i.e UT)</Typography>
          <TextField
            onChange={(event) => setAddressInput("state", event.target.value)}
            value={formState.shippingAddress.state}
            placeholder="State"
          ></TextField>
        </Box>
        <Box className="infos">
          <Typography className="keys">Zip Code</Typography>
          <TextField
            onChange={(event) => setAddressInput("zip", event.target.value)}
            value={formState.shippingAddress.zip}
            placeholder="Zip"
            label=""
          ></TextField>
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
        <Box>
          <Button variant="contained" type="submit">
            Save
          </Button>

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
const Label = styled(InputLabel)(({ theme }) => ({
  fontSize: "16px",
  color: "#000",
  fontWeight: 600,
  width: 200,
}));

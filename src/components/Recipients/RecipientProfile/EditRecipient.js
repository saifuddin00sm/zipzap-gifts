import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Input } from "@mui/material";

import { updateRecipient } from "../../../graphql/recipients";

const EditRecipientProfile = ({ info, isEdit, setIsEdit }) => {
  const {
    id,
    birthday,
    shippingAddress: { address1, address2, city, state, zip } = {},
    jobTitle,
    startDate,
    department,
  } = info;

  const initialState = {
    id: info.id,
    birthday: info.birthday,
    email: info.email,
    firstName: info.firstName,
    jobTitle: info.jobTitle,
    lastName: info.lastName,
    phone: info.phone,
    shippingAddress: {
      address1: info.address1,
      address2: info.address2,
      city: info.city,
      state: info.state,
      zip: info.zip,
    },
    recipientType: "",
    startDate: new Date("01-01-2020"),
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
  const [editDepartment, setEditDepartment] = useState(department);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
    validateForm();
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

  const handleChange = (e) => {
    if (e.target.name === "birthday") {
      setEditBirthday(e.target.value);
      info.birthday = editBirthday;
    } else if (e.target.name === "address1") {
      setEditAddress1(e.target.value);
      info.shippingAddress = editAddress1;
    } else if (e.target.name === "jobTitle") {
      setEditJobTitle(e.target.value);
      info.jobTitle = editJobTitle;
    } else if (e.target.name === "startDate") {
      setEditStartDate(e.target.value);
      info.startDate = editStartDate;
    } else if (e.target.name === "department") {
      setEditDepartment(e.target.value);
      info.department = editDepartment;
    }
    console.log(info.jobTitle);
    console.log(info.department);
  };

  const handleClick = () => {
    setIsEdit(false);
    console.log(info.jobTitle);
    console.log(info.department);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateRecipient({ ...formState });
    setIsEdit(false);
  };

  return (
    <Root>
      <Box className="infos">
        <Typography className="keys">Birthday</Typography>
        <Input
          name="birthday"
          type="date"
          value={editBirthday}
          onChange={(event) => setInput("birthday", event.target.value)}
        >
          {birthday === null ? "N/A" : birthday}
        </Input>
      </Box>
      <Box className="infos">
        <Typography className="keys">Email</Typography>
        <Input
          name="email"
          value={formState.email}
          onChange={(event) => setInput("email", event.target.value)}
        >
          {email === null ? "N/A" : email}
        </Input>
      </Box>
      <Box className="infos">
        <Typography className="keys">Address</Typography>
        <Input
          name="address1"
          value={editAddress1}
          onChange={handleChange}
        >{`${address1}${
          address2 ? ` ${address2}` : ""
        }, ${city}, ${state}, ${zip}`}</Input>
      </Box>
      <Box className="infos">
        <Typography className="keys">Job Title</Typography>
        <Input
          name="jobTitle"
          value={editJobTitle}
          onChange={(event) => setInput("jobTitle", event.target.value)}
        >
          {jobTitle === null ? "N/A" : jobTitle}
        </Input>
      </Box>
      <Box className="infos">
        <Typography className="keys">Date Started</Typography>
        <Input
          type="date"
          name="startDate"
          value={editStartDate}
          onChange={(event) => setInput("startDate", event.target.value)}
        >
          {startDate === null ? "N/A" : startDate}
        </Input>
      </Box>
      <Box className="infos">
        <Typography className="keys">Department</Typography>
        <Input
          name="department"
          value={editDepartment}
          onChange={(event) => setInput("department", event.target.value)}
        />
        {/* {department?.name === null ? "N/A" : department?.name} */}
      </Box>
      <Box>
        <Button onSubmit={handleSubmit}>Save Changes</Button>
      </Box>
      <Box>
        <Button onClick={handleClick}>Cancle</Button>
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

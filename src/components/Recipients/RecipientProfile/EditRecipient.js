import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Input } from "@mui/material";

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

const EditRecipientProfile = ({ info, isEdit, setIsEdit }) => {
  const {
    birthday,
    shippingAddress: { address1, address2, city, state, zip } = {},
    jobTitle,
    startDate,
    department,
  } = info;

  const [editBirthday, setEditBirthday] = useState(birthday);
  const [editAddress1, setEditAddress1] = useState(
    `${address1} ${address2} ${city} ${state} ${zip}`
  );
  const [editJobTitle, setEditJobTitle] = useState(jobTitle);
  const [editStartDate, setEditStartDate] = useState(startDate);
  const [editDepartment, setEditDepartment] = useState(department);

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

  return (
    <Root>
      <Box className="infos">
        <Typography className="keys">Birthday</Typography>
        <Input
          name="birthday"
          type="date"
          value={editBirthday}
          onChange={handleChange}
        >
          {birthday === null ? "N/A" : birthday}
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
        <Input name="jobTitle" value={editJobTitle} onChange={handleChange}>
          {jobTitle === null ? "N/A" : jobTitle}
        </Input>
      </Box>
      <Box className="infos">
        <Typography className="keys">Date Started</Typography>
        <Input
          type="date"
          name="startDate"
          value={editStartDate}
          onChange={handleChange}
        >
          {startDate === null ? "N/A" : startDate}
        </Input>
      </Box>
      <Box className="infos">
        <Typography className="keys">Department</Typography>
        <Input
          name="department"
          value={editDepartment}
          onChange={handleChange}
        />
        {/* {department?.name === null ? "N/A" : department?.name} */}
      </Box>
      <Box>
        <Button onClick={handleClick}>Save Changes</Button>
      </Box>
    </Root>
  );
};

export default EditRecipientProfile;

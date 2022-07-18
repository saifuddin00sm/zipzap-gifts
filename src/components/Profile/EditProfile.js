import React, { useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import { Image } from "@aws-amplify/ui-react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
// import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Grid from "@mui/material/Grid";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { getUser } from "../../graphql/queries";
import { useLocation, useNavigate } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { useQuery } from "react-query";
import TextField from "@mui/material/TextField";
import { useUsers } from "./../../hooks/users";

const EditProfile = ({ info, isEdit, setIsEdit, setOpen }) => {
  const {
    id,
    userName,
    company,
    companySize,
    cards,
    phone,
    birthday,
    email,
    address: { address1, address2, city, state, zip } = {},
    jobTitle,
    startDate,
  } = info;

  const initialState = {
    id: info.id,
    company: info.company,
    companySize: info.companySize,
    userName: info.userName,
    birthday: info.birthday,
    email: info.email,
    jobTitle: info.jobTitle,
    phone: info.phone,
    address: {
      address1: info.address1,
      address2: info.address2,
      city: info.city,
      state: info.state,
      zip: info.zip,
    },

    startDate: info.startDate,
  };

  const { editUser } = useUsers();

  const [formState, setFormState] = useState(initialState);
  const [isFormValid, setIsFormValid] = useState(false);

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
    e.preventDefault();
    await editUser({ ...formState });
    setIsEdit(false);
    setFormState(initialState);
    setOpen(true);
  };

  //   const handleSubmit = async (e) => {
  //     console.log({ formState });
  //     e.preventDefault();
  //     await editRecipient({ ...formState });
  //     setIsEdit(false);
  //     setFormState(initialState);
  //     setOpen(true);
  //   };

  return (
    <Root>
      <Box className="profile">
        <Box className="img_box">
          <Image
            borderRadius="50%"
            objectFit="cover"
            objectPosition="50% 50%"
            maxWidth="100px"
            src="/BluePersonalLogo.png"
            width="100px"
            height="100px"
          />
          {/* <Box className="pen">
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton
                sx={{ color: "#263238" }}
                aria-label="upload picture"
                component="span"
              >
                {/* <PhotoCamera /> */}
          {/* </IconButton>
            </label>
          </Box> */}
        </Box>
        <Box
          //   onSubmit={handleSubmit}
          component="form"
          sx={{ marginTop: "20px" }}
        >
          <Box className="title">
            <TextField
              name="userName"
              value={formState.userName}
              onChange={(event) => setInput("userName", event.target.value)}
            >
              {userName === null ? "N/A" : userName}
            </TextField>
          </Box>
          <Box className="title">
            <TextField
              name="company"
              value={formState.company}
              onChange={(event) => setInput("company", event.target.value)}
            >
              {company === null ? "N/A" : company}
            </TextField>
          </Box>
        </Box>
      </Box>
      <Box className="contactInfo" sx={{ mb: 5 }}>
        <Box className="styles" />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#505050" }}>
            Contact Info
          </Typography>
          <Button onClick={handleClick}>Save</Button>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={6}>
            <Box className="infoBox">
              <HomeIcon />
              <Typography>Address: </Typography>
              <TextField
                name="address1"
                value={formState.address1}
                onChange={(event) => setInput("address1", event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="infoBox">
              <PhoneIcon />
              <Typography>Phone: </Typography>
              <TextField
                name="phone"
                value={formState.phone}
                onChange={(event) => setInput("phone", event.target.value)}
              >
                {phone === null ? "N/A" : phone}
              </TextField>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="infoBox">
              <EmailIcon />
              <Typography>Email:</Typography>
              <TextField
                name="email"
                value={formState.email}
                onChange={(event) => setInput("email", event.target.value)}
              >
                {info.email}
              </TextField>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="infoBox">
              <PeopleOutlineIcon />
              <Typography>Company Size:</Typography>
              <TextField
                name="companySize"
                value={formState.companySize}
                onChange={(event) =>
                  setInput("companySize", event.target.value)
                }
              >
                {formState.companySize}
              </TextField>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Button onSubmit={handleSubmit}>Cancel</Button>
      </Box>
      <Box>
        <Button onClick={handleClick}>Cancel</Button>
      </Box>
    </Root>
  );
};

export default EditProfile;

const Root = styled("div")(({ theme }) => ({
  "& .profile": {
    background: "#ABC4D6",
    padding: "30px",
    display: "flex",
    gap: 30,
    alignItems: "center",
    color: "#505050",
    marginBottom: "40px",
    [theme.breakpoints.down(700)]: {
      flexDirection: "column",
      textAlign: "center",
    },
    "& .company": {
      fontWeight: "400",
      fontSize: "32px",
      lineHeight: "60px",
      [theme.breakpoints.down(500)]: {
        fontSize: "20px",
        lineHeight: "45px",
      },
      textTransform: "capitalize",
    },
    "& .title": {
      fontWeight: "400",
      fontSize: "50px",
      [theme.breakpoints.down(500)]: {
        fontSize: "30px",
        lineHeight: "55px",
      },
      lineHeight: "87px",
      textTransform: "capitalize",
    },

    "& .img_box": {
      position: "relative",
      "& .pen": {
        height: "50px",
        width: "50px",
        position: "absolute",
        top: "73px",
        left: "55px",
      },
    },
  },

  "& .contactInfo": {
    position: "relative",
    "& .styles": {
      position: "absolute",
      top: "75px",
      left: "-19px",
      height: "200px",
      width: "8px",
      background: "#ABC4D6",
      [theme.breakpoints.down(768)]: {
        display: "none",
      },
    },
    "& .infoBox": {
      width: "100%",
      maxWidth: "541px",
      padding: "15px 20px",
      background: "#F1F1F1",
      display: "flex",
      alignItems: "center",
      gap: "0 15px",
      borderRadius: "10px",
      fontWeight: "400",
      fontSize: "20px",
      lineHeight: "30px",
    },
  },

  "& .credit_card": {
    background: "#ABC4D6",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "269px",
    height: "100%",
    "& .card_top": {
      height: "70px",
      padding: "10px",
      borderRadius: "10px 10px 0px 0px",
    },
    "& .card_bottom": {
      height: "78px",
      padding: "10px",
      borderRadius: "0px 0px 10px 10px",
      "& h6": {
        color: "#343436",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "14px",
        lineHeight: "21px",
        textTransform: "capitalize",
      },
      "& p": {
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "10px",
        lineHeight: "15px",
        textTransform: "capitalize",
        color: "#343436",
      },
    },
  },
  "& .inner_cards": {
    padding: 0,
    display: "grid",
    gridTemplateColumns: "269px 269px 269px",
    marginBottom: "30px",
    [theme.breakpoints.down(800)]: {
      gridTemplateColumns: "1fr",
    },
    gap: "36px",
  },
}));

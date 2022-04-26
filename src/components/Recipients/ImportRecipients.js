import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Header from "../Header";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import TemplateTable from "./TemplateTable";
import RecipientSuccess from "./RecipientSuccess";

const Root = styled("div")(({ theme }) => ({
  "& .upload": {
    marginBottom: "40px",
    "& .uploadContents": {
      border: "1px solid #F1F1F1",
      padding: "70px",
      [theme.breakpoints.down("md")]: {
        padding: "25px",
      },
    },
    "& .uploadBtn": {
      marginTop: "50px",
      textAlign: "center",
    },
    "& .uploadHead": {
      background: "#343436",
      padding: "16px",
      color: "#fff",
    },
  },
}));

const Input = styled("input")({
  display: "none",
});

const ImportList = () => {
  const [open, setOpen] = useState(false);

  const uploadFile = (e) => {
    // TODO: make an api call to upload the file, onSuccess block put this setOpen method
    setOpen(true);
  };

  return (
    <>
      <Container component="main">
        <Header>
          <Typography variant="h1">Recipient Dashboard</Typography>
        </Header>
        <Box sx={{ marginBottom: "30px" }}>
          <Button>
            <Link
              style={{ textDecoration: "none", color: "#000" }}
              to="/recipients"
            >
              Back
            </Link>
          </Button>
        </Box>
        <Root>
          <Box className="upload">
            <Box className="uploadHead">
              <Typography variant="h5">Upload a List</Typography>
            </Box>
            <Box className="uploadContents">
              <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                upload a cSV document with a person on each row and the
                following attributes (see example below)
              </Typography>
              <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
                First name, last name, department, job title, birthday , Date
                Started, Address, City, State, Zip
              </Typography>
              <Box className="uploadBtn">
                <label htmlFor="contained-button-file">
                  <Input
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={uploadFile}
                  />
                  <Button component="span" size="large" variant="contained">
                    <FileUploadIcon sx={{ width: "2.5em", height: "2.5em" }} />
                  </Button>
                </label>
              </Box>
            </Box>
          </Box>
          <Box className="download">
            <Box sx={{ marginBottom: "20px" }}>
              <Button>Download Template</Button>
            </Box>
            <Box className="templateTable">
              <TemplateTable />
            </Box>
          </Box>
        </Root>
      </Container>
      <RecipientSuccess
        text="Recipient List Upload Successful!"
        subText="Successfully Uploaded All Recipients, Send An Email To Gather Information For Customized Gifting"
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default ImportList;

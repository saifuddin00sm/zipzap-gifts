import React, { useState, useCallback } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Header from "../Header";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CsvDownloader from "react-csv-downloader";
import Papa from "papaparse";
import TemplateTable from "./TemplateTable";
import RecipientSuccess from "./RecipientSuccess";
import { useRecipients } from "../../hooks/recipients";

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
  const { addRecipient } = useRecipients();

  const csvFile = `data:text/csv;charset=utf-8,First Name,Last Name,Email,Department,Job Title,Birthday,Date Started,Address,City,State,Zip
  John,Doe,john.doe@example.com,HR,Manager,12/31/1990,11/01/2020,1616 W Traverse Pkwy,Lehi,UT,84043`;

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      delimiter: ",",
      transformHeader: (header) => {
        const headers = {
          firstname: "firstName",
          lastname: "lastName",
          department: "department",
          title: "jobTitle",
          birthday: "birthday",
          datestarted: "startDate",
          address: "address1",
          city: "city",
          state: "state",
          zip: "zip",
        };
        return headers?.[header.replace(/\s/g, "").toLowerCase()];
      },
      skipEmptyLines: true,
      complete: async function ({ data, errors }) {
        if (errors?.length) {
          console.log(
            "Probably should handle the errors or show them to the user?",
            errors
          );
          return;
        }

        const errs = [];

        for (const row of data) {
          const recipient = {
            ...row,
            shippingAddress: {
              address1: row?.address1 || "",
              city: row?.city || "",
              state: row?.state || "",
              zip: row?.zip || "",
            },
          };
          delete recipient.undefined;
          delete recipient.address1;
          delete recipient.city;
          delete recipient.state;
          delete recipient.zip;
          try {
            console.log(recipient);
            setOpen(true);
            //await addRecipient(recipient);
          } catch (error) {
            errs.push(error);
          }
        }
        console.log("Done!", errs);
      },
    });
  };

  return (
    <>
      <Container component="main">
        <Header>
          <Typography variant="h1">Recipient Dashboard</Typography>
        </Header>
        <Box sx={{ marginBottom: "30px" }}>
          <Link
            style={{ textDecoration: "none", color: "#000" }}
            to="/recipients"
          >
            <Button>Back</Button>
          </Link>
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
                <input
                  type="file"
                  name="file"
                  accept=".csv"
                  onChange={changeHandler}
                  style={{ display: "block", margin: "10px auto" }}
                />
              </Box>
            </Box>
          </Box>
          <Box className="download">
            <Box sx={{ marginBottom: "20px" }}>
              <Button href={csvFile} download="zip_zap_template.csv">
                Download Template
              </Button>
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

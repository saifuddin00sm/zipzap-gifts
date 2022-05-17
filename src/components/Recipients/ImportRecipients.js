import React, { useState, useCallback } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Header from "../Header";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Papa from "papaparse";
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
  const [files, setFiles] = useState("");
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
          setParsedData(results.data);
        });
        setTableRows(rowsArray[0]);
        setValues(valuesArray);
      },
    });
  };
  // TODO: make an api call to upload the file, onSuccess block put this setOpen method

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
              <Button>Download Template</Button>
            </Box>
            <Box className="templateTable">
              <TemplateTable />
            </Box>
          </Box>
        </Root>
        <table>
          <thead>
            <tr>
              {tableRows.map((rows, index) => {
                return <th key={index}>{rows}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {values.map((value, index) => {
              return (
                <tr key={index}>
                  {value.map((val, i) => {
                    return <td key={i}>{val}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
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

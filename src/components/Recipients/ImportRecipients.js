import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Header from "../Header";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Papa from "papaparse";
import TemplateTable from "./TemplateTable";
import RecipientSuccess from "./RecipientSuccess";
import { useRecipients } from "../../hooks/recipients";
import { useReward } from "react-rewards";
import CircularProgress from "@mui/material/CircularProgress";

const ImportList = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars -- We're going to use the errors later`
  const [uploadErrors, setUploadErrors] = useState([]);
  const [uploadCount, setUploadCount] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [open, setOpen] = useState(false);
  const { addRecipient } = useRecipients();
  const [success, setSuccess] = useState(false);
  const [newIDs, setNewIDs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const onClose = () => {
    setOpen(false);
    navigate("/recipients");
  };
  const { reward } = useReward("confetti-id", "confetti", {
    colors: ["#abc6bd", "#c5d5e2", "#abc4d6"],
    startVelocity: 30,
    spread: 85,
    elementSize: 18,
  });

  const csvFile = `data:text/csv;charset=utf-8,First Name,Last Name,Email,Group,Job Title,Birthday,Date Started,Address,City,State,Zip\nJohn,Doe,john.doe@example.com,Human Resources,HR Manager,1990/12/13,2020/11/01,1616 W Traverse Pkwy,Lehi,UT,84043`;

  const changeHandler = (event) => {
    setIsLoading(true);
    Papa.parse(event.target.files[0], {
      header: true,
      delimiter: ",",
      transformHeader: (header) => {
        const headers = {
          firstname: "firstName",
          lastname: "lastName",
          email: "email",
          group: "group",
          jobtitle: "jobTitle",
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
        if (errors?.length !== 0) {
          setUploadErrors(
            errors.map(({ row, message }) => `Row ${row + 2}: ${message}`)
          );
          setOpen(true);
          return;
        }
        const ids = [];
        const errs = [];
        let count = 0;
        let successCount = 0;

        for (const row of data) {
          count = count + 1;
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
            const newID = await addRecipient(recipient);
            successCount++;
            ids.push(newID);
          } catch (error) {
            if (error?.errors?.length > 0) {
              errs.push(`Row ${count + 1}: ${error.errors[0]?.message}`);
            } else {
              errs.push(`Row ${count + 1}: ${error}`);
            }
          }
        }
        setUploadErrors(errs);
        setUploadCount(successCount);
        setNewIDs(ids);
        setTotalCount(count);
        setSuccess(true);
        setOpen(true);
        reward();
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
                First name, last name, group, job title, birthday , Date
                Started, Address, City, State, Zip
              </Typography>
              <Box className="uploadBtn">
                {isLoading ? (
                  <CircularProgress variant="indeterminate" size={136} />
                ) : (
                  <label htmlFor="contained-button-file">
                    <Input
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={changeHandler}
                    />
                    <Button component="span" size="large" variant="contained">
                      <FileUploadIcon
                        sx={{ width: "2.5em", height: "2.5em" }}
                      />
                    </Button>
                  </label>
                )}
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
      {!success ? (
        <RecipientSuccess
          text="Uh-oh! We Were Unable To Upload Your List"
          subText={
            <>
              It Looks Like There Was An Error. Please Make Sure Your CSV
              Matches The Template
              <br />
              {uploadErrors.length > 0 &&
                uploadErrors.map((e) => (
                  <Typography key={e} component="span" color="error">
                    {e}
                    <br />
                  </Typography>
                ))}
            </>
          }
          open={open}
          onClose={onClose}
          button={false}
        />
      ) : (
        <RecipientSuccess
          text="Recipient List Upload Successful!"
          subText={
            <>
              Successfully Uploaded {uploadCount}{" "}
              {uploadCount !== totalCount ? `of ${totalCount}` : ""} Recipients,
              Send An Email To Gather Information For Customized Gifting. Don't
              Worry, If You Decide Not To, You Can Send It Later.
              <br />
              {uploadErrors.length > 0 &&
                uploadErrors.map((e) => (
                  <Typography key={e} component="span" color="error">
                    {e}
                    <br />
                  </Typography>
                ))}
            </>
          }
          open={open}
          ids={newIDs}
          onClose={onClose}
          button={true}
        />
      )}
    </>
  );
};

export default ImportList;

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

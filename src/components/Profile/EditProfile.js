import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createAddress } from "../../graphql/mutations";
import { createCompany } from "../../graphql/mutations";
import { updateUser } from "../../graphql/mutations";
import { updateAddress } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

const initialState = {
  company: "",
  size: "",
  address: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  name: "",
  phone: "",
};

const EditProfile = ({ user, setcurrentUser, setNewUser }) => {
  const [formState, setFormState] = useState(initialState);
  const [editUser, setEditUser] = useState(false);
  const [errors, setErrors] = useState([]);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function updateThisUser() {
    if (
      !formState.company ||
      !formState.address ||
      !formState.city ||
      !formState.state ||
      !formState.zip
    ) {
      setErrors(["Please finish filling out the form before submitting"]);
      return;
    } else {
      setErrors([]);
      try {
        let companyID = "";
        let userCompanyID = {};
        if (editUser) {
          const newAddress = {
            id: user.company.companyAddressId,
            address1: formState.address,
            address2: formState.address2,
            city: formState.city,
            state: formState.state,
            zip: formState.zip,
          };
          await API.graphql(
            graphqlOperation(updateAddress, { input: newAddress })
          );

          //TODO: add update Company call,
          userCompanyID = {
            id: user.id,
            name: formState.name,
          };
        } else {
          const newAddress = {
            address1: formState.address,
            address2: formState.address,
            city: formState.city,
            state: formState.state,
            zip: formState.zip,
          };
          const addressReturn = await API.graphql(
            graphqlOperation(createAddress, { input: newAddress })
          );
          const newCompany = {
            name: formState.company,
            companyAddressId: addressReturn.data.createAddress.id,
          };
          const companyReturn = await API.graphql(
            graphqlOperation(createCompany, { input: newCompany })
          );
          companyID = companyReturn.data.createCompany.id;
          userCompanyID = {
            id: user.id,
            companyUsersId: companyID,
          };
        }
        if (companyID) {
          const companyUpdateReturn = await API.graphql(
            graphqlOperation(updateUser, { input: userCompanyID })
          );
          setNewUser(false);
          setEditUser(false);
          setcurrentUser(companyUpdateReturn.data.updateUser);
        }
      } catch (err) {
        setErrors([err]);
      }
    }
  }
  return (
    <Box>
      <Typography variant="h1">Welcome to Zip Zap!</Typography>
      <Typography paragraph>Let's finish setting up your account!</Typography>
      <Divider />
      <Box>
        {editUser && (
          <>
            <TextField
              onChange={(event) => setInput("name", event.target.value)}
              value={formState.name}
              placeholder="Name"
              label="Name:"
            />
            <TextField
              onChange={(event) => setInput("phone", event.target.value)}
              value={formState.phone}
              placeholder="Phone Number"
              label="Phone Number:"
            />
          </>
        )}
        <TextField
          onChange={(event) => setInput("company", event.target.value)}
          value={formState.company}
          placeholder="Company"
          label="Company Name"
          fullWidth
        />
        {/* TODO: add company size */}
        <TextField
          onChange={(event) => setInput("address", event.target.value)}
          value={formState.address}
          placeholder="Company Address"
          label="Address 1"
          fullWidth
        />

        <TextField
          onChange={(event) => setInput("address2", event.target.value)}
          value={formState.address2}
          placeholder="Apartment, suite, etc. (optional)"
          label="Address 2"
          fullWidth
        />

        <TextField
          onChange={(event) => setInput("city", event.target.value)}
          value={formState.city}
          placeholder="City"
          label="City"
          fullWidth
        />

        <TextField
          onChange={(event) => setInput("state", event.target.value)}
          value={formState.state}
          placeholder="State"
          label="State"
        />

        <TextField
          onChange={(event) => setInput("zip", event.target.value)}
          value={formState.zip}
          placeholder="Zip"
          label="Zip"
        />

        <div>
          <div className="alignLeft align-items-center error-message">
            {errors.length > 0
              ? errors.map((x) => <Typography paragraph>{x}</Typography>)
              : null}
          </div>

          {editUser ? (
            <>
              <Button variant="dark" type="submit" onClick={updateThisUser}>
                Submit
              </Button>
            </>
          ) : (
            <>
              <Button type="submit" onClick={updateThisUser}>
                Finish setting up
              </Button>
            </>
          )}
        </div>
      </Box>
    </Box>
  );
};

export default EditProfile;

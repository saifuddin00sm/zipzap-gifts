import React, { useEffect, useState, useContext } from "react";
import { UserContext, fetchRequest } from "../../../App";
import { Redirect, RouteComponentProps } from "react-router-dom";
import LoadingIcon from "../LoadingIcon";
import { newUserInfo } from "./authCallback";
import ModalBox from "../modalBox";
import {
  Row,
  Col,
  Modal,
  Button,
  Card
} from "react-bootstrap";
import { Link} from "react-router-dom";

const RegisterComponent: React.FC<RouteComponentProps> = ({
  location,
  match,
}) => {
  const { user: appUser, setUser: setAppUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [editPersonal, setEditPersonal] = useState(true);
  const [error, setError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [redirect, setRedirect] = useState("");

  const [editUser, setEditUser] = useState(
    {} as {
      Email: "";
      email: "";
      "First Name": "";
      "Last Name": "";
      Company: "";
      Address: "";
      City: "";
      State: "";
      Zip: "";
      // required for getting Information
      // acc:"",
      // id:"",
      // refresh:"",
      access_token: "";
      refresh_token: "";
      id_token: "";
      expires_in: 0;
    }
  );

  const clearAppUser = () => {
    // TO-DO - SAVE JWT TOKEN to AUTH
    editUser["First Name"] = appUser.firstName;
    editUser["Last Name"] = appUser.lastName;
    editUser["Email"] = appUser.email;
    editUser["email"] = appUser.email;
    editUser["access_token"] = appUser.acc;
    editUser["id_token"] = appUser.id;
    editUser["refresh_token"] = appUser.refresh;

    setAppUser({});
    setEditPersonal(false);
    setLoading(false);
  };

  useEffect(() => {
    console.log("Register Setup", appUser);
    if (appUser && "email" in appUser && appUser.email) {
      clearAppUser();
    } else {
      setLoading(false);
    }
  }, []);
  

  const handleNewEdit = (type: string, event: any) => {
    if (type === "Email") {
      editUser["Email"] = event.target.value;
    } else if (type === "First Name") {
      editUser["First Name"] = event.target.value;
    } else if (type === "Last Name") {
      editUser["Last Name"] = event.target.value;
    } else if (type === "Company") {
      editUser["Company"] = event.target.value;
    } else if (type === "Address") {
      editUser["Address"] = event.target.value;
    } else if (type === "City") {
      editUser["City"] = event.target.value;
    } else if (type === "State") {
      editUser["State"] = event.target.value;
    } else if (type === "Zip") {
      editUser["Zip"] = event.target.value;
    }

    setEditUser({ ...editUser });
  };

  const handleRegister = async () => {
    if (!editUser.Email) {
      setError("Please Enter a Email");
      return false;
    } else if (!editUser["First Name"]) {
      setError("Please Enter a First Name");
      return false;
    } else if (!editUser["Last Name"]) {
      setError("Please Enter a Last Name");
      return false;
    } else if (!editUser["Company"]) {
      setError("Please Enter a Company Name");
      return false;
    } else if (!editUser.Address) {
      setError("Please Enter an Address");
      return false;
    } else if (!editUser["City"]) {
      setError("Please Enter a City");
      return false;
    } else if (!editUser["State"]) {
      setError("Please Enter a State");
      return false;
    } else if (!editUser["Zip"]) {
      setError("Please Enter a Zip");
      return false;
    } else {
      setError("");
    }

    setLoading(true);
    // TO-DO - SAVE JWT TOKEN to AUTH
    let registerUserResponse = await fetchRequest(
      editUser,
      "user/registerUser",
      "POST",
      editUser
    );

    console.log("register", registerUserResponse, editUser);

    if (registerUserResponse.error || !registerUserResponse.accountCreated) {
      // TO-DO - Handle Errors
      setError("Something went wrong, please contact support");
      setLoading(false);
      return;
    }

    // TO-DO - Change to include
    if ("id_token" in editUser) {
      let user = newUserInfo(editUser);
      console.log("USER", user);
      setAppUser(user);

      localStorage.setItem("user", JSON.stringify(user));
    }
    setRegistrationSuccess(true);
  };

  const confirmationSubmit = () => {
    // TO-DO - Show confirmation message or just take?
    setRedirect("/");
    setRegistrationSuccess(true);
    setLoading(false);
  };

  return (
    <Col>
  {/* </Col><section className={`column center-column full-height`}> */}
      <Row>
        <Col className="page-header justify-content-center">
          <h3>Complete Registration</h3>
        </Col>
      </Row>
      {/* <header className={`column center page-header page-header-black`}>
        <h1>Complete Registration</h1>
      </header> */}
      {loading ? <LoadingIcon /> : null}
      {redirect ? <Redirect to={redirect} /> : null}

      {/* <main className={`full-width column center-column main-section`}> */}
        {/* {loading || registrationSuccess ? ( */}
          <Modal show={registrationSuccess}>
                <Modal.Header>
                  <Modal.Title>
                    <h2>
                    Welcome to Zip Zap Gifts!
                    </h2>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                
                To get started, add some people to your recipient dashboard, then you can start creating gifts for them!
                <Button
                    className={`new-event-button new-event-button-grey general-button `}
                    onClick={confirmationSubmit}
                    variant="zapGreen"
                  >
                    {/* <Link to={"/recipients"}>Go to Recipient Dashboard</Link> */}
                    Go to Recipient Dashboard
                  </Button>
                    </Modal.Footer>
          </Modal>
        {/* ) : null} */}

        {/* <section className={`full-width row center`}> */}
        {/* <section
            className={`event-dashboard-half-column event-dashboard-half-column-left registration-half-column-1`}
          > */}
            {/* <div className="column center column-left-align"> */}
          <Row className="d-flex justify-content-center m-3 border registration-half-column-1">         
            <div className={`event-dashboard-sub-title primary-black-header p-3`}>
              <span>Personal Information</span>
            </div>
              <div
                className={`width-90 row left-align-column user-add-field-row p-3`}
              >
                <label>Email:</label>
                {/* Email: */}
                <input
                  value={editUser.Email}
                  onChange={(e: any) => handleNewEdit("Email", e)}
                  placeholder={`Email`}
                  className={`general-input-fit new-event-input`}
                  disabled={!editPersonal}
                ></input>
              </div>

              <div
                className={`width-90 row left-align-column user-add-field-row`}
              >
                <label>Name:</label>
                {/* First Name: */}
                <input
                  value={editUser["First Name"]}
                  onChange={(e: any) => handleNewEdit("First Name", e)}
                  placeholder={`First Name`}
                  className={`general-input-fit new-event-input`}
                  disabled={!editPersonal}
                ></input>
                <input
                  value={editUser["Last Name"]}
                  onChange={(e: any) => handleNewEdit("Last Name", e)}
                  placeholder={`Last Name`}
                  className={`general-input-fit new-event-input`}
                  disabled={!editPersonal}
                ></input>
              </div>
          </Row>

          <Row className="d-flex justify-content-center m-3 border registration-half-column-1">
              {/* COMPANY INFO  */}
              <div className={`event-dashboard-sub-title primary-black-header p-3`}>
                <span>Company Information</span>
              </div>
              <div
                className={`width-90 row left-align-column user-add-field-row`}
              >
                {/* <label>Email:</label> */}
                <input
                  value={editUser.Company}
                  onChange={(e: any) => handleNewEdit("Company", e)}
                  placeholder={`Company Name`}
                  className={`general-input-fit new-event-input`}
                ></input>
              </div>

              <div
                className={`width-90 row left-align-column user-add-field-row`}
              >
                {/* <label>Email:</label> */}
                <input
                  value={editUser.Address}
                  onChange={(e: any) => handleNewEdit("Address", e)}
                  placeholder={`Street Address`}
                  className={`general-input-fit new-event-input`}
                ></input>
              </div>

              <div
                className={`width-90 row left-align-column user-add-field-row`}
              >
                {/* <label>Email:</label> */}
                <input
                  value={editUser.City}
                  onChange={(e: any) => handleNewEdit("City", e)}
                  placeholder={`City`}
                  className={`general-input-fit new-event-input`}
                ></input>

                <input
                  value={editUser.State}
                  maxLength={2}
                  onChange={(e: any) => handleNewEdit("State", e)}
                  placeholder={`State i.e. UT`}
                  className={`general-input-fit new-event-input`}
                ></input>
              </div>

              <div
                className={`width-90 row left-align-column user-add-field-row`}
              >
                {/* <label>Email:</label> */}
                <input
                  value={editUser.Zip}
                  onChange={(e: any) => handleNewEdit("Zip", e)}
                  placeholder={`Zip Code`}
                  className={`general-input-fit new-event-input`}
                ></input>
              </div>
          </Row>
          {/* </div> */}
          {/* </section> */}
          {/* Second Column  */}

          <Card className="m-3">
            <Card.Header>
              <div className={`event-dashboard-sub-title `}>
                <span>Payment Details</span>
              </div>
            </Card.Header>
            <Card.Body>
              <div>
                <i>First three months will have no monthly payments</i>
                <br></br>
                <strong>Monthly Payment: </strong> $15
                <br></br>
                <strong>Payment Date: </strong> 1st of every month
              </div>
            </Card.Body>
          </Card>

        <Row className="m-5">
          {error ? <span className={`error-message-text`}>{error}</span> : null}
          <Button onClick={handleRegister} variant="zapGreen" >
            Register
          </Button>
        </Row>

      {/* </main> */}
    {/* </section> */}
    </Col>
  );
};

export default RegisterComponent;

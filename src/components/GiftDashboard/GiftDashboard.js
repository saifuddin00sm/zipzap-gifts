import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { getUser } from "../../graphql/queries";
import { createUser } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { Link } from "react-router-dom";

function GiftDashboard() {
  //congito user information
  const [user] = useOutletContext();
  const [popUpMessage, setPopUpMessage] = useState(false);

  const handleDismissPopup = () => {
    setPopUpMessage(false);
  };

  // TODO: Refactor this into a custom hook and move it out of this file
  useEffect(() => {
    async function addUser() {
      const newUser = {
        id: user.username,
        email: user.attributes.email,
        name: user.attributes.name,
        phoneNumber: user.attributes.phone_number,
      };
      await API.graphql(graphqlOperation(createUser, { input: newUser }));
      fetchCurrentUser();
    }

    async function fetchCurrentUser() {
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: user.username })
      );

      if (!userData.data.getUser) {
        addUser();
      } else if (!userData.data.getUser.company) {
        setPopUpMessage(true);
      }
    }

    fetchCurrentUser();
  }, [
    user.username,
    user.attributes.email,
    user.attributes.name,
    user.attributes.phone_number,
  ]);

  return (
    <Container className="main-container">
      <Row className="page-header justify-content-center">
        <Col md="10">
          <h1>Gift Dashboard</h1>
        </Col>
        <Col md="2">
          <Button variant="blue">Send a Gift</Button>
        </Col>
      </Row>
      <hr />
      {popUpMessage ? (
        <>
          <Row className="welcome-message">
            <Col xs="12" sm="6" md="7">
              <h3>Welcome to Zip Zap!</h3>
              <p>Do you want to finish setting up your account?</p>
            </Col>
            <Col xs="12" sm="6" md="3">
              <Button variant="dark">
                <Link to="/profile" className="button-link">
                  Go to Profile
                </Link>
              </Button>
            </Col>
            <Col xs="12" sm="3" md="2">
              <Button variant="dark" onClick={handleDismissPopup}>
                Dismiss
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <p>Welcome, {user.attributes.name}!</p>
        </Row>
      )}
      <Row>
        <Col>
          <h1>One Time gifts</h1>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
export default GiftDashboard;

import React, {useEffect, useState } from "react";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { getUser } from "../../graphql/queries";
import { listUsers } from "../../graphql/queries";
import { createUser } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import GiftRow from "./GiftRow";

function GiftDashboard() {

    //congito user information
    const [user] = useOutletContext();
    const [currentUser, setcurrentUser] = useState(null);
    const [popUpMessage, setPopUpMessage] = useState(false);
    const [newUser, setNewUser] = useState(false);

    const handleDismissPopup = () => {
        setPopUpMessage(false);
    }

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    async function fetchCurrentUser() {
        try {
            const userData = await API.graphql(graphqlOperation(getUser, {id: user.username}));
            console.log(userData)

            if (userData.data.getUser) {
                setcurrentUser(userData.data.getUser);
                setNewUser(false);
                console.log(currentUser)
            }
            else {
                addUser();
                setPopUpMessage(true);
                setNewUser(true);
            }
            
        } catch (err) {
            console.log(err)
            console.log("error fetching user");
        }
    }

    

    
    async function addUser() {
        try {
            const newUser =  {id: user.username, email: user.attributes.email, name: user.attributes.name, phoneNumber: user.attributes.phone_number};
            await API.graphql(graphqlOperation(createUser, { input: newUser }));
            fetchCurrentUser()

        } catch (err) {
            console.log("error creating todo:", err);
        }
    }


    return (
        <Container className="main-container">
                <Row className="page-header justify-content-center">
                    <Col  md="10">
                        <h1>Gift Dashboard</h1>
                    </Col>
                    <Col md="2">
                        <Button variant="flat">Send a Gift</Button>
                    </Col>
                </Row>
                <hr/>
                {!currentUser && popUpMessage ?  (
                <>
                <Row className="welcome-message">
                    <Col xs="12" sm="6" md="7">
                    <h3>Welcome to Zip Zap!</h3>
                    <p>Do you want to finish setting up your account?</p>
                    </Col>
                    <Col  xs="12" sm="6" md="3">
                        <Button variant="flat">
                            Go to Profile
                        </Button>
                    </Col>
                    <Col xs="12" sm="3" md="2">
                        <Button variant="dark" onClick={handleDismissPopup}>
                            Dismiss
                        </Button>
                    </Col>
                </Row>
                </>
            ) : null}
            <Row>
                <Col>
                <p>Welcome, {user.attributes.name}!</p>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}
export default GiftDashboard;
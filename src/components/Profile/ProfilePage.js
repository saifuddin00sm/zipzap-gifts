
import { Row, Col, Container, Button, Image, Card} from "react-bootstrap";
import React, {useEffect, useState } from "react";
import {
    IconPhone,
    IconEmail,
    IconHome
} from "@aws-amplify/ui-react";
import { useOutletContext } from "react-router-dom";
import { getUser } from "../../graphql/queries";
import { listUsers } from "../../graphql/queries";
import { createUser } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";


const initialState = { company: ""};

function ProfilePage(props) {
    //congito user information
    const [user, signOut] = useOutletContext();
    const [currentUser, setcurrentUser] = useState(null);
    const[newUser, setNewUser] = useState(false);



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
                setNewUser(true);
            }
            
        } catch (err) {
            console.log("error fetching user");
        }
    }

    const [formState, setFormState] = useState(initialState);

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value });
    }
    

    
    async function addUser() {
        try {
            if (!formState.company ) return;

            const newUser =  {id: user.username, email: user.attributes.email, name: user.attributes.name, phoneNumber: user.attributes.phone_number};
            setFormState(initialState);
            await API.graphql(graphqlOperation(createUser, { input: newUser }));
            fetchCurrentUser()

        } catch (err) {
            console.log("error creating todo:", err);
        }
    }

    return (
        <Container className="main-container">
            {newUser ? (
            <>
                <Row className="welcome-message">
                    <h1>Welcome to Zip Zap!</h1>
                    <p>Let's finish setting up your account!</p>
                    <hr/>
                </Row>
                <Row style={{backgroundColor: "#98B1C2", padding: "20px", borderRadius: "15px"}}>
                    <Card style={{backgroundColor: "#fff", padding: "2%", borderRadius: "15px"}}>
                        <p>Company Name:</p>
                        <input
                            onChange={(event) => setInput("company", event.target.value)}
                            value={formState.company}
                            placeholder="Company"
                        />
                        {/* <input
                            onChange={(event) => setInput("description", event.target.value)}
                            value={formState.description}
                            placeholder="Description"
                        /> */}
                        <br />
                        {/* <p>Company Address:</p>
                        <input
                            onChange={(event) => setInput("address", event.target.value)}
                            value={formState.address}
                            placeholder="Address"
                        /> */}
                        <div >
                            <Button variant="flat" type="submit" onClick={addUser}>
                                Finish setting up
                            </Button>
                        </div>

                    </Card>
                </Row>
            </>
                
            ) : (
            <>
                <Row className="page-header justify-content-center">
                    <Col md="10">
                        <h1>Profile</h1>
                    </Col>
                    <Col md="2">
                        <Button variant="dark" onClick={signOut}>Logout</Button>
                    </Col>
                </Row>
                <hr/>

                <Row className="profile-header">
                    <Col sm="1">
                        <Image roundedCircle src="https://s3.amazonaws.com/content.zipzapgifts.com/PersonalLogo+(5).png" style={{height: "80px", width: "auto"}}/>
                    </Col>
                    <Col>
                        <h2> {user.attributes.name}</h2>
                        <p> Company: Zip zap gifts</p>
                    </Col>
                </Row>

                <Row className="profile-contact-container">
                    <h3>Contact Info</h3>
                </Row>
                <Row>
                    <Col className="side-bar-contact-container">
                        <Row className="contact-container-row">
                            <Col sm="1" className="contact-container-icon"><IconHome /></Col>
                            <Col>Address:</Col>
                        </Row>
                        <Row className="contact-container-row">
                            <Col sm="1" className="contact-container-icon"><IconPhone /> </Col>
                            <Col> Phone: {user.attributes.phone_number}</Col>
                        </Row>
                        <Row className="contact-container-row">
                            <Col sm="1" className="contact-container-icon"><IconEmail /> </Col>
                            <Col> Email: {user.attributes.email} </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className="profile-contact-container">
                    <h3>Credit Cards On File</h3>
                </Row>
            </>
            )}
        </Container>
    );
}
export default ProfilePage;
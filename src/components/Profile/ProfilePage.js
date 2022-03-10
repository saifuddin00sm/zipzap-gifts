
import { Row, Col, Container, Button } from "react-bootstrap";

import {
    IconPhone,
    IconEmail,
    IconHome
} from "@aws-amplify/ui-react";
import { useOutletContext } from "react-router-dom";

// import { ReactComponent as PersonLogo } from "../../icons/";

function ProfilePage(props) {
    const [user] = useOutletContext();
    console.log(user.attributes)
    return (
        <Container className="main-container">
            <Row className="page-header justify-content-center">
                <Col md="10">
                    <h1>Profile</h1>
                </Col>
                <Col md="2">
                    <Button variant="dark">Logout</Button>
                </Col>
            </Row>
            <hr/>

            <Row className="profile-header">
                {/* <PersonLogo /> */}
                <h2> {user.attributes.name}</h2>
                <p> Company: Zip zap gifts</p>
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
            
        </Container>
    );
}
export default ProfilePage;
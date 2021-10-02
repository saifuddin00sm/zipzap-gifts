import React, { useContext, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { UserContext } from "../../../App";

function ProfileDashboard() {
    const { user } = useContext(UserContext);

    useEffect(() => {
        console.log("user is");
        console.log(user);
    }, [user]);

    return (
        <Col>
            <Row>
                <Col className="page-header justify-content-center ">
                    <h3>Profile</h3>
                </Col>
            </Row>
            <Row className="mx-4 p-3 profile-main">
                <p>
                    NAME: {user.firstName} {user.lastName}
                </p>
                <p>EMAIL: {user.email}</p>
            </Row>
        </Col>
    );
}

export default ProfileDashboard;

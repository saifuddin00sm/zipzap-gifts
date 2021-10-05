import React from "react";
import { Col, Navbar, Nav } from "react-bootstrap";

function SideBarComponent() {
    return (
        <Col className="text-center">
            <Navbar className="flex-column">
                <Nav className="flex-column" defaultActiveKey="/dashboard">
                    <Nav.Link
                        href="#/event"
                        className="side-bar-container-link "
                    >
                        {" "}
                        Gift Dashboard
                    </Nav.Link>
                    <Nav.Link
                        href="#/recipients"
                        className="side-bar-container-link"
                    >
                        {" "}
                        Recipients
                    </Nav.Link>
                    <Nav.Link
                        href="#/order/past"
                        className="side-bar-container-link"
                    >
                        {" "}
                        Orders
                    </Nav.Link>
                    <Nav.Link
                        href="#/gifts"
                        className="side-bar-container-link"
                    >
                        Gift Catalog
                    </Nav.Link>
                </Nav>
            </Navbar>
        </Col>
    );
}

export default SideBarComponent;

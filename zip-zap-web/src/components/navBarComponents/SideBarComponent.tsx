import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Col, Navbar, Nav, Button, ButtonGroup} from 'react-bootstrap'
import { navButton } from "../../classes";
import { ReactComponent as EventIcon } from "../../icons/eventIcon.svg";
import { ReactComponent as PeopleIcon} from "../../icons/smileyFace.svg";

function SideBarComponent() {
    return (
        <Col className="text-center">
            <Navbar className="flex-column" >
                <Nav  className="flex-column" defaultActiveKey="/dashboard">
                <Nav.Link href="#/event" className="side-bar-container-link "> Events</Nav.Link>
                <Nav.Link href="#/order/past" className="side-bar-container-link"> Orders</Nav.Link>
                <Nav.Link href="#/recipients" className="side-bar-container-link"> Recipients</Nav.Link>
                <Nav.Link href="#/gifts" className="side-bar-container-link">Gifts</Nav.Link>
                </Nav>
            </Navbar>
        </Col>
    );
}

export default SideBarComponent;

    import React, { useContext, useEffect, useState } from "react";
    import {Container, Row, Col, Popover} from 'react-bootstrap';
    import { fetchRequest, UserContext } from "../../../App";
    import { userGroupedItem } from "../../../classes";
    import appSettings from "../../../appSettings.json";
    import { ReactComponent as CloseIcon } from "../../icons/close.svg";


    const getGroupedItems = async (user: any) => {
    let response = await fetchRequest(user, "groupedItems", "GET");

    if ("items" in response) {
        console.log("the items")
        console.log(response.items)
        return response.items;
    }

    return {};
    };

    const getItems = async (user: any) => {
    let response = await fetchRequest(user, "items", "GET");

    if ("items" in response) {
        return response.items;
    }

    return {};
    };



    function ProfileDashboard() {
    const {
        user, 
        userUsers, 
        setUserUsers,
        setUserUsersLoaded, 
        userUsersLoaded,   
    } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("user is")
        console.log(user)
    }, []);

    return (
        <Col>
            <Row>
                <Col className="page-header justify-content-center ">
                    <h3>Profile</h3>
                </Col>
            </Row>
            <Row className="mx-4 p-3 profile-main">
                <p>NAME: {user.firstName} {user.lastName}</p>
                <p>EMAIL: {user.email}</p>
            </Row>
        </Col>
    );
    }

    export default ProfileDashboard;

    import React, { useContext, useState } from "react";
    import { UserContext } from "../../App";
    import {Card, Col, Accordion} from 'react-bootstrap'
    import { userGroupedItem } from "../../classes";
    import { getGroupedGiftPrice } from "../eventComponents/eventDashboard";
    import appSettings from "../../appSettings.json";
    import { CardCvcElement } from "@stripe/react-stripe-js";
    import { Link } from "react-router-dom";

    function GiftCard(props: {
    item?: userGroupedItem;
    index: number;
    action: Function;
    class?: string;
    }) {
    const { userItems } = useContext(UserContext);

    return !props.item ? (
        <Col md={3}>
            <Card
                className={`event-item-card-container ${props.class}`}
            >
                <div className={`event-item-card-image-loading`}>
                <div className={`loading-skeleton`}></div>
                </div>
            
                <Card.Img>
                <Card.Text className={`event-item-card-text-loading`}>
                <div className={`loading-skeleton`}></div>
                </Card.Text>
                <div className={`event-item-card-text-loading`}>
                <div className={`loading-skeleton`}></div>
                </div>
                </Card.Img>
            </Card>
        </Col>
    ) : (
        <Col md={3}>
        <Card
            className={`gift-item-card-container ${props.class}`}
            onClick={() => props.action(props.item?.groupedID)}
        >
            <Card.Header className={`gift-card-title`}>{props.item.name}</Card.Header>

            {props.item.mainPicture ? (
            <Card.Img
                src={`${appSettings.pictureURL}/${props.item.mainPicture}`}
                alt={props.item.name}
                className={`gift-item-card-image`}
            ></Card.Img>
            ) : null}
            <Card.Body>
            <Card.Text className={`gift-item-card-text-price`}>
            $
            {props.item.priceOverride
                ? props.item.priceOverride
                : getGroupedGiftPrice(props.item, userItems)}
            </Card.Text>
            <Card.Text>
                <button className="gift-item-details p-1" onClick={() => props.action(props.item?.groupedID)}>DETAILS</button>
                
                {/* <button className={`gift-item-details p-1 my-1`}>DETAILS</button> */}
                {/* <Accordion.Body className={`gift-item-description`}>
                {props.item.description}
                </Accordion.Body> */}
            </Card.Text>
            </Card.Body>
        </Card>
        </Col>
    );
    }

    export default GiftCard;

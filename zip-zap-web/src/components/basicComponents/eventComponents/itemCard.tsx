import React from "react";
import { userItem } from "../../../classes";
import { Card, Col } from "react-bootstrap";
import appSettings from "../../../appSettings.json";

function ItemCard(props: {
  item?: userItem;
  index: number;
  action: Function;
  class?: string;
}) {
  return !props.item ? (
    <Col sm={3}>
      <Card className={`m-1 ${props.class}`}>
        {/* <Card.Img className={`event-item-card-image-loading`}>
          <div className={`loading-skeleton`}></div>
        </Card.Img> */}
        <Card.Body>
          <Card.Text className={`event-item-card-text-loading`}>
            <div className={`loading-skeleton`}></div>
          </Card.Text>
          <Card.Text className={`event-item-card-text-loading`}>
            <div className={`loading-skeleton`}></div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ) : (
    <Col sm={3}>
      <Card
        className={`event-item-card-container ${props.class}`}
        onClick={() => props.action(props.item?.itemID)}
      >
        {props.item.mainPicture ? (
          <Card.Img
            src={`${appSettings.pictureURL}/${props.item.mainPicture}`}
            alt={props.item.name}
            className={`event-item-card-image`}
          />
        ) : null}

        <Card.Body>
          <Card.Text className={`event-item-card-text`}>
            {props.item.name}
          </Card.Text>
          <Card.Text className={`event-item-card-text`}>
            ${props.item.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ItemCard;

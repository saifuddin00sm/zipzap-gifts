import React, { useContext } from "react";
import { UserContext } from "../../../App";
import { Card, Col } from "react-bootstrap";
import { userGroupedItem } from "../../../classes";
import { getGroupedGiftPrice } from "../../eventComponents/eventDashboard";
import appSettings from "../../../appSettings.json";

function GroupedItemCard(props: {
  item?: userGroupedItem;
  index: number;
  action: Function;
  class?: string;
  border?: string;
}) {
  const { userItems } = useContext(UserContext);

  return !props.item ? (
    <Col md={3}>
      <Card className={`event-item-card-container ${props.class}`}>
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
        className={`event-item-card-container ${props.class}`}
        onClick={() => props.action(props.item?.groupedID)}
      >
        {props.item.mainPicture ? (
          <Card.Img
            src={`${appSettings.pictureURL}/${props.item.mainPicture}`}
            alt={props.item.name}
            className={`event-item-card-image`}
          ></Card.Img>
        ) : null}
        <Card.Body>
          <Card.Text className={`event-item-card-title`}>
            {props.item.name}
          </Card.Text>
          <Card.Text className={`event-item-card-text`}>
            $
            {props.item.priceOverride
              ? props.item.priceOverride
              : getGroupedGiftPrice(props.item, userItems)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default GroupedItemCard;

import React, { useState } from "react";
import { userEvent, userItem } from "../../../classes";
import appSettings from "../../../appSettings.json";

function ItemCard(props: {
  item?: userItem;
  index: number;
  action: Function;
  class?: string;
}) {
  const [showDetails, setShowDetails] = useState(false);
  return !props.item ? (
    <div
      className={`column center-column event-item-card-container ${props.class}`}
    >
      <div className={`event-item-card-image-loading`}>
        <div className={`loading-skeleton`}></div>
      </div>

      <div className={`event-item-card-text-loading`}>
        <div className={`loading-skeleton`}></div>
      </div>
      <div className={`event-item-card-text-loading`}>
        <div className={`loading-skeleton`}></div>
      </div>
    </div>
  ) : (
    <div
      className={`column event-item-card-container ${props.class}`}
      onClick={() => props.action(props.item?.itemID)}
    >
      {props.item.mainPicture ? (
        <img
          src={`${appSettings.pictureURL}/${props.item.mainPicture}`}
          alt={props.item.name}
          className={`event-item-card-image`}
        ></img>
      ) : null}

      <span className={`event-item-card-text`}>{props.item.name}</span>
      <span className={`event-item-card-text`}>${props.item.price}</span>
    </div>
  );
}

export default ItemCard;

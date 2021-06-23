import React, { useContext, useState } from "react";
import { UserContext } from "../../../App";
import { userGroupedItem } from "../../../classes";
import { getGroupedGiftPrice } from "../../eventComponents/eventDashboard";
import appSettings from "../../../appSettings.json";

function GroupedItemCard(props: {
  item?: userGroupedItem;
  index: number;
  action: Function;
  class?: string;
}) {
  const { userItems } = useContext(UserContext);

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
      onClick={() => props.action(props.item?.groupedID)}
    >
      {props.item.mainPicture ? (
        <img
          src={`${appSettings.pictureURL}/${props.item.mainPicture}`}
          alt={props.item.name}
          className={`event-item-card-image`}
        ></img>
      ) : null}
      <span className={`event-item-card-text`}>{props.item.name}</span>
      <span className={`event-item-card-text`}>
        $
        {props.item.priceOverride
          ? props.item.priceOverride
          : getGroupedGiftPrice(props.item, userItems)}
      </span>
    </div>
  );
}

export default GroupedItemCard;

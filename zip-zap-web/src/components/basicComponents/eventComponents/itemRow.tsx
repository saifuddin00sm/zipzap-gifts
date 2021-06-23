import React, { useState } from "react";
import { userItem } from "../../../classes";
import { ReactComponent as PlusIcon } from "../../../icons/plusSign.svg";
import SelectList from "../selectList";
import appSettings from "../../../appSettings.json";

function ItemRow(props: {
  item: userItem;
  index: number;
  action: Function;
  details: { [key: string]: any };
  class?: string;
}) {
  const [showDetails, setShowDetails] = useState(true);
  return (
    <li className={`column item-row-container`}>
      <div
        className={`row center-column space-between ${props.class} `}
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className={`row center-column`}>
          {props.item.mainPicture ? (
            <img
              src={`${appSettings.pictureURL}/${props.item.mainPicture}`}
              alt={props.item.name}
              className={`event-item-row-image`}
            ></img>
          ) : null}
          <span className={`event-item-card-text`}>{props.item.name}</span>
          <span className={`event-item-card-text`}>${props.item.price}</span>
        </div>

        <button
          className={`item-row-button`}
          onClick={() => props.action("removeItem", props.item?.itemID)}
        >
          <PlusIcon />
        </button>
      </div>
      <div
        className={`column item-row-details ${
          Object.keys(props.item.detailFields).length > 0 && showDetails
            ? "item-row-details-expand"
            : ""
        }`}
      >
        <br></br>
        <span className={`item-row-detail-title`}>
          <strong>Details</strong>
        </span>
        {Object.keys(props.item.detailFields).map((detail, dIndex) => (
          <div key={dIndex} className={`row center-column`}>
            <span className={`item-row-detail-title`}>{detail}:</span>

            {typeof props.item.detailFields[detail] === "object" ? (
              Array.isArray(props.item.detailFields[detail]) ? (
                <SelectList
                  detailList={props.item.detailFields[detail]}
                  action={(option: any, index: number) =>
                    props.action("detail", { detail, option, index })
                  }
                  selected={
                    detail in props.details ? props.details[detail].index : 0
                  }
                />
              ) : (
                "nope"
              )
            ) : null}
          </div>
        ))}
      </div>
    </li>
  );
}

export default ItemRow;

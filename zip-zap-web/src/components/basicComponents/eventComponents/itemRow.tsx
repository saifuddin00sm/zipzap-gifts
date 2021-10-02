import React, { useState } from "react";
import { userItem } from "../../../classes";
import { Row, Col } from "react-bootstrap";
import { ReactComponent as CloseIcon } from "../../../icons/close.svg";
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
    <Row>
      <div
        className={`row center-column space-between ${props.class} `}
        onClick={() => setShowDetails(!showDetails)}
      >
        <Row className="m-1">
          <Col>
            {props.item.mainPicture ? (
              <img
                src={`${appSettings.pictureURL}/${props.item.mainPicture}`}
                alt={props.item.name}
                className={`event-item-row-image`}
              ></img>
            ) : null}
          </Col>
          <Col>
            <span className={`event-item-card-text`}>{props.item.name}</span>
          </Col>
          <Col>
            <span className={`event-item-card-text`}>${props.item.price}</span>
          </Col>
          <Col xs={1}>
            <button
              className={`item-row-button`}
              onClick={() => props.action("removeItem", props.item?.itemID)}
            >
              <CloseIcon />
            </button>
          </Col>
        </Row>
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
    </Row>
  );
}

export default ItemRow;

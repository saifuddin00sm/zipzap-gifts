import React, { useEffect, useState } from "react";
import { adminItem } from "../../../classes";
import {Row, Col, Accordion} from 'react-bootstrap';
import { ReactComponent as CloseIcon } from "../../../icons/close.svg";

// props.action req = (type:string, item:adminItem, index:number)
function AdminItemRow(props: {
  index: number;
  item: undefined | adminItem;
  action: Function;
  type: string;
}) {
  return props.item ? (
    <Col
      className={`item-card-row-container p-4`} sm="4"
    >
      <Row>
      <Col sm="4">
        <span className={`item-card-row-title`}>{props.item.name}</span>
      </Col>
      <Col sm="2">
      <span className={`item-card-row-price-quant`}>${props.item.price}</span>
      </Col>
      <Col sm="2">
      <span className={`item-card-row-price-quant`}>
        Q:{props.item.quantity}
      </span>
      </Col>
      {props.type === "remove" ? (
        <Col>
        <span
          className={`row center right-align-row item-card-row-remove`}
          onClick={(e: any) => props.action("removeItem", props.index)}
        >
          <CloseIcon />
        </span>
        </Col>
      ) : props.type === "add" ? (
        <span
          className={`row center right-align-row item-card-row-add`}
          onClick={(e: any) => props.action("addItem", props.item?.itemID)}
        >
          <CloseIcon />
        </span>
      ) : null}
      
      </Row>
    </Col>
  ) : null;
}

export default AdminItemRow;

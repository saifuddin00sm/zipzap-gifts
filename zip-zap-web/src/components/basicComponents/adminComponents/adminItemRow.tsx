import React, { useEffect, useState } from "react";
import { adminItem } from "../../../classes";
import { ReactComponent as CloseIcon } from "../../../icons/close.svg";

// props.action req = (type:string, item:adminItem, index:number)
function AdminItemRow(props: {
  index: number;
  item: undefined | adminItem;
  action: Function;
  type: string;
}) {
  return props.item ? (
    <div
      className={`row center left-align-row full-width item-card-row-container`}
    >
      <span className={`item-card-row-title`}>{props.item.name}</span>

      <span className={`item-card-row-price-quant`}>${props.item.price}</span>

      <span className={`item-card-row-price-quant`}>
        Q:{props.item.quantity}
      </span>

      {props.type === "remove" ? (
        <span
          className={`row center right-align-row item-card-row-remove`}
          onClick={(e: any) => props.action("removeItem", props.index)}
        >
          <CloseIcon />
        </span>
      ) : props.type === "add" ? (
        <span
          className={`row center right-align-row item-card-row-add`}
          onClick={(e: any) => props.action("addItem", props.item?.itemID)}
        >
          <CloseIcon />
        </span>
      ) : null}
    </div>
  ) : null;
}

export default AdminItemRow;

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import { adminItem, adminOrder } from "../../../classes";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";
import AdminItemRow from "./adminItemRow";

// props.action req = (type:string, item:adminItem, index:number)
function AdminOrderRow(props: {
  index: number;
  order: adminOrder;
  giftee: any;
  action: Function;
  allowMultiple: boolean;
  activeOrder: null | number;
  cardMode?: boolean;
  editing?: boolean;
}) {
  const { adminItems, adminGroupedItems } = useContext(UserContext);
  const [editing, setEditing] = useState(props.editing ? props.editing : false);

  // const [editableItem, setEditableItem] = useState(
  //   JSON.parse(JSON.stringify(props.item)) as adminItem
  // );

  // useEffect(() => {
  //   setEditableItem(JSON.parse(JSON.stringify(props.item)));
  // }, [editing]);

  // const handleEditItem = (type: string, e: any) => {
  //   if (type === "name") {
  //     editableItem.name = e.target.value;
  //   } else if (type === "price") {
  //     editableItem.price = e.target.value;
  //   } else if (type === "description") {
  //     editableItem.description = e.target.value;
  //   } else if (type === "quantity") {
  //     editableItem.quantity = e.target.value;
  //   } else if (type === "quantityAvailable") {
  //     editableItem.quantityAvailable = e.target.value;
  //   }

  //   setEditableItem({ ...editableItem });
  // };

  // const handleSave = () => {
  //   props.action("save", editableItem, props.index);
  //   setEditing(false);
  // };

  // const handleDelete = () => {
  //   editableItem.isActive = false;
  //   props.action("delete", editableItem, props.index);
  //   setEditing(false);
  // };

  // const handleImageRemove = (index: number) => {
  //   editableItem.pictures.splice(index, 1);
  //   setEditableItem({ ...editableItem });
  // };

  // const changeMainPicture = (index: number) => {
  //   editableItem.pictures.push(editableItem.mainPicture);
  //   editableItem.mainPicture = editableItem.pictures[index];
  //   setEditableItem({ ...editableItem });

  //   handleImageRemove(index);
  // };

  return !props.cardMode ? (
    <tr>
      {props.allowMultiple ? (
        <td className={`admin-order-button`}>
          <input
            type={"checkbox"}
            onClick={() => props.action("select", props.index)}
          ></input>
        </td>
      ) : null}
      <td data-label="Order #">
        {props.order.campaignID}-{props.order.orderID}
      </td>
      <td data-label="Shipping Date">
        {new Date(props.order.shippingDate).toDateString()}
      </td>
      <td data-label="Shipping Address">
        {" "}
        {props.giftee && "Address" in props.giftee
          ? props.giftee.Address
          : props.order.shippingAddress}
      </td>
      <td data-label="Giftee Name">
        {" "}
        {props.giftee && "Name" in props.giftee ? props.giftee.Name : "N/A"}
      </td>
      <td data-label="Gift">
        {" "}
        {props.order.giftID && props.order.giftID in adminItems
          ? adminItems[props.order.giftID].name
          : props.order.groupedID && props.order.groupedID in adminGroupedItems
          ? adminGroupedItems[props.order.groupedID].name
          : "N/A"}
      </td>
      <td data-label="Campaign">{props.order.campaignName}</td>
      <td className={`admin-order-button`}>
        {" "}
        <button
          className={`general-button admin-button`}
          onClick={() => props.action("orderDetails", props.index)}
          // disabled={!props.item.isActive}
        >
          Order Details
        </button>
        <button
          className={`general-button admin-button`}
          onClick={() => setEditing(true)}
          // disabled={!props.item.isActive}
        >
          Print Slip
        </button>
        <button
          className={`general-button admin-button`}
          onClick={() => setEditing(true)}
          // disabled={!props.item.isActive}
        >
          Fulfill Order
        </button>
      </td>

      {/* {props.activeOrder !== null ? (
        <tr>
          <th scope="col" rowSpan={2}>
            Details
          </th>
          <td data-label="Body">{props.order.campaignName}</td>
        </tr>
      ) : null} */}

      {/* <td data-label="Giftee Name">03/01/2016 - 03/31/2016</td> */}
    </tr>
  ) : (
    <div
      className={`column center item-card-container ${
        !props.order.isActive ? "item-card-container-inactive" : ""
      }`}
    >
      <h3>
        Order #{props.order.campaignID}-{props.order.orderID}{" "}
        {!props.order.isActive ? ` - INACTIVE` : ""}
      </h3>

      <div className={`item-card-body`}>
        <p>
          Shipping Date: {new Date(props.order.shippingDate).toDateString()}
        </p>
        <p>
          Shipping Address:{" "}
          {props.giftee && "Address" in props.giftee
            ? props.giftee.Address
            : props.order.shippingAddress}
        </p>
        <p>
          Giftee Name:{" "}
          {props.giftee && "Name" in props.giftee ? props.giftee.Name : "N/A"}
        </p>
        <p>
          <span>
            Gift:{" "}
            {props.order.giftID && props.order.giftID in adminItems
              ? adminItems[props.order.giftID].name
              : props.order.groupedID &&
                props.order.groupedID in adminGroupedItems
              ? adminGroupedItems[props.order.groupedID].name
              : "N/A"}
          </span>
          <p>
            <span>Items Details:</span>
            {props.order.giftID && props.order.giftID in adminItems
              ? adminItems[props.order.giftID].description
              : props.order.groupedID &&
                props.order.groupedID in adminGroupedItems
              ? adminGroupedItems[props.order.groupedID].itemsArray.map(
                  (itemID, iIndex) => (
                    <AdminItemRow
                      key={iIndex}
                      index={iIndex}
                      item={adminItems[itemID]}
                      // item={adminItems.find((item, index) => item.itemID === itemIndex)}
                      type={""}
                      action={() => null}
                    />
                  )
                )
              : "N/A"}
          </p>
        </p>
        <p>Campaign: {props.order.campaignName}</p>
        <p>Note: {props.order.notes}</p>
      </div>

      <div className={`row center space-between`}>
        <button
          className={`general-button admin-button`}
          onClick={() => props.action("orderDetailsClose", props.index)}
          // disabled={!props.item.isActive}
        >
          Close Order Details
        </button>
        <button
          className={`general-button admin-button`}
          onClick={() => setEditing(true)}
          // disabled={!props.item.isActive}
        >
          Print Slip
        </button>
        <button
          className={`general-button admin-button`}
          onClick={() => setEditing(true)}
          // disabled={!props.item.isActive}
        >
          Fulfill Order
        </button>
      </div>
    </div>
  );
}

export default AdminOrderRow;

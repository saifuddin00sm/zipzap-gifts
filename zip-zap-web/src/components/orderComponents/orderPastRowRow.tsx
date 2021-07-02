import React, { useContext, useEffect, useState } from "react";
import { fetchRequest, UserContext } from "../../App";
import {
  eventOrder,
  userGroupedItem,
  userItem,
  userMonthOrderList,
} from "../../classes";
import LoadingIcon from "../basicComponents/LoadingIcon";
import { ReactComponent as AddIcon } from "../../icons/plusSign.svg";
import EventDetailsRow from "../basicComponents/eventComponents/eventDetailsRow";
import { Link, RouteComponentProps } from "react-router-dom";
import CalendarMonth from "../basicComponents/calendarMonth";
import CalendarSidebar from "../basicComponents/calendarComponents/calendarSidebar";
import {
  getEvents,
  getItems,
  getGroupedItems,
  getMonthOrders,
} from "../eventComponents/eventDashboard";

function OrderPastRowRow(props: { campaignID: string; order: eventOrder }) {
  const { userEvents, userUsers, userGroupedItems } = useContext(UserContext);

  const [expanded, setExpanded] = useState(false);

  return (
    <tr>
      {false ? (
        <td className={`admin-order-button`}>
          <input
            type={"checkbox"}
            // onClick={() => props.action("select", props.index)}
          ></input>
        </td>
      ) : null}
      <td data-label="Recipient">
        {props.order.giftee in userUsers.activeUsers
          ? `${userUsers.activeUsers[props.order.giftee]["First Name"]} ${
              userUsers.activeUsers[props.order.giftee]["Last Name"]
            }`
          : props.order.giftee in userUsers.inActiveUsers
          ? `${userUsers.activeUsers[props.order.giftee]["First Name"]} ${
              userUsers.activeUsers[props.order.giftee]["Last Name"]
            }`
          : ""}
      </td>
      <td data-label="Day">
        {new Date(props.order.shippingDate).toDateString()}
      </td>

      <td data-label="Gift">
        {props.order.groupedID && props.order.groupedID in userGroupedItems
          ? userGroupedItems[props.order.groupedID].name
          : "Unknown Gift"}
      </td>
      <td data-label="Cost">
        $
        {props.order.cost
          ? props.order.cost + props.order.shippingFee
          : props.order.groupedID && props.order.groupedID in userGroupedItems
          ? userGroupedItems[props.order.groupedID].priceOverride
          : "0"}
      </td>
      {/* <td className={`admin-order-button`}>
        {" "}
        <button
          className={`general-button admin-button`}
          // onClick={() => props.action("orderDetails", props.index)}
          // disabled={!props.item.isActive}
        >
          Order Details
        </button>
        <button
          className={`general-button admin-button`}
          // onClick={() => setEditing(true)}
          // disabled={!props.item.isActive}
        >
          Print Slip
        </button>
        <button
          className={`general-button admin-button`}
          // onClick={() => setEditing(true)}
          // disabled={!props.item.isActive}
        >
          Fulfill Order
        </button>
      </td> */}
    </tr>
  );
}

export default OrderPastRowRow;

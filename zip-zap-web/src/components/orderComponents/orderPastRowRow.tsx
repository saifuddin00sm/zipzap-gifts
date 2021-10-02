import React, { useContext } from "react";
import { UserContext } from "../../App";
import { eventOrder } from "../../classes";

function OrderPastRowRow(props: { campaignID: string; order: eventOrder }) {
  const { userUsers, userGroupedItems } = useContext(UserContext);

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

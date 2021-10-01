import React from "react";
import { adminAccountDetails } from "../../classes";

function AdminAccountRow(props: {
  account: adminAccountDetails;
  action: Function;
}) {
  return (
    <tr
      className={`

      `}
    >
      <td data-label="Account ID">{props.account.accountID}</td>
      <td data-label="Account Name">{props.account.name}</td>
      <td data-label="Contact">
        {props.account.firstName} {props.account.lastName}
      </td>
      <td data-label="Date Created">
        {new Date(props.account.dateCreated).toString()}
      </td>
      <td data-label="Plan">{props.account.planName}</td>
      <td data-label="Price">${props.account.planPrice}</td>
      <td className={`admin-order-button `}>
        {" "}
        <button
          className={`general-button admin-button`}
          onClick={() =>
            props.action("chargeAccountOrders", props.account.accountID)
          }
          // disabled={!props.item.isActive}
        >
          Charge Subscription + Orders
        </button>
        <button
          className={`general-button admin-button`}
          onClick={() => props.action("chargeOrders", props.account.accountID)}
          // disabled={!props.item.isActive}
        >
          Charge Orders Only
        </button>
      </td>
    </tr>
  );
}

export default AdminAccountRow;

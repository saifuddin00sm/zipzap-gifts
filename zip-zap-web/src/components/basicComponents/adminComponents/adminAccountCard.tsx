import React, { useEffect, useState } from "react";
import { adminAccount } from "../../../classes";

function AdminAccountCard(props: {
  index: number;
  account: adminAccount;
  action: Function;
}) {
  return (
    <div className={`column center item-card-container `}>
      <h3>Account: {props.account.name}</h3>
      <div className={`item-card-body`}>
        <p>Orders: {props.account.orderCount}</p>
      </div>

      <button
        className={`general-button admin-button`}
        onClick={() => props.action(props.account.accountID)}
      >
        View Orders
      </button>
    </div>
  );
}

export default AdminAccountCard;

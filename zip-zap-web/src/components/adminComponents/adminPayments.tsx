import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRequest, UserContext } from "../../App";
import { adminMenuButton } from "../../classes";

function AdminPayments() {
  const {
    user,
    admin,
    setAdmin,
    setUserFeatures,
    userFeatures: AppUserFeatures,
  } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  // GET Accounts, then charge individually
  // const handlePayments = async ()=>{
  //   let response = await fetchRequest(user, "admin/chargeAccounts", "GET")
  // }

  return (
    <div className={`column center `}>
      <h2>Charge Payments</h2>
      coming soon
    </div>
  );
}

export default AdminPayments;

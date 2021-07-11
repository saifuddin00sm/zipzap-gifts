import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRequest, UserContext } from "../../App";
import { adminAccountDetails, adminMenuButton } from "../../classes";
import LoadingIcon from "../basicComponents/LoadingIcon";
import AdminAccountRow from "./adminAccountRow";

function AdminPayments() {
  const {
    user,
    admin,
    setAdmin,
    setUserFeatures,
    userFeatures: AppUserFeatures,
  } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [accounts, setAccounts] = useState(
    {} as { [key: string]: adminAccountDetails }
  );

  // GET Accounts, then charge individually
  const handleGetAccounts = async () => {
    let response = await fetchRequest(user, "admin/accounts", "GET");

    if ("error" in response && response.error) {
      // TO-DO - handle error
      setLoading(false);
      return;
    }

    if ("accounts" in response && response.accounts) {
      setAccounts(response.accounts);
    }

    setLoading(false);
  };

  const handleRowAction = (type: string, accountID: number) => {
    if (loading) {
      return;
    } else if (type === "chargeAccountOrders") {
      handlePayment(accountID, "both");
    } else if (type === "chargeOrders") {
      handlePayment(accountID, "orders");
    }
  };

  const handlePayment = async (accountID: number, subscription: string) => {
    setLoading(true);
    setError("");
    let chargeResponse = await fetchRequest(
      user,
      `admin/chargeAccounts/${accountID}${
        subscription === "both" ? `?subscription=true` : ""
      }`,
      "GET"
    );

    if ("error" in chargeResponse && chargeResponse.error) {
      // TO-DO - handle error
      setLoading(false);
      return;
    }

    if (
      "paymentErrors" in chargeResponse &&
      chargeResponse.paymentErrors &&
      chargeResponse.paymentErrors.length === 0
    ) {
      setError("Error with a Payment  - Please Check Console and DB");
      console.log("Payment Error: ", chargeResponse.paymentErrors);
      setLoading(false);
      return;
    }

    setLoading(false);

    console.log("Charge ", chargeResponse);
  };

  useEffect(() => {
    handleGetAccounts();
  }, []);

  return (
    <div className={`column center `}>
      <h1>Charge Payments</h1>
      {loading ? <LoadingIcon /> : null}

      <section className={`row width-90`}>
        <Link to={"/admin/dashboard"} className={`back-link`}>
          Back to Admin Dashboard
        </Link>
      </section>

      <h2>Accounts</h2>

      <br></br>
      <div>{error}</div>
      <table className={`admin-order-table`}>
        <thead>
          <th scope="col">Account ID</th>
          <th scope="col">Account Name</th>
          <th scope="col">Contact</th>
          <th scope="col">Date Created</th>
          <th scope="col">Plan</th>
          <th scope="col">Price</th>
          <th scope="col">Actions</th>
        </thead>
        <tbody>
          {Object.keys(accounts).map((aID, aIndex) => (
            <AdminAccountRow
              key={aIndex}
              account={accounts[aID]}
              action={handleRowAction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPayments;

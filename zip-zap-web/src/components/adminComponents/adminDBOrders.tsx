import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRequest, UserContext } from "../../App";
import LoadingIcon from "../basicComponents/LoadingIcon";

function AdminDBOrders() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [errorLog, setErrorLog] = useState(
    [] as Array<{
      error: "";
      campaign: {
        campaignName: string;
        campaignID: number;
        accountID: number;
        ordersErrored: Array<{ error: string; order: string }>;
        ordersLoaded: Array<string>;
      };
    }>
  );

  const handlePayments = async () => {
    setLoading(true);
    // This API can accept a query param "month" which should be the month number (1 based)
    // to load orders for
    let response = await fetchRequest(user, "admin/updateDBOrders", "GET");

    setLoading(false);
    console.log("response", response);

    if ("details" in response && "errorCampaigns" in response.details) {
      setErrorLog(response.details.errorCampaigns);
    }
  };

  return (
    <div className={`column center`}>
      <h2>Load into DB</h2>
      {loading ? (
        <LoadingIcon />
      ) : (
        <button onClick={handlePayments}>Load Orders</button>
      )}
      <section className={`row width-90`}>
        <Link to={"/admin/dashboard"} className={`back-link`}>
          Back to Admin Dashboard
        </Link>
      </section>
      <br></br>
      {errorLog.map((error, eIndex) => (
        <div key={eIndex} className={`column center-column`}>
          <span>Error: {error.error}</span>
          <span>Account: {error.campaign.accountID}</span>
          <span>Campaign: {error.campaign.campaignID}</span>

          <button onClick={() => console.log("Error Log: ", error)}>
            Console Data
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminDBOrders;

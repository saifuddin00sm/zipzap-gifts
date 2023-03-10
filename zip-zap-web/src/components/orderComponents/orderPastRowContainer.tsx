import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { eventOrder } from "../../classes";
import OrderPastRowRow from "./orderPastRowRow";
import { calcMonthPrice } from "./orderPastDashboard";

function OrderPastRowContainer(props: {
  campaignID: string;
  campaignOrders: { [key: string]: eventOrder };
  loading?: boolean;
}) {
  const { userEvents } = useContext(UserContext);
  

  const [expanded, setExpanded] = useState(false);
  return props.loading ? (
    <div className={`full-width  column center-row left-align-column`}>
      <button
        className={`previous-order-event-title previous-order-event-box center-self`}
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className={`event-item-card-text-loading event-user-list-user-loading`}
        >
          <div className={`loading-skeleton`}></div>
        </div>
      </button>
    </div>
  ) : (
    <div className={`full-width  column center-row left-align-column`}>
      <button
        className={`previous-order-event-title previous-order-event-box center-self`}
        onClick={() => setExpanded(!expanded)}
      >
        {props.campaignID in userEvents
          ? userEvents[props.campaignID].name
          : "Unknown event"}
        {" - "}
        {Object.keys(props.campaignOrders).length} Orders - $
        {calcMonthPrice(props.campaignOrders)}
      </button>

      <table
        className={`center-self column previous-order-body ${
          expanded ? "previous-order-body-show" : ""
        } previous-order-table `}
      >
        {/* <caption>
          Orders{" "}
        </caption> */}
        {false ? <caption>Orders Selected: </caption> : null}

        <thead className={`row center space-bewteen`}>
          {false ? <th scope="col">Select</th> : null}
          <th scope="col">Recipient</th>
          <th scope="col">Day</th>
          <th scope="col">Gift</th>
          <th scope="col">Cost</th>

          {/* <th scope="col">Actions</th> */}

          {/* {activeOrder !== null ? (
                <th scope="col" rowSpan={2}>
                  Details
                </th>
              ) : null} */}
        </thead>
        <tbody className="orderTable">
          {Object.keys(props.campaignOrders).map((orderID, oIndex) => (
            <OrderPastRowRow
              key={oIndex}
              campaignID={props.campaignID}
              order={props.campaignOrders[orderID]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderPastRowContainer;

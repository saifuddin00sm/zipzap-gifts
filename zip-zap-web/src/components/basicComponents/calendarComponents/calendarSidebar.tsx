import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import { userEvent, userMonthOrderList } from "../../../classes";
import { getIcon } from "../../eventComponents/eventNew";
import { getDateMonthDay } from "../calendarMonth";

function CalendarSidebar(props: {
  action: Function;
  orders: userMonthOrderList;
}) {
  const { user, userEvents, userUsers, setUserUsers } = useContext(UserContext);

  return (
    <div className={`calendar-side-bar`}>
      {/* <h1></h1> */}
      {Object.keys(props.orders.orders).map((date, dIndex) => (
        <div key={dIndex} className={`column calendar-side-bar-date-box`}>
          <strong>{getDateMonthDay(date)}</strong>
          <div>
            {Object.keys(props.orders.orders[date]).map((orderID, oIndex) => (
              <Link
                to={`/order/${props.orders.orders[date][orderID].campaignID}/${orderID}`}
                key={oIndex}
                className={`calendar-side-bar-order-box`}
              >
                {props.orders.orders[date][orderID].campaignID in userEvents
                  ? getIcon(props.orders.orders[date][orderID].campaignID)
                  : null}
                {/* {props.orders.orders[date][orderID].campaignID in userEvents
                  ? userEvents[props.orders.orders[date][orderID].campaignID]
                      .name
                  : null} */}
                {" - "}
                {props.orders.orders[date][orderID].giftee in
                userUsers.activeUsers
                  ? `${
                      userUsers.activeUsers[
                        props.orders.orders[date][orderID].giftee
                      ]["First Name"]
                    } ${
                      userUsers.activeUsers[
                        props.orders.orders[date][orderID].giftee
                      ]["Last Name"]
                    }`
                  : null}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CalendarSidebar;

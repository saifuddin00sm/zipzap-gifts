import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import { userEvent, userMonthOrderList } from "../../../classes";
import { getIcon } from "../../eventComponents/eventNew";
import { getDateMonthDay } from "./calendarMonth";

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
          <div className={`column`}>
            {Object.keys(props.orders.orders[date]).map((orderID, oIndex) => (
              <Link
                to={`/order/${props.orders.orders[date][orderID].campaignID}/${orderID}`}
                key={oIndex}
                className={`calendar-side-bar-order-box row center`}
              >
                {props.orders.orders[date][orderID].campaignID in userEvents &&
                userEvents[props.orders.orders[date][orderID].campaignID]
                  .defaultDetails.eventIcon !== undefined ? (
                  <span>
                    {getIcon(
                      userEvents[props.orders.orders[date][orderID].campaignID]
                        .defaultDetails.eventIcon
                    )}{" "}
                    -{" "}
                  </span>
                ) : null}
                {/* {props.orders.orders[date][orderID].campaignID in userEvents
                  ? userEvents[props.orders.orders[date][orderID].campaignID]
                      .name
                  : null} */}
                <span>
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
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CalendarSidebar;

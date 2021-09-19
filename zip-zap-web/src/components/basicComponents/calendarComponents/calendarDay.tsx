import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import { userMonthOrderList } from "../../../classes";

function CalendarDay(props: {
  action: Function;
  dayIndex: number;
  month: number;
  orders: userMonthOrderList;
}) {
  const { user, userEvents, userUsers, setUserUsers } = useContext(UserContext);

  const year = new Date();

  const today = new Date(
    `${props.month + 1}-${props.dayIndex + 1}-${year.getFullYear()}`
  );

  const todayString = today.toDateString();

  const [showDateDetails, setShowDateDetails] = useState({
    eventID: "",
    date: "",
  });

  // const handleDateClick = (type: string, eventID: string, date: string) => {
  //   if (type === "show") {
  //     console.log("t", type, [eventID], [date]);

  //     showDateDetails.eventID = eventID;
  //     showDateDetails.date = date;

  //     setShowDateDetails({ ...showDateDetails });
  //     // setRedirect("/")
  //     // TO-DO - show order details
  //   }

  //   // props.action("show", eventID, date)
  // };

  return (
    <li
      className={`row center`}
      style={{
        background:
          todayString in props.orders.orders ? "var(--primary-blue)" : "",
      }}
    >
      <span className={`calendar-date-title`}>{props.dayIndex + 1}</span>
      <div className={`column calendar-event-list`}>
        {/* {Object.keys(props.userMonthOrders.orders).map(
                (date: string, daIndex) =>
                  compareCurrentDate(date, month, props.dayIndex) ? (
                    <div
                      key={daIndex}
                      className={`row center row-wrap`}
                      style={{
                        background:
                          Object.keys(props.userMonthOrders.orders[date])
                            .length > 0
                            ? `var(${colorList[getRandomInt(0, 3)]})`
                            : "",
                      }}
                      onClick={() => handleDateClick("show", date, date)}
                    >
                      {console.log(
                        "INNER",
                        Object.keys(props.userMonthOrders.orders[date]).length,
                        props.userMonthOrders.orders[date],
                        date
                      )}
                      {Object.keys(props.userMonthOrders.orders[date]).length >
                      1
                        ? `x${
                            Object.keys(props.userMonthOrders.orders[date])
                              .length
                          }`
                        : null}
                    </div>
                  ) : null
              )} */}
      </div>
    </li>
  );
}

export default CalendarDay;

// {[...Array(lastDay)].map((d, dIndex) => (
//   <li key={dIndex}>
//     <span>{dIndex + 1}</span>
//     <div className={`column calendar-event-list`}>
//       {Object.keys(props.userMonthOrders.orders).map(
//         (eventID: string, eIndex) =>
//           Object.keys(props.userMonthOrders.orders[eventID]).map(
//             (date, daIndex) =>
//               compareCurrentDate(date, month, dIndex) ? (
//                 props.listOrders ? (
//                   Object.keys(
//                     props.userMonthOrders.orders[eventID][date]
//                   ).map((orderID, oIndex) => (
//                     <div
//                       key={oIndex}
//                       className={`row center-column row-wrap`}
//                       onClick={() =>
//                         handleDateClick("show", eventID, date)
//                       }
//                     >
//                       {eventID in userEvents
//                         ? getIcon(
//                             userEvents[eventID].defaultDetails.eventIcon
//                           )
//                         : null}
//                       {props.userMonthOrders.orders[eventID][date][
//                         orderID
//                       ].giftee in userUsers.activeUsers
//                         ? userUsers.activeUsers[
//                             props.userMonthOrders.orders[eventID][date][
//                               orderID
//                             ].giftee
//                           ].Name
//                         : "..."}
//                     </div>

//                   ))
//                 ) : (
//                   <div
//                     key={daIndex}
//                     className={`row center row-wrap`}
//                     // style={{
//                     //   background: `var(${
//                     //     colorList[getRandomInt(0, 3)]
//                     //   })`,
//                     // }}
//                     onClick={() =>
//                       handleDateClick("show", eventID, date)
//                     }
//                   >
//                     {eventID in userEvents
//                       ? getIcon(
//                           userEvents[eventID].defaultDetails.eventIcon
//                         )
//                       : null}{" "}
//                     {Object.keys(
//                       props.userMonthOrders.orders[eventID][date]
//                     ).length > 1
//                       ? `x${
//                           Object.keys(
//                             props.userMonthOrders.orders[eventID][date]
//                           ).length
//                         }`
//                       : null}
//                   </div>
//                 )
//               ) : null
//           )
//       )}
//     </div>
//   </li>
// ))}
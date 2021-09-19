import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import {Container, Row, Col, Table} from 'react-bootstrap'
import { userEvent, userMonthOrderList } from "../../../classes";
import { getUserList } from "../../eventComponents/eventDashboard";
import { getIcon, getRandomInt } from "../../eventComponents/eventNew";
import CalendarDay from "./calendarDay";
import Calendar from "./Calendar";
import ModalBox from "../modalBox";

const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthsOfTheYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Novemeber",
  "December",
];

const colorList = ["--primary-blue", "--primary-pink", "--primary-green"];

let dayRowCount = 0;

const getMonthSunday = (startingDate?: string) => {
  let date = startingDate ? new Date(startingDate) : new Date();

  let month = date.getMonth();

  let firstDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).toDateString();

  let firstDay = new Date(firstDate).getDate();

  let lastDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).toDateString();

  let lastDay = new Date(lastDate).getDate();

  let firstDayOfTheWeek = new Date(firstDate).getDay();
  let lastDayOfTheWeek = new Date(lastDate).getDay();


  return {
    month,
    firstDate,
    lastDate,
    firstDay,
    lastDay,
    firstDayOfTheWeek,
    lastDayOfTheWeek,
  };
};


const compareCurrentDate = (date: string, month: number, day: number) => {
  let eventDate = new Date(date);

  let eventMonth = eventDate.getMonth();
  let eventDay = eventDate.getDate();

  return eventMonth === month && eventDay === day;
};

const getDateMonthDay = (date: string) => {
  let eventDate = new Date(date);

  return `${monthsOfTheYear[eventDate.getMonth()]} ${eventDate.getDate()}`;
};

// function newLineTest(userMonthOrders: userMonthOrderList) {
//   let {
//     month,
//     firstDate,
//     lastDate,
//     firstDay,
//     lastDay,
//     firstDayOfTheWeek,
//     lastDayOfTheWeek,
//   } = getMonthSunday();
//   let calRows = "<tr>";

//   let numDays = 1;

//   while (numDays <= lastDay ) {
//     calRows += " <tr> <td>1</td> </tr>"
//     numDays++;
//   }



//   return{__html:
//   // [...Array(7 - firstDayOfTheWeek)].map((d, dIndex) => (
//   //   <td>
//   //   <CalendarDay
//   //     key={dIndex}
//   //     action={() => null}
//   //     dayIndex={dIndex}
//   //     month={month}
//   //     orders={userMonthOrders}
//   //   />
//   //   </td>
//   // ))
//   calRows
// }
// }


function CalendarMonth(props: {
  userMonthOrders: userMonthOrderList;
  listOrders?: boolean;
  action: Function;
}) {
  const { user, userEvents, userUsers, setUserUsers, setUserUsersLoaded } =
    useContext(UserContext);

  const today = new Date();
  let {
    month,
    firstDate,
    lastDate,
    firstDay,
    lastDay,
    firstDayOfTheWeek,
    lastDayOfTheWeek,
  } = getMonthSunday();

  const settingUsers = async () => {
    let users = await getUserList(user);
    setUserUsers(users);
    setUserUsersLoaded(true);
  };

  // const settingDays = days => {

  // }

  useEffect(() => {
    if (Object.keys(userUsers.activeUsers).length === 0) {
      settingUsers();
    }
  }, []);

  const [showDateDetails, setShowDateDetails] = useState({
    eventID: "",
    date: "",
  });

  const handleDateClick = (type: string, eventID: string, date: string) => {
    if (type === "show") {
      console.log("t", type, [eventID], [date]);

      showDateDetails.eventID = eventID;
      showDateDetails.date = date;

      setShowDateDetails({ ...showDateDetails });
      // setRedirect("/")
      // TO-DO - show order details
    }

    // props.action("show", eventID, date)
  };

  return (
    <Col>
      {/* <h2>
        {monthsOfTheYear[today.getMonth()]} {today.getFullYear()}
      </h2> */}
          {showDateDetails.eventID ? (
          <ModalBox>
            <div className={`column calendar-orders`}>
              <h3>Orders on {showDateDetails.date}:</h3>
              <ul>
                {Object.keys(
                  props.userMonthOrders.orders[showDateDetails.eventID][
                    showDateDetails.date
                  ]
                ).map((orderID, oIndex) => (
                  // <li key={oIndex} className={`column`}>
                  //   <span>
                  //     {props.userMonthOrders.orders[showDateDetails.eventID][
                  //       showDateDetails.date
                  //     ][orderID].giftee in userUsers.activeUsers
                  //       ? userUsers.activeUsers[
                  //           props.userMonthOrders.orders[
                  //             showDateDetails.eventID
                  //           ][showDateDetails.date][orderID].giftee
                  //         ].Name
                  //       : `... ${
                  //           props.userMonthOrders.orders[
                  //             showDateDetails.eventID
                  //           ][showDateDetails.date][orderID].giftee
                  //         }`}
                  //   </span>

                  //   <Link to={`/order/${showDateDetails.eventID}/${orderID}`}>
                  //     Edit Order
                  //   </Link>
                  // </li>
                  <li key={oIndex} className={`column`}>
                    <span>
                      {props.userMonthOrders.orders[showDateDetails.date][
                        orderID
                      ].giftee in userUsers.activeUsers
                        ? `${
                            userUsers.activeUsers[
                              props.userMonthOrders.orders[
                                showDateDetails.date
                              ][orderID].giftee
                            ]["First Name"]
                          } ${
                            userUsers.activeUsers[
                              props.userMonthOrders.orders[
                                showDateDetails.date
                              ][orderID].giftee
                            ]["Last Name"]
                          }`
                        : `... ${
                            props.userMonthOrders.orders[showDateDetails.date][
                              orderID
                            ].giftee
                          }`}
                    </span>

                    <Link to={`/order/${showDateDetails.eventID}/${orderID}`}>
                      Edit Order
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ModalBox>
        ) : null}
      <Row>
        {/* {daysOfTheWeek.map((day, dIndex) => (
          <Col xs="2" className={`calendar-week-days`} key={dIndex}>
            {day.slice(0, 3)}
          </Col>
        ))} */}
        

      {/* <ul className={`row center-column row-wrap calendar-days`}> */}

        {/* put empty dates to line up the first */}
        {/* {[...Array(firstDayOfTheWeek)].map((d, dIndex) => (
          <td
            key={dIndex}
            style={{
              background: "inherit",
              border: "1px solid transparent",
              boxShadow: "none",
            }}
          >
          </td>
          
        ))}
        {[...Array(4)].map((d, dIndex) => (
          <td>
          <CalendarDay
            key={dIndex}
            action={() => null}
            dayIndex={dIndex}
            month={month}
            orders={props.userMonthOrders}
          />
          </td>
        ))} */}


          {/* put empty box for end of the month to line up dates  */}
          {/* {[...Array(6 - lastDayOfTheWeek)].map((d, dIndex) => (
            <td
              key={dIndex}
              style={{
                background: "inherit",
                border: "1px solid transparent",
                boxShadow: "none",
              }}
            >
              {" "}
            </td>
          ))}
      </Row> */}
      <Calendar />
      </Row>
            
    </Col>

  );
}

export {
  daysOfTheWeek,
  monthsOfTheYear,
  getMonthSunday,
  compareCurrentDate,
  colorList,
  getDateMonthDay,
};

export default CalendarMonth;

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
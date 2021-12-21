import React, { useContext, useEffect,  useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import { Row, Col, Image } from "react-bootstrap";
import { userMonthOrderList } from "../../../classes";
import { getUserList } from "../../eventComponents/eventDashboard";
import logo from "../../../icons/Icon_One_Time.png";
import ModalBox from "../modalBox";
import {
  subMonths,
  addMonths,
  startOfWeek,
  endOfWeek,
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  isSameDay,
  isSameMonth,
} from "date-fns";

const daysOfTheWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

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

  const settingUsers = async () => {
    let users = await getUserList(user);
    setUserUsers(users);
    setUserUsersLoaded(true);
  };
  const currentMonth = new Date();
  const selectedDate = new Date();
  const dateFormat = "MMMM";
  const dayDateFormat = "d";
  const monthDayFormat = "MM/dd/";
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const dayRows = [];

  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const daysTitle = [];

  for (let i = 0; i < 7; i++) {
    daysTitle.push(
      <div className="calendar-col calendar-col-center" key={i}>
        {" "}
        {daysOfTheWeek[i]}{" "}
      </div>
    );
  }

  var eventDates = new Array(format(new Date(), monthDayFormat));
  eventDates.pop()
  Object.entries(userEvents).forEach(([key, value]) => {
    eventDates.push(format(new Date(value.startDate.replace(/-/g, '\/').replace(/T.+/, '')), monthDayFormat))
  });



  let days = [];
  let day = startDate;
  let formattedDate = "";
  let testFormattedDate = "";
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dayDateFormat);
      testFormattedDate = format(day, monthDayFormat);

      if (eventDates.includes(testFormattedDate)) {
        days.push(
          <div
            className={`calendar-col calendar-cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={formattedDate}
          >
            <span className="calendar-number">{formattedDate}</span>
            <Image src={logo} alt="gift-image" className="bg-image" roundedCircle/>
          </div>
        );
      }
      else {
        days.push(
          <div
            className={`calendar-col calendar-cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={formattedDate}
          >
            <span className="calendar-number">{formattedDate}</span>
          </div>
        );
      }
      day = addDays(day, 1);
    }
    dayRows.push(<div className="calendar-row" key={`row-${formattedDate}`}>{days}</div>);
    days = [];
  }
  
  // const settingDays = days => {

  // }

  useEffect(() => {
    if (userUsers && Object.keys(userUsers.activeUsers).length === 0) {
      settingUsers();
    }
  }, []);

  const showDateDetails = {
    eventID: "",
    date: "",
  };

  /*
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
  */

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
                    {props.userMonthOrders.orders[showDateDetails.date][orderID]
                      .giftee in userUsers.activeUsers
                      ? `${
                          userUsers.activeUsers[
                            props.userMonthOrders.orders[showDateDetails.date][
                              orderID
                            ].giftee
                          ]["First Name"]
                        } ${
                          userUsers.activeUsers[
                            props.userMonthOrders.orders[showDateDetails.date][
                              orderID
                            ].giftee
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
      <div className="calendar">
        <div className="header calendar-row flex-middle">
        <div className="col col-center">
          <h2>{format(currentMonth, dateFormat)}</h2>
        </div>
        </div>
        <div className="calendar-days calendar-row">{daysTitle}</div>
        <div className="calendar-body">{dayRows}</div>
      </div>
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

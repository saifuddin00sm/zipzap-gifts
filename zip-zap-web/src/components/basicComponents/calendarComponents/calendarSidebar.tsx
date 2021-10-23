import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import { userMonthOrderList } from "../../../classes";
import { getIcon } from "../../eventComponents/eventNew";
import { Row, Col, Image} from "react-bootstrap";
import { getDateMonthDay } from "./calendarMonth";
import logo from "../../../icons/Icon_One_Time.png";

function CalendarSidebar(props: {
  action: Function;
  orders: userMonthOrderList;
}) {
  const { userEvents, userUsers } = useContext(UserContext);
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return (
    <Col className={`calendar-side-bar event-details-show m-1 p-2`}>
      {Object.keys(userEvents).map((event, eIndex) => (
        <div key={eIndex}>
          {new Date(userEvents[event].startDate) > firstDay && new Date(userEvents[event].startDate) < lastDay ? (
            <Row className="border-bottom m-1">
                      <Col  xs={6} md={2}>
                      <Image src={logo} alt="gift-image" className="item-image" fluid/>
                      </Col>
                      <Col md={10} className="dateTitle">
                      <p>{new Date(userEvents[event].startDate.replace(/-/g, '\/').replace(/T.+/, '')).toDateString()}</p>
                      </Col>
                      <Col>
                      <p>{userEvents[event].name}</p>
                      </Col>
            </Row>
          ) : (null) }
        </div>
      ))}
      {/* {Object.keys(props.orders.orders).map((date, dIndex) => (
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
                {/* <span>
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
            ))} */}
          {/* </div>
        </div>
      ))} */}
    </Col>
  );
}

export default CalendarSidebar;

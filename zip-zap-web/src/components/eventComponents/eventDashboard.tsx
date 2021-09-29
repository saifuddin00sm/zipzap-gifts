import React, { useContext, useEffect, useState } from "react";
import {Row, Col} from 'react-bootstrap'
import { fetchRequest, UserContext } from "../../App";
import { userGroupedItem, userItem, userMonthOrderList } from "../../classes";
import LoadingIcon from "../basicComponents/LoadingIcon";
import { ReactComponent as AddIcon } from "../../icons/plusSign.svg";
import EventDetailsRow from "../basicComponents/eventComponents/eventDetailsRow";
import { Link } from "react-router-dom";
import CalendarMonth from "../basicComponents/calendarComponents/calendarMonth";
import CalendarSidebar from "../basicComponents/calendarComponents/calendarSidebar";
// import { Console } from "node:console";

const getEvents = async (user: any) => {
  let response = await fetchRequest(user, "campaigns", "GET");
  console.log("this is the response")
  console.log(user)

  if ("campaigns" in response) {
    return response.campaigns;
  }
  return [];
};

const getItems = async (user: any) => {
  let response = await fetchRequest(user, "items", "GET");

  if ("items" in response) {
    return response.items;
  }

  return {};
};

const getGroupedItems = async (user: any) => {
  let response = await fetchRequest(user, "groupedItems", "GET");

  if ("items" in response) {
    return response.items;
  }

  return {};
};

const getUserList = async (user: any) => {
  let response = await fetchRequest(user, "userList", "GET");

  if ("users" in response) {
    return response.users;
  }

  return {};
};

const getMonthOrders = async (user: any) => {
  let response = await fetchRequest(user, `orders/all`, "GET");

  let dateOrders = {};
  let campaignOrders = {};

  if ("campaignOrders" in response) {
    campaignOrders = response.campaignOrders;
    // return response.campaignOrders;
  }

  if ("dateOrders" in response) {
    dateOrders = response.dateOrders;
    // return response.dateOrders;
  }

  return {
    dateOrders,
    campaignOrders,
  };
};

const formatDate = (date: string) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

const getGroupedGiftPrice = (
  item: userGroupedItem,
  allItems: { [key: string]: userItem }
) => {
  let total = 0;
  let itemPricePromise = item.itemsArray.filter((itemID) =>
    itemID in allItems ? (total += allItems[itemID].price) : 0
  );

  return total;
};

function EventDashboard() {
  const {
    user,
    userEvents,
    setUserEvents,
    userItems,
    setUserItems,
    userGroupedItems,
    setUserGroupedItems,
    userMonthOrders,
    setUserMonthOrders,
    userUsersLoaded,
    userUsers,
  } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState("");

  const settingEvents = async () => {
    let events = await getEvents(user);
    
    setUserEvents(events);
    setLoading(false);
  };

  const settingItems = async () => {
    let items = await getItems(user);
    setUserItems(items);
  };

  const settingGroupedItems = async () => {
    let items = await getGroupedItems(user);
    setUserGroupedItems(items);
  };

  const settingMonthOrders = async () => {
    let { dateOrders } = await getMonthOrders(user);
    setUserMonthOrders({ orders: dateOrders });
    console.log("Date orders")
    console.log(userMonthOrders);
  };
  
  useEffect(() => {
    if (Object.keys(userItems).length === 0) {
      settingItems();
    }

    if (Object.keys(userGroupedItems).length === 0) {
      settingGroupedItems();
    }

    if (Object.keys(userMonthOrders.orders).length === 0) {
      settingMonthOrders();
    }
    if (Object.keys(userEvents).length == 0) {
      settingEvents();
    } else {
      setLoading(false);
    }
  }, []);

  const handleShowDayDetails = (
    type: string,
    eventID: string,
    date: string
  ) => {
    if (type === "show") {
      console.log("t", type, [eventID], [date]);
      // setRedirect("/")
      // TO-DO - show order details
    }
  };

  return (
    <Col>
      <Row>
        <Col className="page-header justify-content-center">
          <h3>Event Dashboard</h3>
        </Col>
      </Row>

      <Row className="justify-content-center">
        {loading ? <LoadingIcon /> : null}
      </Row>

      <Row className="d-flex justify-content-center">
        <Col>
          <Row className="event-dashboard-sub-title primary-black-header mx-2">
            <span>Event List</span>
          </Row>
          <Row className="mx-2 p-2 event-dashboard-events-list event-dashboard-events-list-container">
                {userUsersLoaded ? 
                (Object.keys(userUsers.activeUsers).length === 0 ? 
                  (
                    <div>
                    No Recipients, upload a list now!
                    <br></br>
                    <div className={`column center event-dashboard-events-list`}>
                      <Link
                        to={"/people/upload"}
                        className={`row center add-event-button add-event-button-black `}
                      >
                        <AddIcon />
                      </Link>
                    </div>
                  </div>
                  ) : Object.keys(userEvents).length > 1 ? (
                    Object.keys(userEvents).map((event, eIndex) =>
                      userEvents[event].name !== "onetime" ? (
                        <EventDetailsRow
                          key={eIndex}
                          index={eIndex}
                          event={userEvents[event]}
                        />
                      ) : null
                    )

                ) : 
                (
                  <div>
                      No events, create one now!
                      <br></br>
                      <div className={`column center event-dashboard-events-list`}>
                      <Link
                        to={"/event/new"}
                        className={`add-event-button-link`}
                      >
                        <AddIcon className="addIcon" />
                      </Link>
                      </div>
                    </div>
                )
                ): null }
          </Row>
        </Col>
        <Col> 
            <Row className="event-dashboard-sub-title primary-black-header mx-2">
              <span>Add an Event</span>
            </Row>
            <Row className="mx-2">
              <div className={`column center event-dashboard-events-list`}>
                <Link
                  to={"/event/new"}
                  className={`add-event-button-link`}
                >
                  <AddIcon className="addIcon" />
                </Link>
              </div>
            </Row>
              
              {/* <Row className="event-dashboard-sub-title primary-blue-header mx-2  mt-5">
                <span>Send a One Time Gift</span>
              </Row>
              <Row className="mx-2">
                <Col className={`column center event-dashboard-events-list`}>
                  <Link
                  to={"/order/new"}
                  className={` add-event-button-link add-event-button-link-blue`}
                  >
                    <AddIcon className="addIcon" />
                  </Link>
                </Col>
            </Row> */}
        </Col>
      </Row>
      <Row className="py-4 mx-3">
        <Col sm="4">
          <CalendarSidebar orders={userMonthOrders} action={() => {}} />
        </Col>
        <Col>
          <CalendarMonth
              userMonthOrders={userMonthOrders}
              listOrders={false}
              action={handleShowDayDetails}
            />
          </Col>
      </Row>
    </Col>
  );
}

export {
  getEvents,
  getItems,
  getGroupedItems,
  getUserList,
  getGroupedGiftPrice,
  formatDate,
  getMonthOrders,
};
export default EventDashboard;

import React, { useContext, useEffect, useState } from "react";
import {Container, Row, Col} from 'react-bootstrap'
import { fetchRequest, UserContext } from "../../App";
import { userGroupedItem, userItem, userMonthOrderList } from "../../classes";
import LoadingIcon from "../basicComponents/LoadingIcon";
import { ReactComponent as AddIcon } from "../../icons/plusSign.svg";
import EventDetailsRow from "../basicComponents/eventComponents/eventDetailsRow";
import { Link } from "react-router-dom";
import CalendarMonth from "../basicComponents/calendarComponents/calendarMonth";
import CalendarSidebar from "../basicComponents/calendarComponents/calendarSidebar";

const getEvents = async (user: any) => {
  let response = await fetchRequest(user, "campaigns", "GET");

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
  };

  useEffect(() => {
    if (Object.keys(userEvents).length == 0) {
      settingEvents();
    } else {
      setLoading(false);
    }

    if (Object.keys(userItems).length === 0) {
      settingItems();
    }

    if (Object.keys(userGroupedItems).length === 0) {
      settingGroupedItems();
    }

    if (Object.keys(userMonthOrders.orders).length === 0) {
      settingMonthOrders();
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
    <Container fluid className={`column center-column`} >
      <header className={`column center page-header`}>
        <h1>Event Dashboard</h1>
      </header>
      {loading ? <LoadingIcon /> : null}

      {/* holds 4 Containers */}
      <main className={`full-width column center-column main-section`}>
        <section
          className={`row center-row full-width event-dashboard-top-row`}
        >
          {/* event list container */}
          <section
            className={`event-dashboard-half-column event-dashboard-half-column-left`}
          >
            <div
              className={`event-dashboard-sub-title primary-black-light-header`}
            >
              <span>Event List</span>
            </div>

            <ol className={`column center event-dashboard-events-list`}>
              {userUsersLoaded &&
              Object.keys(userUsers.activeUsers).length === 0 ? (
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
              ) : (
                <div>
                  No events, create one now!
                  <br></br>
                  <div className={`column center event-dashboard-events-list`}>
                    <Link
                      to={"/event/new"}
                      className={`row center add-event-button`}
                    >
                      <AddIcon />
                    </Link>
                  </div>
                </div>
              )}
            </ol>
          </section>

          {/* Add event container */}
          <section
            className={`event-dashboard-half-column event-dashboard-half-column-right`}
          >
            <div className={`full-width`}>
              <div className={`event-dashboard-sub-title primary-green-header`}>
                <span>Add an Event</span>
              </div>
              <div className={`column center event-dashboard-events-list`}>
                {/* <span>
                  <i>1 event left</i>
                </span>
                <br></br> */}
                <Link
                  to={"/event/new"}
                  className={`row center add-event-button`}
                >
                  <AddIcon />
                </Link>
              </div>
            </div>

            <br></br>
            <div className={`full-width`}>
              <div className={`event-dashboard-sub-title primary-blue-header`}>
                <span>Send Special Gift</span>
              </div>
              <div className={`column center event-dashboard-events-list`}>
                <br></br>
                <Link
                  to={"/order/new"}
                  className={`row center add-event-button add-event-button-blue`}
                >
                  <AddIcon />
                </Link>
              </div>
            </div>
          </section>
        </section>

        <br></br>
        {/* upcoming events container */}
        <section
          className={`row center-row full-width event-dashboard-lower-row`}
        >
          <CalendarSidebar orders={userMonthOrders} action={() => {}} />
          <CalendarMonth
            userMonthOrders={userMonthOrders}
            listOrders={false}
            action={handleShowDayDetails}
          />
        </section>
      </main>
    </Container>
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
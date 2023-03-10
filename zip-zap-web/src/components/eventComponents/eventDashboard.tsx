import React, { useContext, useEffect, useState } from "react";
import { format, parse, isValid } from "date-fns";
import { Row, Col, Modal } from "react-bootstrap";
import { fetchRequest, UserContext } from "../../App";
import { userGroupedItem, userItem } from "../../classes";
import { ReactComponent as AddIcon } from "../../icons/plusSign.svg";
import EventDetailsRow from "../basicComponents/eventComponents/eventDetailsRow";
import { Link } from "react-router-dom";
import CalendarMonth from "../basicComponents/calendarComponents/calendarMonth";
import CalendarSidebar from "../basicComponents/calendarComponents/calendarSidebar";
import { cpuUsage } from "process";
// import { Console } from "node:console";

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
  }

  if ("dateOrders" in response) {
    dateOrders = response.dateOrders;
  }

  return {
    dateOrders,
    campaignOrders,
  };
};

const formatDate = (date: string) => {
  if (!date) {
    return "";
  }
  let d = new Date(date);

  // The date strings in the database are actually local time, so remove the Zero Zone "Z"
  if (date.endsWith("Z")) {
    const localDate = parse(
      date.slice(0, -1),
      "yyyy-MM-dd'T'HH:mm:ss.SSS",
      new Date()
    );
    if (isValid(localDate)) {
      d = localDate;
    }
  }

  return format(d, "yyyy-MM-dd");
};

const getGroupedGiftPrice = (
  item: userGroupedItem,
  allItems: { [key: string]: userItem }
) => {
  let total = 0;
  item.itemsArray.filter((itemID) =>
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


  const needItems = Object.keys(userItems).length === 0;
  useEffect(() => {
    const settingItems = async () => {
      let items = await getItems(user);
      setUserItems(items);
    };

    if (needItems) {
      settingItems();
    }
  }, [user, setUserItems, needItems]);

  const needGroupedItems = Object.keys(userGroupedItems).length === 0;
  useEffect(() => {
    const settingGroupedItems = async () => {
      let items = await getGroupedItems(user);
      setUserGroupedItems(items);
    };

    if (needGroupedItems) {
      settingGroupedItems();
    }
  }, [user, setUserGroupedItems, needGroupedItems]);

  const needMonthOrders = Object.keys(userMonthOrders.orders).length === 0;
  useEffect(() => {
    const settingMonthOrders = async () => {
      let { dateOrders } = await getMonthOrders(user);
      setUserMonthOrders({ orders: dateOrders });
    };

    if (needMonthOrders) {
      settingMonthOrders();
    }
  }, [user, setUserMonthOrders, needMonthOrders]);

  var needEvents = Object.keys(userEvents).length === 0;
  useEffect(() => {
    const settingEvents = async () => {
      let events = await getEvents(user);
      setUserEvents(events);
    };

    const settingOrders = async() => {
      let orders = await getMonthOrders(user)
    }

    if (needEvents) {
      settingEvents();
    }
    
  }, [user, userEvents,  setUserEvents, needEvents]);

  const handleShowDayDetails = (
    type: string,
    eventID: string,
    date: string
  ) => {
    if (type === "show") {
      // setRedirect("/")
      // TO-DO - show order details
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const handleShow = () => {
    const settingEvents = async () => {
      let events = await getEvents(user);
      setUserEvents(events);
    }
    setShowModal(true);
    settingEvents();
  }

  return (
    <Col>
      <Row>
        <Col className="page-header justify-content-center">
          <h3>Gift Dashboard</h3>
        </Col>
      </Row>

      <Row className="d-flex justify-content-center">
        <Col>
          <Row className="event-dashboard-sub-title primary-black-header mx-2">
            <span>Current Gifts</span>
          </Row>
          <Row className="mx-2 p-2 event-dashboard-events-list event-dashboard-events-list-container">
            {userUsersLoaded && userUsers ? (
              Object.keys(userUsers.activeUsers).length === 0 ? (
                <div>
                  No Recipients, upload a list now!
                  <br></br>
                  <div className={`column center event-dashboard-events-list`}>
                    <Link
                      to={"/recipients"}
                      className={`column center add-event-button add-event-button-blue`}
                    >
                      <AddIcon className="addIcon" />
                    </Link>
                  </div>
                </div>
              ) : Object.keys(userEvents).length >= 1 ? (
                Object.keys(userEvents).map((event, eIndex) => (
                  //dateOrders
                  <EventDetailsRow
                    key={eIndex}
                    index={eIndex}
                    event={userEvents[event]}
                    confirmation={handleShow}
                  />
                ))
              ) : (
                <div>
                  No Gifts, create one now!
                  <br></br>
                  <div className={`column center event-dashboard-events-list`}>
                    <Link to={"/event/new"} className={`add-event-button-link`}>
                      <AddIcon className="addIcon" />
                    </Link>
                  </div>
                </div>
              )
            ) : null}
          </Row>
        </Col>
        <Col>
          <Row className="event-dashboard-sub-title primary-black-header mx-2">
            <span>Add a Gift</span>
          </Row>
          <Row className="mx-2">
            <div className={`column center event-dashboard-events-list`}>
              <Link to={"/event/new"} className={`add-event-button-link`}>
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
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
              <h5>Successfully Deleted the Event</h5>
          </Modal.Title>
        </Modal.Header>
            <Modal.Footer>
              <button
              className="general-button gereral-button-green px-4 py-2"
              onClick={handleClose}
            >
              <Link to={"/"}>Back to Dashboard</Link>
            </button>
            </Modal.Footer>
      </Modal>
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

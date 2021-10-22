import React, { useContext, useEffect, useState } from "react";
import { fetchRequest, UserContext } from "../../App";
import { Row, Col, Button } from "react-bootstrap";
import { eventOrder } from "../../classes";
import LoadingIcon from "../basicComponents/LoadingIcon";
import { Link, RouteComponentProps } from "react-router-dom";
import { monthsOfTheYear } from "../basicComponents/calendarComponents/calendarMonth";
import {
  getEvents,
  getItems,
  getGroupedItems,
  getMonthOrders,
  getUserList,
} from "../eventComponents/eventDashboard";
import OrderPastRowContainer from "./orderPastRowContainer";

const calcMonthPrice = (campaignOrders: { [key: string]: eventOrder }) => {
  let totalPrice = 0;

  Object.keys(campaignOrders).forEach((orderID) => {
    let order = campaignOrders[orderID];

    totalPrice += order.cost + order.shippingFee;
  });
  return parseFloat(totalPrice.toFixed(2));
};

const getPreviousOrders = async (user: any, monthQuery?: string | number) => {
  let getResponse = await fetchRequest(
    user,
    `orders/past?month=${monthQuery}`,
    "GET"
  );

  if ("dateOrders" in getResponse) {
    return getResponse.dateOrders;
  }
  return {};
};

function OrderPastDashboard({ location }: RouteComponentProps) {
  const {
    user,
    userEvents,
    setUserEvents,
    userItems,
    setUserItems,
    userGroupedItems,
    setUserGroupedItems,
    setUserMonthOrders,
    setUserUsers,
    userUsers,
    setUserUsersLoaded,
  } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const [campaignOrders, setCampaignOrders] = useState(
    {} as { [key: string]: { [key: string]: eventOrder } }
  );

  const settingEvents = async () => {
    let events = await getEvents(user);

    setUserEvents(events);
  };

  const settingItems = async () => {
    let items = await getItems(user);
    setUserItems(items);
  };

  const settingGroupedItems = async () => {
    let items = await getGroupedItems(user);
    setUserGroupedItems(items);
  };

  const settingMonthOrders = async (getCampaignOrders?: boolean) => {
    let { dateOrders, campaignOrders } = await getMonthOrders(user);
    setUserMonthOrders({ orders: dateOrders });

    if (getCampaignOrders) {
      setCampaignOrders(campaignOrders);
    }

    console.log("GOT DB", monthQuery);
    if (!monthQuery) {
      setLoading(false);
    }
  };

  const settingUsers = async () => {
    let users = await getUserList(user);
    setUserUsers(users);
    setUserUsersLoaded(true);
  };

  useEffect(() => {
    if (Object.keys(userEvents).length === 0) {
      settingEvents();
    }

    if (Object.keys(userItems).length === 0) {
      settingItems();
    }

    if (Object.keys(userGroupedItems).length === 0) {
      settingGroupedItems();
    }

    // if (Object.keys(userMonthOrders.orders).length === 0) {
    //   settingMonthOrders(true);
    // }

    if (Object.keys(userUsers.activeUsers).length === 0) {
      settingUsers();
    }
  }, []);

  function useQuery() {
    return new URLSearchParams(location.search);
  }

  let query = useQuery();
  let monthQuery = query.get("month");
  let todayMonth = new Date().getMonth().toString();

  console.log("MONTH", monthQuery, todayMonth);

  const setPreviousOrders = async (monthQuery: string) => {
    setLoading(true);
    let orders = await getPreviousOrders(user, monthQuery);

    setCampaignOrders(monthQuery in orders ? orders[monthQuery] : {});
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (monthQuery) {
      setPreviousOrders(monthQuery);
    } else {
      settingMonthOrders(true);
    }
  }, [monthQuery]);

  const handleMonthChange = (type: string) => {
    let url = `/order/past`;
    if (type === "Previous") {
      if (monthQuery === "0") {
        return null;
      }

      url = `/order/past?month=${
        monthQuery ? parseInt(monthQuery) - 1 : parseInt(todayMonth) - 1
      }`;
    } else if (type === "Next") {
      if (monthQuery === "11" || !monthQuery) {
        return null;
      }

      url = `/order/past${
        monthQuery ? `?month=${parseInt(monthQuery) + 1}` : ""
      }`;
    }

    return (
      <Col>
      <Button className={`row center new-event-button previous-order-button`}
      variant="zapGreen"
      >
      <Link
        to={url}
        className="edit-button-link"
      >
        {type}
      </Link>
      </Button>
      </Col>
    );
  };

  return (
    <Col>
      <Row>
        <Col className="page-header justify-content-center ">
          <h3>Gift Dashboard</h3>
        </Col>
      </Row>
      {loading ? <LoadingIcon /> : null}

      <Row className={`d-flex justify-content-center mx-3 py-3 main-content`}>
        {/* Current Month */}
        <h2 className={`previous-order-page-title p-2 mx-3 `}>
          {
            monthsOfTheYear[
              monthQuery ? parseInt(monthQuery) : parseInt(todayMonth)
            ]
          }{" "}
          2021
        </h2>
      </Row>
      <Row className={`p-3 mx-3 main-content`}>
        {/* Order List Container */}
        {loading
          ? [...Array(5)].map((a, aIndex) => (
              <OrderPastRowContainer
                key={aIndex}
                campaignID={"0"}
                campaignOrders={{}}
                loading={true}
              />
            ))
          : Object.keys(campaignOrders).map((campaignID, cIndex) => (
              <OrderPastRowContainer
                key={cIndex}
                campaignID={campaignID}
                campaignOrders={campaignOrders[campaignID]}
              />
            ))}
      </Row>
      <Row className={`p-5 mx-3 mb-3 main-content`}>
        {handleMonthChange("Previous")}
        {handleMonthChange("Next")}
      </Row>
    </Col>
  );
}

export { calcMonthPrice };

export default OrderPastDashboard;

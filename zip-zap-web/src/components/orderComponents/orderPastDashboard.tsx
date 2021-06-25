import React, { useContext, useEffect, useState } from "react";
import { fetchRequest, UserContext } from "../../App";
import {
  eventOrder,
  userGroupedItem,
  userItem,
  userMonthOrderList,
} from "../../classes";
import LoadingIcon from "../basicComponents/LoadingIcon";
import { ReactComponent as AddIcon } from "../../icons/plusSign.svg";
import EventDetailsRow from "../basicComponents/eventComponents/eventDetailsRow";
import { Link, RouteComponentProps } from "react-router-dom";
import CalendarMonth, {
  monthsOfTheYear,
} from "../basicComponents/calendarMonth";
import CalendarSidebar from "../basicComponents/calendarComponents/calendarSidebar";
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

  Object.keys(campaignOrders).filter((orderID) => {
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
    userMonthOrders,
    setUserMonthOrders,
    setUserUsers,
    userUsers,
    setUserUsersLoaded,
  } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState("");

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
    if (Object.keys(userEvents).length == 0) {
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
      <Link
        to={url}
        className={`row center new-event-button previous-order-button`}
      >
        {type} Month
      </Link>
    );
  };

  return (
    <section className={`column center-column full-height`}>
      <header className={`column center page-header`}>
        <h1>Recent Orders</h1>
      </header>
      {loading ? <LoadingIcon /> : null}

      <main className={`full-width column center-column main-section`}>
        <section
          className={`row center-self full-width previous-order-page-title`}
        >
          {/* Current Month */}
          <h2>
            {
              monthsOfTheYear[
                monthQuery ? parseInt(monthQuery) : parseInt(todayMonth)
              ]
            }{" "}
            2021
          </h2>
        </section>

        <br></br>
        {/* Order List Container */}
        <section className={`column center-column full-width `}>
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
        </section>

        <br></br>
        <section className={`row center full-width `}>
          {handleMonthChange("Previous")}
          {handleMonthChange("Next")}
        </section>
      </main>
    </section>
  );
}

export { calcMonthPrice };

export default OrderPastDashboard;

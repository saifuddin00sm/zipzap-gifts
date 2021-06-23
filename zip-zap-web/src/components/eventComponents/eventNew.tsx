import React, { useContext, useEffect, useState } from "react";
import { fetchRequest, UserContext } from "../../App";
import {
  adminItem,
  eventOrder,
  userEvent,
  userGroupedItem,
  userItem,
  userRecipient,
} from "../../classes";
import LoadingIcon from "../basicComponents/LoadingIcon";
import EventDetailsRow from "../basicComponents/eventComponents/eventDetailsRow";
import { Link, RouteComponentProps } from "react-router-dom";
import ForwardArrow from "../basicComponents/forwardArrow";
import {
  getItems,
  getGroupedItems,
  getUserList,
  formatDate,
  getEvents,
} from "./eventDashboard";
import ItemCard from "../basicComponents/eventComponents/itemCard";
import UserListContainer from "../basicComponents/eventComponents/userListContainer";
import ModalBox from "../basicComponents/modalBox";
import GroupedItemCard from "../basicComponents/eventComponents/groupedItemCard";
import AdminItemRow from "../basicComponents/adminComponents/adminItemRow";
import ItemRow from "../basicComponents/eventComponents/itemRow";

import { ReactComponent as BoltIcon } from "../../icons/bolt.svg";
import { ReactComponent as GiftCardIcon } from "../../icons/giftCard.svg";
import { ReactComponent as PenguinIcon } from "../../icons/bird.svg";
import { ReactComponent as StarIcon } from "../../icons/star.svg";
import { ReactComponent as TreeIcon } from "../../icons/tree.svg";
import { ReactComponent as PregnantWomenIcon } from "../../icons/pregnantWoman.svg";
import { ReactComponent as WorldIcon } from "../../icons/world.svg";
import { ReactComponent as PiggyBankIcon } from "../../icons/piggyBank.svg";
import { ReactComponent as SmileyFaceIcon } from "../../icons/smileyFace.svg";
import { ReactComponent as SoccerBallIcon } from "../../icons/soccerBall.svg";
import SelectList from "../basicComponents/selectList";

type TParams = { eventID?: string };

const iconList = [
  "bolt",
  "giftCard",
  "bird",
  "star",
  "tree",
  "pregnantWoman",
  "world",
  "piggyBank",
  "smileyFace",
  "soccerBall",
];

const getIcon = (icon: string | number, className?: string) => {
  if (typeof icon === "number") {
    icon = iconList[icon];
  }
  if (icon === "bolt") {
    return <BoltIcon className={`${className}`} />;
  } else if (icon === "giftCard") {
    return <GiftCardIcon className={`${className}`} />;
  } else if (icon === "bird") {
    return <PenguinIcon className={`${className}`} />;
  } else if (icon === "star") {
    return <StarIcon className={`${className}`} />;
  } else if (icon === "tree") {
    return <TreeIcon className={`${className}`} />;
  } else if (icon === "pregnantWoman") {
    return <PregnantWomenIcon className={`${className}`} />;
  } else if (icon === "world") {
    return <WorldIcon className={`${className}`} />;
  } else if (icon === "piggyBank") {
    return <PiggyBankIcon className={`${className}`} />;
  } else if (icon === "smileyFace") {
    return <SmileyFaceIcon className={`${className}`} />;
  } else if (icon === "soccerBall") {
    return <SoccerBallIcon className={`${className}`} />;
  } else {
    return <span></span>;
  }
};

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const compareOrderList = (a: Array<any>, b: Array<any>) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

const getDifferenceInArrays = (arr1: Array<any>, arr2: Array<any>) => {
  return arr1.filter((x) => !arr2.includes(x));
};

const calcGiftPackagePrice = (
  gift: userGroupedItem,
  individualItems: { [key: string]: userItem }
) => {
  let totalPrice = 0;
  let itemError = "";
  let totalLoop = gift.itemsArray.map((iGiftID: number) => {
    if (!(iGiftID in individualItems)) {
      itemError = `Missing Item - ${iGiftID}`;
    } else {
      totalPrice += individualItems[iGiftID].price;
    }
  });

  // TO - DO - Handle Async
  // let totalLoopResult = await totalLoop;

  return totalPrice;
};

const calcGiftPackageWeight = (
  gift: userGroupedItem,
  individualItems: { [key: string]: adminItem }
) => {
  let totalPrice = 0;
  let itemError = "";
  console.log("looing");
  let totalLoop = gift.itemsArray.map((iGiftID: number) => {
    if (!(iGiftID in individualItems)) {
      itemError = `Missing Item - ${iGiftID}`;
    } else {
      console.log("ADding", [individualItems[iGiftID].weight]);
      totalPrice += parseFloat(individualItems[iGiftID].weight.toString());
    }
  });

  // TO - DO - Handle Async
  // let totalLoopResult = await totalLoop;

  return totalPrice;
};

const orderUserList = async (orders: { [key: string]: eventOrder }) => {
  let userList = [] as Array<string>;
  let orderMap = Object.keys(orders).map((orderID) => {
    userList.push(orders[orderID].giftee.toString());
  });

  let orderResult = await Promise.all(orderMap);
  return userList;
};

const createOrders = async (
  userUsers: {
    activeUsers: { [key: string]: userRecipient };
    inActiveUsers: { [key: string]: userRecipient };
  },
  campaignID: number | string,
  list: Array<string>,
  item: {
    type: string;
    id: string;
  },
  price: number,
  eventNote: string,
  startingNumber: number = 0,
  oneTime: boolean = false,
  oneTimeDate: string = ""
) => {
  let orderData = {
    orders: {} as any,
    currentOrderList: [] as Array<any>,
  };

  let orderCreation = list.map(async (user, uIndex) => {
    if (!(user in userUsers.activeUsers)) {
      return;
    }

    let shippingFee = await handleCalcShippingFee(userUsers.activeUsers[user]);

    orderData.orders[uIndex + startingNumber] = {
      orderID: uIndex + startingNumber,
      cost: price,
      shippingAddress: userUsers.activeUsers[user].Address,
      shippingCity: userUsers.activeUsers[user].City,
      shippingState: userUsers.activeUsers[user].State,
      shippingZip: userUsers.activeUsers[user].Zip,
      giftee: user,
      campaignID: campaignID,
      groupedID: item.type === "item" ? null : item.id,
      giftID: item.type === "item" ? item.id : null,
      notes: eventNote,
      shippingFee: shippingFee,
      shippingDate:
        oneTime && oneTimeDate
          ? oneTimeDate
          : `${getRandomInt(4, 7)}/${getRandomInt(1, 28)}/21`,
      // TO-DO - handleCalcShippingDate
      shippingDetails: null,
      isActive: true,
    } as eventOrder;
  });

  let ordersResult = await Promise.all(orderCreation);

  // TO-DO - currentOrderList & Shipping Date
  orderData.currentOrderList = await getCurrentOrders(orderData.orders);

  return orderData;
};

const editOrderList = async (
  campaignOrders: { [key: string]: eventOrder },
  newGiftID: number,
  gifteeList: Array<string>,
  oldGiftID: number | null,
  oldNote: string,
  newNote: string
) => {
  let orderData = {
    orders: {} as any,
    currentOrderList: [] as Array<string>,
  };

  let ordersToRemove = [] as Array<any>;

  let orderUpdate = Object.keys(campaignOrders).map((orderID) => {
    let order = campaignOrders[orderID];
    if (order.groupedID === oldGiftID && !order.shippingDetails) {
      order.groupedID = newGiftID;
      campaignOrders[orderID] = order;
    }

    if (order.notes === oldNote && !order.shippingDetails) {
      order.notes = newNote;
      campaignOrders[orderID] = order;
    }

    if (!gifteeList.includes(order.giftee.toString())) {
      ordersToRemove.push(orderID);
      order.isActive = false;
    } else {
      order.isActive = true;
    }

    // TO-DO REMOVE
    if (!order.shippingDate) {
      order.shippingDate = `${getRandomInt(1, 3)}/${getRandomInt(1, 28)}/21`;
      campaignOrders[orderID] = order;
    }
  });

  let orderResult = await Promise.all(orderUpdate);

  orderData.orders = campaignOrders;

  // TO-DO - currentOrderList & Shipping Date
  orderData.currentOrderList = await getCurrentOrders(orderData.orders);

  return orderData;
};

const getCurrentOrders = async (orders: { [key: string]: eventOrder }) => {
  let today = new Date();

  let orderSort = Object.keys(orders).filter((order) => {
    if (today.getMonth() === new Date(orders[order].shippingDate).getMonth()) {
      return order;
    }
  });

  return orderSort;
};

const handleCalcShippingDate = async (
  criteria: { [key: string]: any },
  campaignStartDate: string,
  person: { [key: string]: any }
) => {
  let shippingDate = "";

  let keyCheck = Object.keys(criteria).map((key) => {
    console.log("TYPE", key, [typeof criteria[key]]);
    if (typeof criteria[key] === "boolean" && key in person) {
      // shippingDate = campaignStartDate;
      shippingDate = person[key];
      return true;
    } else if (key === "campaignDate") {
      shippingDate = campaignStartDate;
      return true;
    } else if (key in person && person[key] === criteria[key]) {
      shippingDate = campaignStartDate;
      return true;
    }
  });

  let keyResult = await Promise.all(keyCheck);
  return shippingDate;
};

const handleCalcShippingFee = async (user: userRecipient) => {
  return 0;
};

function EventNew({ match, location }: RouteComponentProps<TParams>) {
  const {
    user,
    userItems,
    setUserItems,
    userGroupedItems,
    setUserGroupedItems,
    userUsers,
    setUserUsers,
    userEvents,
    setUserEvents,
    setUserUsersLoaded,
  } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirect, setRedirect] = useState("");

  const settingEvents = async () => {
    let events = await getEvents(user);

    setUserEvents(events);
    setLoading(false);
  };

  const settingItems = async () => {
    let items = await getItems(user);
    setUserItems(items);
    setSearchItems([...Object.keys(items)]);
    setItemsLoading(false);
  };

  const settingGroupedItems = async () => {
    let items = await getGroupedItems(user);
    setUserGroupedItems(items);
    setSearchGroupedItems([...Object.keys(items)]);
    setGroupedItemsLoading(false);
  };

  const settingUsers = async () => {
    let users = await getUserList(user);
    setUserUsers(users);
    setUserUsersLoaded(true);

    if ("activeUsers" in users) {
      setUserList(Object.keys(users.activeUsers));
    }

    setUsersLoading(false);
  };

  const [itemsLoading, setItemsLoading] = useState(true);
  const [groupedItemsLoading, setGroupedItemsLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(userEvents).length === 0) {
      settingEvents();
    }

    if (Object.keys(userItems).length === 0) {
      settingItems();
    } else {
      setItemsLoading(false);
      setSearchItems([...Object.keys(userItems)]);
    }

    if (Object.keys(userGroupedItems).length === 0) {
      settingGroupedItems();
    } else {
      setGroupedItemsLoading(false);
      setSearchGroupedItems([...Object.keys(userGroupedItems)]);
    }

    if (Object.keys(userUsers.activeUsers).length === 0) {
      settingUsers();
    } else {
      setUserList(Object.keys(userUsers.activeUsers));
      setUsersLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("use", match.params.eventID, userEvents, userUsers);
    if (
      match.params.eventID &&
      match.params.eventID !== "new" &&
      Object.keys(userEvents).length > 0 &&
      Object.keys(userUsers.activeUsers).length > 0
    ) {
      console.log("here", [match.params.eventID]);
      handleInitialEventSetup(match.params.eventID);
    }
  }, [
    match.params.eventID,
    Object.keys(userEvents).length,
    Object.keys(userUsers.activeUsers).length,
  ]);

  const [completedEvent, setCompletedEvent] = useState(
    null as null | userEvent
  );

  const handleInitialEventSetup = (
    paramsID: string,
    returnResult?: boolean
  ) => {
    // let eventIndex = null as null | number;
    // Object.keys(userEvents).some((event, eIndex) => {
    //   if (userEvents[event].campaignID.toString() === paramsID) {
    //     eventIndex = eIndex;
    //   }
    // });

    if (paramsID !== null && paramsID in userEvents) {
      let event = userEvents[paramsID];

      if (returnResult) {
        return event;
      }

      console.log(event.name);
      setCompletedEvent(event);
      setEventName(event.name);
      setEventStartDate(formatDate(event.startDate));
      setEventEndDate(formatDate(event.endDate));

      setUserList(
        Object.keys(userUsers.activeUsers).filter(
          (userID) => !event.userList.includes(userID)
        )
      );
      setUserSelectedList(JSON.parse(JSON.stringify(event.userList)));

      let item = {
        type: event.defaultItemID
          ? "item"
          : event.defaultDetails.customGift.id
          ? "custom"
          : "grouped",
        id: event.defaultItemID
          ? event.defaultItemID.toString()
          : event.defaultDetails.customGift.id
          ? event.defaultDetails.customGift.id.toString()
          : event.defaultGroupedItemID
          ? event.defaultGroupedItemID.toString()
          : "",
      };
      setActiveItemDetails(item);
      setActiveItem(item);
      setGiftType(
        event.defaultItemID
          ? "item"
          : event.defaultDetails.customGift.id
          ? "custom"
          : "grouped"
      );
      setEventNote(event.defaultDetails.note ? event.defaultDetails.note : "");
      setCustomGift(event.defaultDetails.customGift);
      setEventIcon(event.defaultDetails.eventIcon);
    }
  };

  const [eventName, setEventName] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventNote, setEventNote] = useState("");
  const [eventIcon, setEventIcon] = useState(1);

  const [itemPaginationStart, setItemPaginationStart] = useState(0);
  const [activeItemDetails, setActiveItemDetails] = useState({
    type: "",
    id: "",
  });
  const [activeItem, setActiveItem] = useState({ type: "", id: "" });
  const [userList, setUserList] = useState([] as Array<string>);
  const [userSelectedList, setUserSelectedList] = useState([] as Array<string>);

  const [giftType, setGiftType] = useState("grouped");

  const handleActiveItem = (type: string, id: string) => {
    if (activeItem.id) {
      return false;
    }
    if (activeItemDetails.type === type && activeItemDetails.id === id) {
      setActiveItemDetails({ type: "", id: "" });
    } else {
      setActiveItemDetails({ type: type, id: id });
    }
  };

  const handleChooseItem = () => {
    if (activeItem.id === activeItemDetails.id) {
      setActiveItem({
        type: "",
        id: "",
      });
    } else {
      setActiveItem(activeItemDetails);
    }
  };

  const handleEditUserList = (userID: string) => {
    if (userID === "removeAll") {
      setUserList([...Object.keys(userUsers.activeUsers)]);
      setUserSelectedList([]);
    } else if (userID === "addAll") {
      setUserList([]);
      setUserSelectedList([...Object.keys(userUsers.activeUsers)]);
    } else {
      if (userList.includes(userID)) {
        let index = userList.indexOf(userID);

        userList.splice(index, 1);
      } else {
        userList.push(userID);
      }

      if (userSelectedList.includes(userID)) {
        let index = userSelectedList.indexOf(userID);

        userSelectedList.splice(index, 1);
      } else {
        userSelectedList.push(userID);
      }

      userList.sort((a, b) => parseInt(a) - parseInt(b));
      setUserList([...userList]);

      userSelectedList.sort((a, b) => parseInt(a) - parseInt(b));
      setUserSelectedList([...userSelectedList]);
    }
  };

  const [error, setError] = useState("");
  const handleEventCheck = () => {
    if (!eventName) {
      setError("Please enter an Event Name");
      return true;
    } else if (!eventStartDate) {
      setError("Please enter an Event Start Date");
      return true;
    } else if (!eventEndDate) {
      setError("Please enter an Event End Date");
      return true;
    } else if (!activeItem.id) {
      setError("Please select a gift");
      return true;
    } else if (userSelectedList.length === 0) {
      setError("Please select at least one recipient");
      return true;
    } else {
      setError("");
      setLoading(true);
    }

    if (match.params.eventID) {
      handleEditEvent();
    } else {
      handleAddNewEvent();
    }
  };

  const handleAddNewEvent = async () => {
    let createEventResponse = await fetchRequest(
      user,
      "campaigns",
      "POST",

      {
        name: eventName,
        criteria: {},
        startDate: eventStartDate,
        endDate: eventEndDate,
        userList: userSelectedList,
        defaultItemID: activeItem.type === "item" ? activeItem.id : null,
        defaultGroupedItemID: activeItem.type === "item" ? null : activeItem.id,
        defaultDetails: {
          note: eventNote,
          customGift: customGift,
          eventIcon: eventIcon,
        },
      }
    );

    if ("campaignID" in createEventResponse) {
      // TO-DO - get total price
      let totalPrice =
        activeItem.type === "grouped" && activeItem.id in userGroupedItems
          ? userGroupedItems[activeItem.id].priceOverride
            ? userGroupedItems[activeItem.id].priceOverride
            : await calcGiftPackagePrice(
                userGroupedItems[activeItem.id],
                userItems
              )
          : 0;

      let orders = await createOrders(
        userUsers,
        createEventResponse.campaignID,
        userSelectedList,
        activeItem,
        // activeItem.type === "item" && activeItem.id in userItems
        //   ? userItems[activeItem.id].price
        //   : activeItem.type === "grouped" && activeItem.id in userGroupedItems
        //   ? userGroupedItems[activeItem.id].priceOverride
        //   : 0,
        totalPrice,
        eventNote
      );

      console.log("o:", orders);

      let orderCreationResponse = await fetchRequest(
        user,
        `orders/${createEventResponse.campaignID}`,
        "POST",
        orders
      );

      if ("saved" in orderCreationResponse && orderCreationResponse.saved) {
        setSuccess(true);
        setUserEvents([]);
      }

      // TO-DO - Handle Errors
    }

    // TO-DO - Handle Errors
  };

  const handleEditEvent = async () => {
    let createEventResponse = await fetchRequest(
      user,
      `campaigns/${match.params.eventID}`,
      "PUT",

      {
        name: eventName,
        criteria: {},
        startDate: eventStartDate,
        endDate: eventEndDate,
        userList: userSelectedList,
        defaultItemID: activeItem.type === "item" ? activeItem.id : null,
        defaultGroupedItemID: activeItem.type === "item" ? null : activeItem.id,
        defaultDetails: {
          note: eventNote,
          customGift: customGift,
          eventIcon: eventIcon,
        },
      }
    );

    // console.log("df", createEventResponse);

    if ("campaignID" in createEventResponse) {
      // TO-DO - get total price

      let allCampaignOrders = await fetchRequest(
        user,
        `orders/${match.params.eventID}`,
        "GET"
      );

      // console.log("df 2", allCampaignOrders);
      if ("campaignOrders" in allCampaignOrders && match.params.eventID) {
        let event = handleInitialEventSetup(match.params.eventID, true);

        if (event) {
          // scenarios:
          // add a new user, keep all others
          // remove user
          // add new user and remove user

          let currentOrderUsers = await orderUserList(
            allCampaignOrders.campaignOrders
          );

          let missingOrders = getDifferenceInArrays(
            userSelectedList,
            currentOrderUsers
          );

          let newOrders = await createOrders(
            userUsers,
            event.campaignID,
            missingOrders,
            activeItem,
            activeItem.type === "item" && activeItem.id in userItems
              ? userItems[activeItem.id].price
              : activeItem.type === "grouped" &&
                activeItem.id in userGroupedItems
              ? userGroupedItems[activeItem.id].priceOverride
              : 0,
            eventNote,
            Object.keys(allCampaignOrders.campaignOrders).length
          );

          let mergedOrders = Object.assign(
            newOrders.orders,
            allCampaignOrders.campaignOrders
          );

          let updatedOrders = await editOrderList(
            mergedOrders,
            parseInt(activeItem.id),
            userSelectedList,
            event.defaultGroupedItemID,
            event.defaultDetails.note,
            eventNote
          );

          // console.log("t", updatedOrders);

          let orderCreationResponse = await fetchRequest(
            user,
            `orders/${match.params.eventID}`,
            "POST",
            updatedOrders
          );

          // console.log("df as ", orderCreationResponse);
          if ("saved" in orderCreationResponse) {
            setSuccess(true);
            setUserEvents([]);
          }
        }
      }

      // go through all orders and update order gifts
    }
  };

  const handleChangeGiftType = (type: string) => {
    setGiftType(type);
    setItemPaginationStart(0);
    setActiveItemDetails({
      type: "",
      id: "",
    });
    setActiveItem({
      type: "",
      id: "",
    });

    setCustomGift({
      id: "",
      name: "",
      items: [] as Array<{ id: number; details: { [key: string]: any } }>,
      instructions: "",
    });
  };

  const [customGift, setCustomGift] = useState({
    id: "",
    name: "",
    items: [] as Array<{ id: number; details: { [key: string]: any } }>,
    instructions: "",
  });
  const [showItemList, setShowItemList] = useState(false);

  const handleCustomGiftChange = (
    type: string,
    data: any,
    extraData: any = {}
  ) => {
    if (type === "name") {
      customGift.name = data;
    } else if (type === "instructions") {
      customGift.instructions = data;
    } else if (type === "addItem") {
      customGift.items.push(data);
    } else if (type === "removeItem") {
      let index = customGift.items.indexOf(data);
      customGift.items.splice(index, 1);
    } else if (type === "detail") {
      let index = customGift.items.indexOf(data);

      let gift = customGift.items[index];

      // extraData
      // {detail, option, index}

      gift.details[extraData.detail] = extraData;
      // customGift.items.splice(index, 1);

      customGift.items[index] = gift;
    }

    setCustomGift({ ...customGift });
  };

  const [customGiftLoading, setCustomGiftLoading] = useState(false);
  const handleCustomGiftSave = async () => {
    if (!customGift.name) {
      setError("Please give the package a name");
      return true;
    } else if (customGift.items.length === 0) {
      setError("Please select at least one gift");
      return true;
    } else {
      setError("");
      setCustomGiftLoading(true);
    }

    let items = [] as Array<number>;

    let itemLoop = customGift.items.map((item) => items.push(item.id));

    let itemResult = await Promise.all(itemLoop);

    let saveResponse = { error: "", itemsID: "" };

    if (activeItem.type === "custom" && activeItem.id) {
      saveResponse = await fetchRequest(
        user,
        `groupedItems/${activeItem.id}`,
        "PUT",
        {
          name: customGift.name,
          description: "My Custom Gift",
          mainPicture: userItems[items[0]].mainPicture,
          pictures: [],
          itemsArray: items,
          priceOverride: 0,
          account: "",
        }
      );
    } else {
      saveResponse = await fetchRequest(user, "groupedItems", "POST", {
        name: customGift.name,
        description: "My Custom Gift",
        mainPicture: userItems[items[0]].mainPicture,
        pictures: [],
        itemsArray: items,
        priceOverride: 0,
        account: "",
      });
    }

    if ("itemsID" in saveResponse && saveResponse.itemsID) {
      setActiveItem({
        type: "custom",
        id: saveResponse.itemsID,
      });

      customGift.id = saveResponse.itemsID;
      setCustomGift({ ...customGift });
    }

    setCustomGiftLoading(false);
  };

  const [searchItems, setSearchItems] = useState([] as Array<string>);
  const [searchGroupedItems, setSearchGroupedItems] = useState(
    [] as Array<string>
  );
  const handleCustomGiftSearch = (e: any) => {
    if (e.target.value) {
      let searchResults = Object.keys(userItems).filter((itemID) => {
        let item = userItems[itemID];

        if (item.name.toLowerCase().includes(e.target.value)) {
          return true;
        }
      });

      setSearchItems([...searchResults]);
    } else {
      setSearchItems(Object.keys(userItems));
    }
  };

  const handleGroupedItemSearch = (e: any) => {
    if (e.target.value) {
      let searchResults = Object.keys(userGroupedItems).filter((itemID) => {
        let item = userGroupedItems[itemID];

        if (item.name.toLowerCase().includes(e.target.value)) {
          return true;
        }
      });

      setSearchGroupedItems([...searchResults]);
    } else {
      setSearchGroupedItems(Object.keys(userGroupedItems));
    }
  };

  return (
    <section className={`column center-column full-height`}>
      <header className={`column center page-header`}>
        <h1>{match.params.eventID ? "Edit" : "Add an"} Event</h1>
      </header>

      <section className={`row width-90`}>
        <Link to={"/dashboard"} className={`back-link`}>
          Back to Event Dashboard
        </Link>
      </section>

      {/* holds 4 Containers */}
      <main className={` column center-column main-section`}>
        {loading || success ? (
          <ModalBox>
            {success ? (
              <div className={`column`}>
                <span>
                  {eventName} {match.params.eventID ? "updated" : "created"}{" "}
                  sucessfully!
                </span>
                <br></br>
                <Link to={"/dashboard"}>Back to Event Dashboard</Link>
              </div>
            ) : (
              `${
                match.params.eventID ? "Editing" : "Creating"
              } event please wait...`
            )}{" "}
          </ModalBox>
        ) : null}

        <div className={`event-dashboard-sub-title primary-green-header`}>
          <span>{completedEvent ? completedEvent.name : "Event"} Details</span>
        </div>

        {/* name, event date */}
        <section className={`row center-row full-width`}>
          <div
            className={`event-dashboard-half-column column left-align-column`}
          >
            <div className={`column full-width`}>
              <span className={`row`}>Event Name</span>
              <input
                placeholder={"Birthdays"}
                className={`general-input-fit new-event-input`}
                value={eventName}
                onChange={(e: any) => setEventName(e.target.value)}
              ></input>
            </div>

            <br></br>
            <div className={`column  full-width`}>
              <span className={`row`}>Custom Note</span>
              <input
                placeholder={"i.e. Thanks for being a great employee!"}
                className={`general-input-fit full-width`}
                value={eventNote}
                onChange={(e: any) => setEventNote(e.target.value)}
              ></input>
            </div>
          </div>

          <div
            className={`event-dashboard-half-column column left-align-column`}
          >
            <span className={`row`}>Event Date</span>
            <div className={`row center left-align-row full-width`}>
              <input
                type={"date"}
                placeholder={"From"}
                className={`general-input-fit new-event-date-input`}
                value={eventStartDate}
                onChange={(e: any) => setEventStartDate(e.target.value)}
              ></input>{" "}
              -
              <input
                type={"date"}
                placeholder={"To"}
                className={`general-input-fit new-event-date-input`}
                value={eventEndDate}
                onChange={(e: any) => setEventEndDate(e.target.value)}
              ></input>
            </div>

            <div className={`column full-width`}>
              <span className={`row`}>Event Icon</span>
              <SelectList
                detailList={iconList}
                action={(option: any, oIndex: number) => setEventIcon(oIndex)}
                selected={eventIcon}
                altDisplay={getIcon}
              />
            </div>
          </div>
        </section>

        {/* button row and gift package container*/}
        <section
          className={`column center-row event-dashboard-full-column event-dashboard-lower-row`}
        >
          <div className={`row left-align-row`}>
            <button
              className={`new-event-button`}
              onClick={() => handleChangeGiftType("grouped")}
            >
              Gift Package
            </button>
            <button
              className={`new-event-button`}
              onClick={() => handleChangeGiftType("custom")}
            >
              Custom Gift
            </button>
          </div>

          <div className={`event-dashboard-sub-title primary-black-header`}>
            <span>Gift Packages</span>
          </div>
          <br></br>
          {giftType !== "custom" ? (
            <div className={`column  center-self width-90`}>
              <input
                className={`general-input-fit full-width`}
                placeholder={"Search for an item"}
                onChange={handleGroupedItemSearch}
              ></input>
            </div>
          ) : null}

          {giftType !== "custom" ? (
            <div className={`row center center-self width-90`}>
              {itemPaginationStart > 0 ? (
                <ForwardArrow
                  action={() =>
                    setItemPaginationStart(
                      itemPaginationStart - 4 < 0 ? 0 : itemPaginationStart - 4
                    )
                  }
                  class={`forward-arrow-grey backward-arrow-svg`}
                />
              ) : null}
              <div className={`row full-width`}>
                {itemsLoading || groupedItemsLoading
                  ? [...Array(4)].map((item, iIndex) => (
                      <ItemCard
                        key={iIndex}
                        index={iIndex}
                        action={() => null}
                      />
                    ))
                  : null}

                {!itemsLoading && giftType === "grouped"
                  ? searchGroupedItems
                      .slice(itemPaginationStart, itemPaginationStart + 4)
                      .map((itemID, iIndex) => (
                        <GroupedItemCard
                          key={iIndex}
                          index={iIndex}
                          item={userGroupedItems[itemID]}
                          action={() => handleActiveItem("grouped", itemID)}
                          class={
                            activeItem.type === "grouped" &&
                            activeItem.id.toString() === itemID.toString()
                              ? `event-item-card-active`
                              : activeItem.type === "grouped" &&
                                activeItem.id.toString() !== itemID.toString()
                              ? "event-item-card-inactive"
                              : ``
                          }
                        />
                      ))
                  : null}
              </div>

              <ForwardArrow
                action={() => setItemPaginationStart(itemPaginationStart + 4)}
                class={`forward-arrow-grey`}
                disabled={
                  giftType === "grouped" &&
                  itemPaginationStart + 5 > Object.keys(userGroupedItems).length
                    ? true
                    : giftType === "item" &&
                      itemPaginationStart + 5 > Object.keys(userItems).length
                    ? true
                    : false
                }
              />
            </div>
          ) : (
            <div className={`column center center-self width-90`}>
              <div className={`row center center-self full-width`}>
                <div
                  className={`event-dashboard-half-column column left-align-column`}
                >
                  <span className={`row`}>Gift Name</span>
                  <input
                    placeholder={"i.e. Welcome Box"}
                    className={`general-input-fit new-event-input`}
                    value={customGift.name}
                    onChange={(e: any) =>
                      handleCustomGiftChange("name", e.target.value)
                    }
                  ></input>
                  {/* <br></br> */}

                  <span className={`row`}>Items: </span>
                  {customGift.items.map((itemID, iIndex) =>
                    itemID.id in userItems ? (
                      <ItemRow
                        key={iIndex}
                        item={userItems[itemID.id]}
                        index={iIndex}
                        details={itemID.details}
                        action={(type: string, extraData: any) =>
                          handleCustomGiftChange(type, itemID, extraData)
                        }
                      />
                    ) : null
                  )}
                  {showItemList ? (
                    <div className={`event-item-list`}>
                      <input
                        className={` general-input-fit new-event-input event-item-search-bar`}
                        placeholder={"Search for an item"}
                        onChange={handleCustomGiftSearch}
                      ></input>

                      <ul className={`event-item-list-list`}>
                        {searchItems.map((itemID, iIndex) => (
                          <li
                            key={iIndex}
                            className={`row center space-between`}
                            onClick={() =>
                              handleCustomGiftChange("addItem", {
                                id: itemID,
                                details: {},
                              })
                            }
                          >
                            {userItems[itemID].name}
                          </li>
                        ))}

                        <li className={`row center space-between`}>
                          Request an Item
                        </li>
                      </ul>
                      <button
                        className={`new-event-button new-event-button-red`}
                        onClick={() => setShowItemList(false)}
                      >
                        Close
                      </button>
                    </div>
                  ) : null}

                  <button
                    className={`new-event-button`}
                    onClick={() => setShowItemList(true)}
                  >
                    Add Another Item
                  </button>

                  <span className={`row`}>Special Instructions:</span>
                  <input
                    placeholder={"i.e. No Peanuts"}
                    className={`general-input-fit new-event-input`}
                    value={customGift.instructions}
                    onChange={(e: any) =>
                      handleCustomGiftChange("instructions", e.target.value)
                    }
                  ></input>
                </div>
                <div
                  className={`event-dashboard-half-column column left-align-column`}
                ></div>
              </div>

              {error ? error : ""}

              <button
                className={`new-event-button new-event-button-blue`}
                onClick={handleCustomGiftSave}
                disabled={customGiftLoading}
              >
                Save Gift Package
              </button>
            </div>
          )}

          <div
            className={`row center center-self width-90 event-item-description ${
              activeItemDetails.id ? "event-item-description-show" : ""
            }`}
          >
            <div className={`column event-item-description-text`}>
              <span className={`column`}>
                <strong>
                  {activeItemDetails.type === "item" &&
                  activeItemDetails.id in userItems
                    ? userItems[activeItemDetails.id].name
                    : activeItemDetails.type === "grouped" &&
                      activeItemDetails.id in userGroupedItems
                    ? userGroupedItems[activeItemDetails.id].name
                    : null}
                </strong>
              </span>
              <p className={`column`}>
                <span>
                  <i>Details</i>
                </span>
                {activeItemDetails.type === "item" &&
                activeItemDetails.id in userItems
                  ? userItems[activeItemDetails.id].description
                  : activeItemDetails.type === "grouped" &&
                    activeItemDetails.id in userGroupedItems
                  ? userGroupedItems[activeItemDetails.id].description
                  : null}

                {activeItemDetails.type === "grouped" &&
                activeItemDetails.id in userGroupedItems ? (
                  <div className={`margin-top-15`}>
                    <span>Items Included</span>
                    <ol>
                      {userGroupedItems[activeItemDetails.id].itemsArray.map(
                        (itemID, iIndex) =>
                          itemID in userItems ? (
                            <li key={iIndex}>{userItems[itemID].name}</li>
                          ) : null
                      )}
                    </ol>
                  </div>
                ) : null}
              </p>
            </div>
            <div
              className={`event-item-description-button-container row right-align-row`}
            >
              <button
                className={`event-item-description-button`}
                onClick={handleChooseItem}
              >
                {activeItem.id && activeItemDetails.id === activeItem.id
                  ? "Deselect"
                  : "Select"}{" "}
                Gift
              </button>
            </div>
          </div>
        </section>

        {/* Recipient List */}
        <section
          className={`column center-column event-dashboard-full-column new-event-lower-row`}
        >
          <div className={`event-dashboard-sub-title primary-black-header`}>
            <span>Recipient List</span>
          </div>

          <div className={`row full-width full-height`}>
            <UserListContainer
              users={userUsers.activeUsers}
              userList={userList}
              loading={usersLoading}
              action={handleEditUserList}
            />

            <UserListContainer
              users={userUsers.activeUsers}
              userList={userSelectedList}
              loading={usersLoading}
              action={handleEditUserList}
              buttonType={"remove"}
              title={"Users on Event List"}
            />
          </div>
        </section>

        {/* Create Button */}
        <div className={`column center full-width`}>
          {error ? error : ""}
          <button
            className={`new-event-button new-event-button-blue`}
            onClick={handleEventCheck}
            disabled={userSelectedList.length === 0 || !activeItem.id}
          >
            {match.params.eventID ? "Edit" : "Create"} Event
          </button>
        </div>
      </main>
    </section>
  );
}

export {
  iconList,
  getIcon,
  getRandomInt,
  createOrders,
  editOrderList,
  calcGiftPackagePrice,
  calcGiftPackageWeight,
};
export default EventNew;
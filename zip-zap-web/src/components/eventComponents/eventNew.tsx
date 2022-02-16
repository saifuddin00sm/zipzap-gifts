import React, { useContext, useEffect, useState } from "react";
import { fetchRequest, UserContext, log } from "../../App";
import {
  Row,
  Col,
  Modal,
  DropdownButton,
  Dropdown,
  Button,
  Image,
  Carousel
} from "react-bootstrap";
import "../../App.scss";
import {
  adminItem,
  eventOrder,
  stripeCard,
  userEvent,
  userGroupedItem,
  userItem,
  userRecipient,
} from "../../classes";
import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import ForwardArrow from "../basicComponents/forwardArrow";
import ToolTip from "../basicComponents/ToolTip";
import {
  getItems,
  getGroupedItems,
  getUserList,
  formatDate,
  getEvents,
} from "./eventDashboard";
import ItemCard from "../basicComponents/eventComponents/itemCard";
import UserListContainer from "../basicComponents/eventComponents/userListContainer";
import GroupedItemCard from "../basicComponents/eventComponents/groupedItemCard";
import ItemRow from "../basicComponents/eventComponents/itemRow";
import appSettings from "../../appSettings.json";
import { add, parseISO, isValid, isAfter, format } from "date-fns";

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
  if (icon === "onetime") {
    return <BoltIcon className={`${className}`} />;
  } else if (icon === "recurring") {
    return <GiftCardIcon className={`${className}`} />;
  }
  else {
    return <span></span>;
  }
};

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getDifferenceInArrays = (arr1: Array<any>, arr2: Array<any>) => {
  return arr1.filter((x) => !arr2.includes(x));
};

const calcGiftPackagePrice = (
  gift: userGroupedItem,
  individualItems: { [key: string]: userItem }
) => {
  let totalPrice = 0;
  gift.itemsArray.forEach((iGiftID: number) => {
    if (!(iGiftID in individualItems)) {
      log(`Missing Item - ${iGiftID}`);
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
  gift.itemsArray.forEach((iGiftID: number) => {
    if (!(iGiftID in individualItems)) {
      log(`Missing Item - ${iGiftID}`);
    } else {
      log("Adding", [individualItems[iGiftID].weight]);
      totalPrice += parseFloat(individualItems[iGiftID].weight.toString());
    }
  });

  // TO - DO - Handle Async
  // let totalLoopResult = await totalLoop;

  return totalPrice;
};

const orderUserList = async (orders: { [key: string]: eventOrder }) => {
  let userList = [] as Array<string>;
  Object.keys(orders).forEach((orderID) => {
    userList.push(orders[orderID].giftee.toString());
  });

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
  oneTime: string = "",

  startDate: string = "",
  endDate: string = "",
  recuringType: string = "",

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

    let activeDate = null;


    if (oneTime === 'onetime' && startDate) {
      activeDate = startDate
    }   
    else {
      if(startDate && endDate && recuringType) {
        // We need to set the shipping date's year to within the event's start and end date interval
      const dateString =
      recuringType === "Birthday"
        ? userUsers.activeUsers[user].Birthday
        : userUsers.activeUsers[user]["Date Started"];
      
      let recurringDate = parseISO(dateString);
      if (!isValid(recurringDate)) {
        recurringDate = new Date(dateString);
      }

       // Set the recurring date's year to one of the interval years
      recurringDate.setFullYear(new Date(endDate).getFullYear());
      if (isAfter(recurringDate, new Date(endDate))) {
        // The active date falls outside of the interval, so set it to the start date's year instead
        recurringDate.setFullYear(new Date(startDate).getFullYear());
      }

      activeDate = format(recurringDate, 'yyyy-MM-dd');
    }
  }


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
      shippingDate: activeDate,
      shippingDetails: null,
      isActive: true,
    } as eventOrder;
  });
  await Promise.all(orderCreation);

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

  Object.keys(campaignOrders).forEach((orderID) => {
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

  orderData.orders = campaignOrders;

  // TO-DO - currentOrderList & Shipping Date
  orderData.currentOrderList = await getCurrentOrders(orderData.orders);

  return orderData;
};

const getCurrentOrders = async (orders: { [key: string]: eventOrder }) => {
  let today = new Date();

  let orderSort = Object.keys(orders).filter((order) => {
    return today.getMonth() === new Date(orders[order].shippingDate).getMonth();
  });

  return orderSort;
};

/*
const handleCalcShippingDate = async (
  criteria: { [key: string]: any },
  campaignStartDate: string,
  person: { [key: string]: any }
) => {
  let shippingDate = "";

  let keyCheck = Object.keys(criteria).map((key) => {
    log("TYPE", key, [typeof criteria[key]]);
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

  await Promise.all(keyCheck);
  return shippingDate;
};
*/

const handleCalcShippingFee = async (user: userRecipient) => {
  return 0;
};

const getDateRestriction = (daysToAdd: number = 8) => {
  let date = new Date();
  date.setDate(date.getDate() + daysToAdd);

  return date;
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

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => setShowModal(true);

  const [success, setSuccess] = useState(false);
  const [redirect, setRedirect] = useState("");

  const [itemsLoading, setItemsLoading] = useState(true);
  const [groupedItemsLoading, setGroupedItemsLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [userCards, setUserCards] = useState([] as Array<stripeCard>);

  const [eventName, setEventName] = useState("");
  // const todaysDate = new Date();
  // const year = todaysDate.getFullYear();
  // const month = todaysDate.getMonth();
  // const day = todaysDate.getDate();
  // const yearToDate = new Date(year + 1, month, day)
  const [recurringStartDate, setRecurringStartDate] = useState(
    format(add(new Date(), { days: 8 }), "yyyy-MM-dd")
  );
  const [recurringEndDate, setRecurringEndDate] = useState(
    format(add(new Date(), { years: 1, days: 7 }), "yyyy-MM-dd")
  );
  const [endDateMax, setEndDateMax] = useState(
    format(add(new Date(), { years: 1, days: 7 }), "yyyy-MM-dd")
  );

  // const [recurringStartDate, setRecurringStartDate] = useState(todaysDate.getFullYear().toString() + '-' + (todaysDate.getMonth() + 1).toString() + '-' +  (todaysDate.getDate()+8).toString());
  // const [recurringEndDate, setRecurringEndDate] = useState(yearToDate.getFullYear().toString() + '-' + (yearToDate.getMonth() + 1).toString() + '-' +  (yearToDate.getDate()+7).toString());
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventNote, setEventNote] = useState("");
  const [eventIcon, setEventIcon] = useState(1);
  const [activeCard, setActiveCard] = useState("");
  const [activeItemModal, setActiveItemModal] = useState(false);

  const [itemPaginationStart, setItemPaginationStart] = useState(0);
  const [activeItemDetails, setActiveItemDetails] = useState({
    type: "",
    id: "",
  });
  const [activeItem, setActiveItem] = useState({ type: "", id: "" });
  const [userList, setUserList] = useState([] as Array<string>);
  const [userSelectedList, setUserSelectedList] = useState([] as Array<string>);

  const [giftType, setGiftType] = useState("grouped");
  const [dateType, setDateType] = useState("onetime");
  const [recurringType, setrecurringType] = useState("");

  const [completedEvent, setCompletedEvent] = useState(
    null as null | userEvent
  );

  const [error, setError] = useState("");

  const [customGift, setCustomGift] = useState({
    id: "",
    name: "",
    items: [] as Array<{ id: number; details: { [key: string]: any } }>,
    instructions: "",
  });
  const [showItemList, setShowItemList] = useState(false);

  const needSettingEvents = Object.keys(userEvents).length === 0;
  useEffect(() => {
    const settingEvents = async () => {
      let events = await getEvents(user);

      setUserEvents(events);
    };

    if (needSettingEvents) {
      settingEvents();
    }
  }, [user, setUserEvents, needSettingEvents]);

  const needSearchItems = Object.keys(userItems).length === 0;
  useEffect(() => {
    const settingItems = async () => {
      let items = await getItems(user);
      setUserItems(items);
      setSearchItems([...Object.keys(items)]);
      setItemsLoading(false);
    };

    if (needSearchItems) {
      settingItems();
    } else {
      setItemsLoading(false);
      setSearchItems([...Object.keys(userItems)]);
    }
  }, [user, userItems, setUserItems, needSearchItems]);

  const needGroupedItems = Object.keys(userGroupedItems).length === 0;
  useEffect(() => {
    const settingGroupedItems = async () => {
      let items = await getGroupedItems(user);
      setUserGroupedItems(items);
      setSearchGroupedItems([...Object.keys(items)]);
      setGroupedItemsLoading(false);
    };

    if (needGroupedItems) {
      settingGroupedItems();
    } else {
      setGroupedItemsLoading(false);
      setSearchGroupedItems([...Object.keys(userGroupedItems)]);
    }
  }, [user, userGroupedItems, setUserGroupedItems, needGroupedItems]);

  var needActiveUsers = true
  if (userUsers) {
    needActiveUsers = Object.keys(userUsers.activeUsers).length === 0;
  }
  // else {
  //   TODO: need popup for adding users 
  // }
  useEffect(() => {
    const settingUsers = async () => {
      let users = await getUserList(user);
      setUserUsers(users);
      setUserUsersLoaded(true);

      if ("activeUsers" in users) {
        setUserList(Object.keys(users.activeUsers));
      }
      setUsersLoading(false);
    };

    if (needActiveUsers) {
      console.log("need active users")
      settingUsers();
    } else {
      console.log("Do not need active users")
      setUserList(Object.keys(userUsers.activeUsers));
      setUsersLoading(false);
    }
  }, [
    user,
    userUsers.activeUsers,
    setUserUsers,
    setUserUsersLoaded,
    needActiveUsers,
  ]);

  const needCards = userCards.length === 0;
  useEffect(() => {
    const handleGetSavedCards = async () => {
      let cardResponse = await fetchRequest(user, "payment/listCards", "GET");

      if (cardResponse.error) {
        // TO-DO - Handle Errors
        return;
      }

      if (cardResponse.cards) {
        setUserCards(cardResponse.cards);
      }
    };

    if (needCards) {
      handleGetSavedCards();
    }

    handleLoadDetailsFromLocalStorage();
  }, [user, needCards]);

  useEffect(() => {
    const handleInitialEventSetup = (
      paramsID: string,
      returnResult?: boolean
    ) => {
      if (paramsID !== null && paramsID in userEvents) {
        let event = userEvents[paramsID];

        if (returnResult) {
          return event;
        }

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
        setEventNote(
          event.defaultDetails.note ? event.defaultDetails.note : ""
        );
        setCustomGift(event.defaultDetails.customGift);
        setEventIcon(event.defaultDetails.eventIcon);
        setActiveCard(event.defaultDetails.eventCard);
      }
    };

    if (
      match.params.eventID &&
      match.params.eventID !== "new" &&
      Object.keys(userEvents).length > 0 &&
      Object.keys(userUsers.activeUsers).length > 0
    ) {
      handleInitialEventSetup(match.params.eventID);
    }
  }, [match.params.eventID, userEvents, userUsers.activeUsers]);

  const handleActiveItem = (type: string, id: string) => {
    if (activeItem.id) {
      setActiveItemModal(false)
      return false;
    }
    if (activeItemDetails.type === type && activeItemDetails.id === id) {
      setActiveItemDetails({ type: "", id: "" });
      setActiveItemModal(false)
    } else {
      setActiveItemDetails({ type: type, id: id });
      setActiveItemModal(true)
    }
  };

  const handleSetReocccuringType = (type: string) => {
    setrecurringType(type);
  };

  const handleSetStartDate = (startDate :string) => {
    setRecurringStartDate(startDate);
    var newEndDate = startDate.split("-")
    console.log(newEndDate)
    var endDateMax = format(add(new Date(Number(newEndDate[0]), Number(newEndDate[1]) - 1, Number(newEndDate[2])), { years: 1}), "yyyy-MM-dd")
    setEndDateMax(endDateMax)
  }

  const handleDeactiveItemModal = () => {
    setActiveItemModal(false)
    handleActiveItem("grouped", activeItemDetails.id)
  }

  const handleChooseItem = () => {
    if (activeItem.id === activeItemDetails.id) {
      setActiveItem({
        type: "",
        id: "",
      });
      handleActiveItem("grouped", activeItemDetails.id)
      console.log("active item handle choose item")
    } else {
      setActiveItem(activeItemDetails);
      setActiveItemModal(false)
      console.log("" )
      // handleDeactiveItemModal();
      console.log(" non active item handle choose item")
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
        // if(userUsers.activeUsers[userID])
        userList.push(userID);
      }

      if (userSelectedList.includes(userID)) {
        let index = userSelectedList.indexOf(userID);
        userSelectedList.splice(index, 1);
      } else {
          userSelectedList.push(userID)
          console.log("adding user to container")
      }
      userList.sort((a, b) => parseInt(a) - parseInt(b));
      setUserList([...userList]);

      userSelectedList.sort((a, b) => parseInt(a) - parseInt(b));
      setUserSelectedList([...userSelectedList]);
    }
  };

  const handleEventCheck = () => {
    if (!eventName) {
      setError("Please enter an Event Name");
      return true;
    } else if (dateType=="onetime" && !eventStartDate ) {
      setError("Please enter an Event Start Date");
      return true;
    }
    else if (!activeItem.id) {
      setError("Please select a gift");
      return true;
    } else if (userSelectedList.length === 0) {
      setError("Please select at least one recipient");
      return true;
    } else if (!activeCard) {
      setError("Please select a card for billing");
      return true;
    } else {
      setError("");
    }
    if (match.params.eventID) {
      handleEditEvent();
      handleShow();
    } else {
      //this is where it is checking if it is a oneitme
      if (dateType === "onetime" ){
        handleAddOneTimeOrder();
        handleShow();
      }
      else {
        handleAddNewEvent();
        handleShow();
      }
    }
  };

  const handleAddOneTimeOrder = async () => {

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
          eventCard: activeCard,
        },
      }
    );

    if (createEventResponse.campaignID) {
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
        totalPrice,
        eventNote,
        undefined,
        'onetime',
        eventStartDate
      );
      let orderCreationResponse = await fetchRequest(
        user,
        `orders/${createEventResponse.campaignID}`,
        "PUT",
        {
          user: orders.orders["0"],
          oneTime: true,
          oneTimeDB: orders.currentOrderList.length > 0 ? true : false,
        }
      );

      if ("saved" in orderCreationResponse) {
        setSuccess(true);
        setUserEvents([]);
      }
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
        startDate: recurringStartDate,
        endDate: recurringEndDate,
        userList: userSelectedList,
        defaultItemID: activeItem.type === "item" ? activeItem.id : null,
        defaultGroupedItemID: activeItem.type === "item" ? null : activeItem.id,
        defaultDetails: {
          note: eventNote,
          customGift: customGift,
          eventIcon: eventIcon,
          eventCard: activeCard,
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

      // TODO: handle price override
      let orders = await createOrders(
        userUsers,
        createEventResponse.campaignID,
        userSelectedList,
        activeItem,
        totalPrice,
        eventNote,
        undefined,
        'recurring',
        eventStartDate,
        eventEndDate,
        recurringType
      );

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
        userList: userSelectedList,
        defaultItemID: activeItem.type === "item" ? activeItem.id : null,
        defaultGroupedItemID: activeItem.type === "item" ? null : activeItem.id,
        defaultDetails: {
          note: eventNote,
          customGift: customGift,
          eventIcon: eventIcon,
          eventCard: activeCard,
        },
      }
    );

    if ("campaignID" in createEventResponse) {
      // TO-DO - get total price

      let allCampaignOrders = await fetchRequest(
        user,
        `orders/${match.params.eventID}`,
        "GET"
      );

      if ("campaignOrders" in allCampaignOrders && match.params.eventID) {
        let event;
        const paramsID = match.params.eventID;
        if (paramsID !== null && paramsID in userEvents) {
          event = userEvents[paramsID];
        }

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
            missingOrders, // what is currentOrderUsers maybe just userSelectedList
            activeItem,
            activeItem.type === "item" && activeItem.id in userItems
              ? userItems[activeItem.id].price
              : activeItem.type === "grouped" &&
                activeItem.id in userGroupedItems
              ? userGroupedItems[activeItem.id].priceOverride
              : 0,
            eventNote,
            Object.keys(allCampaignOrders.campaignOrders).length,
            dateType,
            eventStartDate,
            recurringType
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

          let orderCreationResponse = await fetchRequest(
            user,
            `orders/${match.params.eventID}`,
            "POST",
            updatedOrders
          );

          if ("saved" in orderCreationResponse) {
            setSuccess(true);
            setUserEvents([]);
          }
        }
      }

      // TODO: go through all orders and update order gifts
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

  const handleChangeDateType = (type: string) => {
    setDateType(type);
  };
  const dateIsOneTime = (): boolean => {
    if (dateType === "onetime") {
      return true;
    } else {
      return false;
    }
  };

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
      gift.details[extraData.detail] = extraData;
      // TODO: customGift.items.splice(index, 1);

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

    await Promise.all(itemLoop);

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
        return item.name.toLowerCase().includes(e.target.value);
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
        return item.name.toLowerCase().includes(e.target.value);
      });

      setSearchGroupedItems([...searchResults]);
    } else {
      setSearchGroupedItems(Object.keys(userGroupedItems));
    }
  };

  const handleSaveDetailsToLocalStorage = () => {
    localStorage.setItem(
      "newEventTemp",
      JSON.stringify({
        name: eventName,
        criteria: {},
        startDate: eventStartDate,
        userList: userSelectedList,
        defaultItemID: activeItem.type === "item" ? activeItem.id : null,
        defaultGroupedItemID: activeItem.type === "item" ? null : activeItem.id,
        defaultDetails: {
          note: eventNote,
          customGift: customGift,
          eventIcon: eventIcon,
          eventCard: activeCard,
        },
      })
    );

    setRedirect("/checkout?redirectURL=/event/new&checkoutType=add");
  };

  const handleLoadDetailsFromLocalStorage = () => {
    let tempEvent = localStorage.getItem("newEventTemp");

    if (tempEvent) {
      let tempEventJSON = JSON.parse(tempEvent);

      setEventName(tempEventJSON.name);
      setEventStartDate(tempEventJSON.startDate);
      // setEventEndDate(tempEventJSON.endDate);
      setUserSelectedList(tempEventJSON.userList);
      setActiveItem({
        type: "grouped",
        id: tempEventJSON.defaultGroupedItemID,
      });

      setEventNote(tempEventJSON.defaultDetails.note);
      setCustomGift(tempEventJSON.defaultDetails.customGift);
      setEventIcon(tempEventJSON.defaultDetails.eventIcon);
      setActiveCard(tempEventJSON.defaultDetails.eventCard);

      localStorage.removeItem("newEventTemp");
    }
  };

  let pricePerPerson = 0;
  if (activeItem.type === "grouped" && activeItem.id in userGroupedItems) {
    if (userGroupedItems[activeItem.id].priceOverride) {
      pricePerPerson = userGroupedItems[activeItem.id].priceOverride;
    } else {
      pricePerPerson = calcGiftPackagePrice(
        userGroupedItems[activeItem.id],
        userItems
      );
    }
  } else if (activeItem.type === "custom") {
    pricePerPerson = customGift.items.reduce((total, { id }) => {
      return total + userItems[id].price;
    }, 0);
  }

  return (
    <Col>
      {redirect ? <Redirect to={redirect} /> : null}
      <Row>
        <Col className="page-header justify-content-center ">
          <h3>{match.params.eventID ? "Edit" : "Add a"} Gift</h3>
        </Col>
      </Row>
      {/* <Row>
        <Col md={4}>
        <Link to={"/dashboard"} className={`back-link`}>
          Back to Event Dashboard
        </Link>
        </Col>
      </Row> */}

      {/* holds 4 Containers */}
      <Row className="event-dashboard-sub-title primary-green-header mx-5">
        <span>{completedEvent ? completedEvent.name : "Gift"} Details</span>
      </Row>
      <Row className="new-event-main-section p-3 mx-5">
        <Col className="mx-3" sm="4">
          <Row>
            <span>Gift Name</span>
            <input
              placeholder={"Birthdays"}
              className={`general-input-fit new-event-input`}
              value={eventName}
              onChange={(e: any) => setEventName(e.target.value)}
            ></input>
          </Row>
          <Row>
            <span>Custom Note</span>
            <textarea
              placeholder={"i.e. Thanks for being a great employee!"}
              className={`note-input-fit full-width`}
              value={eventNote}
              onChange={(e: any) => setEventNote(e.target.value)}
            ></textarea>
          </Row>
        </Col>
        <Col className="px-3">
          <Row>
            <Col className="p-2 m-1 d-flex flex-row justify-content-end">
              <Button
                className={`new-event-button`}
                variant={
                  dateType === "onetime" ? "zipBlue" : "outline-secondary"
                }
                onClick={() => handleChangeDateType("onetime")}
              >
                One Time
              </Button>
              <Button
                className={`new-event-button`}
                variant={
                  dateType === "recurring" ? "zipBlue" : "outline-secondary"
                }
                onClick={() => handleChangeDateType("recurring")}
              >
                Recurring
              </Button>
              <ToolTip placement="left" title="Gift Types">
                <>
                  A <strong>One Time Gift</strong> is a gift that goes out once!
                  <br />
                  <em>
                    E.g., A Get Well Soon Box, A Sympathy Gift, a Welcome Little
                    One Box; things that are not necessarily planned on a
                    specific day.
                  </em>
                  <hr />A <strong>Recurring Gift</strong> is a gift that happens
                  multiple times during a set time frame, for different people.
                  <br />
                  <em>E.g., Job Anniversaries or Birthdays.</em>
                </>
              </ToolTip>
            </Col>
          </Row>
          {/* <Row className="px-3">
            <span>Icon to Represent Event</span>
                <SelectList
                  detailList={iconList}
                  action={(option: any, oIndex: number) => setEventIcon(oIndex)}
                  selected={eventIcon}
                  altDisplay={getIcon}
                />
          </Row> */}
        </Col>
      </Row>
      <Row className="new-event-main-section p-3 mx-5">
        <hr />
        {dateType === "onetime" ? (
          <Col md="6">
            <span className={"d-flex justify-content-center"}>
              Gift Date&nbsp;
              <ToolTip>
                This date is the day the package should arrive to the recipient.
                (Give or take a day for any postal delay.)
              </ToolTip>
            </span>
            <input
              type={"date"}
              placeholder={"From"}
              className={`general-input-fit new-event-date-input`}
              value={eventStartDate}
              onChange={(e: any) => setEventStartDate(e.target.value)}
              min={formatDate(getDateRestriction().toString())}
            ></input>{" "}
          </Col>
        ) : (
          <Col>
            <Row>
              <Col md="4" sm="6">
                <span>Start Date</span>
                <input
                  type={"date"}
                  placeholder={"From"}
                  className={`general-input-fit new-event-date-input`}
                  value={recurringStartDate}
                  onChange={(e: any) => handleSetStartDate(e.target.value)}
                  min={formatDate(getDateRestriction().toString())}
                ></input>{" "}
              </Col>
              <Col md="4" sm="6">
                <span className={"d-flex justify-content-center"}>
                  End Date&nbsp;
                  <ToolTip>
                    This is the recurring gift time frame.
                    <br />
                    <em>
                      E.g., Send all employees this Gift on their Birthday from
                      1/1/2022 to 12/31/2022. You can choose a timeframe of one year or less.
                    </em>
                  </ToolTip>
                </span>
                <input
                  type={"date"}
                  placeholder={"To"}
                  className={`general-input-fit new-event-date-input`}
                  value={recurringEndDate}
                  onChange={(e: any) => setRecurringEndDate(e.target.value)}
                  min={formatDate(getDateRestriction().toString())}
                  max={endDateMax}
                ></input>{" "}
              </Col>
              <Col sm="4" className="my-2">
                <p>Select Recurring Type: </p>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={recurringType ? recurringType : "Select"}
                  variant="zapGreen"
                >
                  <Dropdown.Item
                    onClick={() => handleSetReocccuringType("Birthday")}
                  >
                    Birthday
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleSetReocccuringType("Job Anniversary")}
                  >
                    Job anniversary
                  </Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
          </Col>
        )}
      </Row>

      <Row className="event-dashboard-sub-title primary-black-header inner-row mt-3 mx-5">
        <span>Choose a Gift</span>
      </Row>
      <Row className="new-event-main-section pt-3 mx-5">
        <Row>
          <Col sm={6}>
            {giftType !== "custom" ? (
              <input
                className={`general-input-fit full-width`}
                placeholder={"Search for an item"}
                onChange={handleGroupedItemSearch}
              ></input>
            ) : null}
          </Col>
          <Col className="p-2 d-flex flex-row justify-content-end">
            <Button
              className={`new-event-button`}
              variant={giftType === "grouped" ? "zipBlue" : "outline-secondary"}
              onClick={() => handleChangeGiftType("grouped")}
            >
              Gift Package
            </Button>
            <Button
              className={`new-event-button`}
              variant={giftType === "custom" ? "zipBlue" : "outline-secondary"}
              onClick={() => handleChangeGiftType("custom")}
            >
              Custom Gift
            </Button>
            <ToolTip>
              Choose from some of our curated gift boxes, or create your own
              from our store! A Gift Expert will be in touch after you submit
              your order to collect branding information.
            </ToolTip>
          </Col>
        </Row>

        {giftType !== "custom" ? (
          <Row className="p-3">
            <Col xs={1} className="align-self-center">
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
            </Col>
            <Col>
              <Row>
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
                          border={
                            activeItemDetails.type === "grouped" &&
                            activeItemDetails.id.toString() ===
                              itemID.toString()
                              ? `info`
                              : ``
                          }
                          class={
                            activeItemDetails.type === "grouped" &&
                            activeItemDetails.id.toString() ===
                              itemID.toString()
                              ? `event-item-card-active`
                              : activeItemDetails.type === "grouped" &&
                                activeItemDetails.id.toString() !==
                                  itemID.toString()
                              ? "event-item-card-inactive"
                              : ``
                          }
                        />
                      ))
                  : null}
              </Row>
            </Col>

            <Col xs={1} className="align-self-center">
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
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <Row>
                <Col className="mx-3" sm={4}>
                  <span className={`row`}>Gift Name</span>
                  <input
                    placeholder={"i.e. Welcome Box"}
                    className={`general-input-fit new-event-input`}
                    value={customGift.name}
                    onChange={(e: any) =>
                      handleCustomGiftChange("name", e.target.value)
                    }
                  ></input>
                  <span className={`row`}>Special Instructions:</span>
                  <textarea
                    placeholder={"i.e. No Peanuts"}
                    className={`note-input-fit t new-event-input`}
                    value={customGift.instructions}
                    onChange={(e: any) =>
                      handleCustomGiftChange("instructions", e.target.value)
                    }
                  ></textarea>
                </Col>
                <Col className="p-2">
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
                    <div className="event-item-list-container">
                      <div className="event-item-list-sub-container m-3">
                        <input
                          className={`general-input-fit new-event-input event-item-search-bar my-3`}
                          placeholder={"Search for an item"}
                          onChange={handleCustomGiftSearch}
                        ></input>
                        <div className={`event-item-list`}>
                          <ul className={`event-item-list-list`}>
                            {searchItems.map((itemID, iIndex) => (
                              <li
                                key={iIndex}
                                className={`mx-3`}
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
                          </ul>
                        </div>
                        <div className="py-2">
                          <button
                            className={`new-event-button new-event-button-red`}
                            onClick={() => setShowItemList(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Button
                      className={`new-event-button new-event-button-blue`}
                      onClick={() => setShowItemList(true)}
                      variant="zipBlue"
                      size="sm"
                    >
                      Add Item
                    </Button>
                  )}
                </Col>
                {/* <button
                    className={`new-event-button new-event-button-blue`}
                    onClick={() => setShowItemList(true)}
                    >
                      Add Another Item
                    </button> */}
              </Row>

              <Row>
                <Col>
                  <p className="error-message-text">{error ? error : ""}</p>
                  <Button
                    className={`new-event-button`}
                    onClick={handleCustomGiftSave}
                    disabled={customGiftLoading}
                    variant="zapGreen"
                  >
                    Save Gift Package
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Row>
      {/* <Modal show={activeItemModal} onHide={setActiveItemModal(false)}> */}
      <Modal show={activeItemModal} onHide={handleDeactiveItemModal}>
        <Modal.Header closeButton>
          <Modal.Title>
              <h4>
              <strong>
                {activeItemDetails.type === "item" &&
                activeItemDetails.id in userItems
                  ? userItems[activeItemDetails.id].name
                  : activeItemDetails.type === "grouped" &&
                    activeItemDetails.id in userGroupedItems
                  ? userGroupedItems[activeItemDetails.id].name
                  : null}
              </strong>
              </h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                  {activeItemDetails.type === "item" &&
                  activeItemDetails.id in userItems
                  ? (<Image
                    src={`${appSettings.pictureURL}/${userItems[activeItemDetails.id].mainPicture}`}
                    alt={userItems[activeItemDetails.id].name}
                    className={`event-item-modal-image`}
                  ></Image>)
                  : activeItemDetails.type === "grouped" &&
                    activeItemDetails.id in userGroupedItems
                  ? (
                    <div>
                      <Carousel >
                        <Carousel.Item>
                            <Image
                            src={`${appSettings.pictureURL}/${userGroupedItems[activeItemDetails.id].mainPicture}`}
                            alt={userGroupedItems[activeItemDetails.id].name}
                            className={`event-item-modal-image`}
                            ></Image>
                        </Carousel.Item>
                        
                        {!itemsLoading && giftType === "grouped"
                          ? userGroupedItems[activeItemDetails.id].pictures
                              .map((itemID, iIndex) => (
                                
                          <Carousel.Item key={itemID}>
                            <img
                              className="d-block w-100"
                              src={`${appSettings.pictureURL}/${itemID}`}
                              alt="Second slide"
                              
                            />
                          </Carousel.Item>
                          )) : null}
                      </Carousel>
                    </div>
                  )
                  : null}
        </Modal.Body>
            <Modal.Footer>
              <div className="m-1">
                <span>
                  <i>Details: </i>
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
                  <div className={`margin-top-15 pt-3`}>
                    <span className="items-included">Items Included</span>
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
              </div>
              <Button
                  className={`event-item-description-button`}
                  onClick={handleChooseItem}
                  variant="zapGreen"
              >
                  {activeItem.id && activeItemDetails.id === activeItem.id
                    ? "Deselect"
                    : "Select"}{" "}
                  Gift
              </Button>

            </Modal.Footer>
      </Modal>
      <Row
        className={`event-item-description mx-5 ${
          activeItemDetails.id ? "event-item-description-show" : ""
        }`}
      >
        <Col className="align-left item-description-box">
          <strong>
            {activeItemDetails.type === "item" &&
            activeItemDetails.id in userItems
              ? userItems[activeItemDetails.id].name
              : activeItemDetails.type === "grouped" &&
                activeItemDetails.id in userGroupedItems
              ? userGroupedItems[activeItemDetails.id].name
              : null}
          </strong>
          <div className="m-1">
            <span>
              <i>Details: </i>
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
              <div className={`margin-top-15 pt-3`}>
                <span className="items-included">Items Included</span>
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
          </div>
        </Col>
        <Col xs="2">
          {/* <button
            onClick={() => handleActiveItem("grouped", activeItemDetails.id)}
            className={`x-button delete-button`}
          >
            x
          </button> */}
        </Col>
        <div
          className={`event-item-description-button-container right-align-row`}
        >
          <Button
            className={`event-item-description-button`}
            onClick={() => handleActiveItem("grouped", activeItemDetails.id)}
            size="sm"
            variant="zapGreen"
          >
            Deselect Gift
          </Button>
        </div>
      </Row>

      {/* Recipient List */}
      {/* <section
          className={`column center-column event-dashboard-full-column new-event-lower-row`}
        > */}
      <Row className="event-dashboard-sub-title primary-black-header mt-3 mx-5">
        <span>Recipient List</span>
      </Row>
      {/* If reoccuring, show date type */}
      <Row className="new-event-main-section p-3 mx-5 ">
        <UserListContainer
          users={userUsers.activeUsers}
          userList={userList}
          loading={usersLoading}
          action={handleEditUserList}
          dateType = {dateType}
          recurringType={recurringType}
          eventStartDate={recurringStartDate}
          eventEndDate={recurringEndDate}
        />
        <UserListContainer
          users={userUsers.activeUsers}
          userList={userSelectedList}
          loading={usersLoading}
          action={handleEditUserList}
          dateType = {dateType}
          buttonType={"remove"}
          title={"Recipients on Gift List"}
          recurringType={recurringType}
        />
      </Row>

      {/* checkout confirmation  */}
      <Row className="event-dashboard-sub-title primary-black-header mt-3 mx-5">
        <span>Checkout</span>
      </Row>

      <Row className={`new-event-main-section p-3 mx-5`}>
        {/* total price details  */}
        {/* <div
              className={`event-dashboard-half-column column left-align-column`}
            > */}
        <Col>
          <Row className="border-bottom">
            <Col>
              <Row className="border-bottom">Total Gift Price Per Person:</Row>
              <Row>Shipping to Recipient's Home Address:</Row>
            </Col>
            <Col>
              <Row>${pricePerPerson}</Row>
              <Row>TBD per person</Row>
            </Col>
          </Row>
        </Col>
        {/* </div>
            <div
              className={`event-dashboard-half-column column left-align-column`}
            ></div> */}

        {/* credit card details  */}
        <Row className={`mt-3`}>
          <Col sm={8}>
            <p className="bold align-left">Choose a Saved Payment Method</p>
            {userCards.map((card, cIndex) => (
              <button
                key={cIndex}
                className={`column stripe-saved-card-button ${
                  activeCard === card.id ? "active-stripe-card" : ""
                }`}
                onClick={() => setActiveCard(card.id)}
              >
                <span>Credit Card Ending In: **** {card.card.last4}</span>
                <span>
                  Exp. MM/YY: {card.card.exp_month} / {card.card.exp_year}
                </span>
                <span>Name on Card: {card.billing_details.name}</span>
              </button>
            ))}
          </Col>
          <Col>
            <div className={`event-dashboard-sub-title`}>
              <span></span>
            </div>
            <br></br>
            <Button
              className={`new-event-button new-event-button-blue new-event-button-no-margin`}
              onClick={handleSaveDetailsToLocalStorage}
              variant="zipBlue"
              // disabled={userSelectedList.length === 0 || !activeItem.id}
            >
              Add New Card
            </Button>
          </Col>

          {/* credit card details  */}
        </Row>
      </Row>
      <Row className={"mt-3 mx-5 mb-5"}>
        <span className="error-message-text">{error ? error : ""}</span>
        <Col>
          <Button
            className={`new-event-button new-event-button-blue`}
            onClick={handleEventCheck}
            disabled={userSelectedList.length === 0 || !activeItem.id}
            variant={
              userSelectedList.length === 0 || !activeItem.id
                ? "secondary"
                : "zipBlue"
            }
            size="lg"
          >
            {match.params.eventID ? "Save" : "Create"} Gift
          </Button>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <h5>
              {eventName} has been{" "}
              {match.params.eventID ? "updated" : "created"} sucessfully!
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <button
            className="general-button gereral-button-green px-4 py-2"
            onClick={handleClose}
          >
            <Link to={"/event"}>Back to Dashboard</Link>
          </button>
        </Modal.Footer>
      </Modal>
    </Col>
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
  getDateRestriction,
};
export default EventNew;

import React, { useContext, useEffect, useState } from "react";
import { fetchRequest, UserContext } from "../../App";
import { eventOrder } from "../../classes";
import LoadingIcon from "../basicComponents/LoadingIcon";
import { Row, Col } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";
import ForwardArrow from "../basicComponents/forwardArrow";
import {
  getItems,
  getGroupedItems,
  getUserList,
  formatDate,
  getEvents,
} from "../eventComponents/eventDashboard";
import ItemCard from "../basicComponents/eventComponents/itemCard";
import UserListContainer from "../basicComponents/eventComponents/userListContainer";
import ModalBox from "../basicComponents/modalBox";
import GroupedItemCard from "../basicComponents/eventComponents/groupedItemCard";
import ItemRow from "../basicComponents/eventComponents/itemRow";
import { ReactComponent as PlusIcon } from "../../icons/plusSign.svg";
import {
  calcGiftPackagePrice,
  createOrders,
  getDateRestriction,
} from "../eventComponents/eventNew";

type TParams = {
  orderID?: string;

  eventID?: string;
};

function OrderNew({ match, location }: RouteComponentProps<TParams>) {
  // TO-DO - HANDLE ERRORS
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
  const [initalLoading, setInitialLoading] = useState(true);

  const [success, setSuccess] = useState(false);

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
    console.log("users", userUsers);
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

  // const [eventName, setEventName] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventNote, setEventNote] = useState("");

  const [itemPaginationStart, setItemPaginationStart] = useState(0);
  const [activeItemDetails, setActiveItemDetails] = useState({
    type: "",
    id: "",
  });
  const [activeItem, setActiveItem] = useState({ type: "", id: "" });
  const [userList, setUserList] = useState([] as Array<string>);
  const [userSelectedList, setUserSelectedList] = useState([] as Array<string>);

  const [giftType, setGiftType] = useState("grouped");

  const [searchItems, setSearchItems] = useState([] as Array<string>);
  const [searchGroupedItems, setSearchGroupedItems] = useState(
    [] as Array<string>
  );

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
      await settingGroupedItems();
      setActiveItem({
        type: "custom",
        id: saveResponse.itemsID,
      });

      customGift.id = saveResponse.itemsID;
      setCustomGift({ ...customGift });
      handleChangeGiftType("grouped");
      handleActiveItem("grouped", saveResponse.itemsID);
      setActiveItem({
        type: "custom",
        id: saveResponse.itemsID,
      });
    }

    // TO-DO - Handle Errors

    setCustomGiftLoading(false);
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
    if (!eventStartDate) {
      setError("Please enter a Gift Date");
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
    console.log("the start date")
    console.log(eventStartDate)

    if (match.params.orderID) {
      handleEditOrder();
    } else {
      handleNewOrder();
    }
  };

  const handleNewOrder = async () => {
    let campaignID = "";

    Object.keys(userEvents).forEach((eventID) => {
      if (userEvents[eventID].name.toLowerCase() === "onetime") {
        campaignID = eventID;
      }
    });

    // activeItem.type === "item" && activeItem.id in userItems
    //     ? userItems[activeItem.id].price
    //     :

    let orders = await createOrders(
      userUsers,
      campaignID,
      userSelectedList,
      activeItem,
      activeItem.type === "grouped" && activeItem.id in userGroupedItems
        ? userGroupedItems[activeItem.id].priceOverride
          ? userGroupedItems[activeItem.id].priceOverride
          : await calcGiftPackagePrice(
              userGroupedItems[activeItem.id],
              userItems
            )
        : 0,
      eventNote,
      undefined,
      true,
      eventStartDate
    );

    // console.log("SAVING OR", orders, activeItem, userGroupedItems);
    // setLoading(false);

    // return;

    let orderCreationResponse = await fetchRequest(
      user,
      `orders/${campaignID}`,
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
  };

  const handleEditOrder = async () => {
    let campaignID = match.params.eventID;

    initialOrder.shippingDate = eventStartDate;
    initialOrder.notes = eventNote;
    initialOrder.giftee = userSelectedList[0];
    initialOrder.shippingDate = eventStartDate;
    initialOrder.groupedID = parseInt(activeItem.id);

    // TO-DO - UPDATE PRICE
    // initialOrder.cost =

    let orderCreationResponse = await fetchRequest(
      user,
      `orders/${campaignID}`,
      "PUT",
      {
        user: initialOrder,
      }
    );

    if ("saved" in orderCreationResponse) {
      setSuccess(true);
      setUserEvents([]);
    }
  };

  const [initialOrder, setInitalOrder] = useState({
    orderID: 0,
    cost: 0,
    shippingAddress: null,
    giftee: "",
    campaignID: 0,
    groupedID: null,
    giftID: null,
    notes: "",
    shippingFee: 0,
    shippingDate: "",
    shippingDetails: null,
    isActive: true,
  } as eventOrder);

  const handleInitialLoad = async (eventID: string, orderID: string) => {
    console.log("INITA", eventID, orderID);

    let orderResponse = await fetchRequest(
      user,
      `orders/${eventID}/${orderID}`,
      "GET"
    );
    console.log("ORDER", orderResponse);

    if ("order" in orderResponse && orderResponse.order) {
      let order = orderResponse.order as eventOrder;
      setInitalOrder({ ...order });

      setEventStartDate(formatDate(order.shippingDate));
      setEventNote(order.notes);
      setUserSelectedList([order.giftee.toString()]);

      setActiveItemDetails({
        type: "grouped",
        id: order.groupedID ? order.groupedID.toString() : "",
      });

      setActiveItem({
        type: "grouped",
        id: order.groupedID ? order.groupedID.toString() : "",
      });
    }

    setInitialLoading(false);
  };

  useEffect(() => {
    if (match.params.eventID && match.params.orderID) {
      handleInitialLoad(match.params.eventID, match.params.orderID);
    } else {
      setInitialLoading(false);
    }
  }, [match.params.eventID, match.params.orderID]);

  const handleDateValidation = (e: any) => {
    let newDate = new Date(e.target.value);
    let minDate = getDateRestriction();

    if (newDate < minDate) {
      setError(
        `Please Choose a Date Later Than ${formatDate(minDate.toString())}`
      );
      return;
    }

    setEventStartDate(e.target.value);
  };

  return (
    <Col>
      <Row>
        <Col className="page-header justify-content-center">
          <h3>{match.params.orderID ? "Edit" : "Add a"} One-Time Gift</h3>
        </Col>
      </Row>
      {initalLoading ? <LoadingIcon /> : ""}
      <Row className={`mx-3 width-45`}>
        <Link to={"/event"} className={`back-link`}>
          Back to Event Dashboard
        </Link>
      </Row>

      {/* holds 4 Containers */}
      <Row className="d-flex justify-content-center mx-3">
        {loading || success ? (
          <ModalBox>
            {success ? (
              <div className={`column`}>
                <span>
                  Order
                  {match.params.orderID ? " updated" : " created"} sucessfully!
                </span>
                <br></br>
                <Link to={"/dashboard"}>Back to Event Dashboard</Link>
              </div>
            ) : (
              `${
                match.params.orderID ? "Editing" : "Creating"
              } order please wait...`
            )}{" "}
          </ModalBox>
        ) : null}

        <Row className="event-dashboard-sub-title primary-green-header mx-5">
          <span>Details</span>
        </Row>
        <Row className="new-event-main-section p-3 mx-5">
          {/* name, event date */}
          <Col sm="5">
            <div className={`column full-width`}>
              <span className={`row`}>
                Gift Date{" "}
                {error.toLowerCase().includes("date") ? ` - ${error}` : ""}
              </span>
              <input
                type={"date"}
                placeholder={"From"}
                className={`general-input-fit new-event-date-input`}
                value={eventStartDate}
                onChange={handleDateValidation}
              ></input>
            </div>

            {/* <div className={`column full-width`}>
              <span className={`row`}>Event Name</span>
              <input
                placeholder={"Birthdays"}
                className={`general-input-fit new-event-input`}
                value={eventName}
                onChange={(e: any) => setEventName(e.target.value)}
              ></input>
            </div> */}

            {/* <br></br> */}
            <span className={`row`}>Note</span>
            <textarea
              placeholder={"i.e. Thanks for being a great employee!"}
              className={`note-input-fit full-width`}
              value={eventNote}
              onChange={(e: any) => setEventNote(e.target.value)}
            ></textarea>
          </Col>
          <Col>
            {/* <div className={`row center-column full-width space-between`}>

            </div> */}
            <p className={`row m-1`}>Employees</p>

            {userSelectedList.length > 0 &&
            Object.keys(userUsers.activeUsers).length > 0 ? (
              <span
                className={`row center space-between general-input-fit order-user-field new-event-date-input`}
              >
                <span>
                  {userUsers.activeUsers[userSelectedList[0]]["First Name"]}{" "}
                  {userUsers.activeUsers[userSelectedList[0]]["Last Name"]}
                </span>

                <button
                  className={`event-user-list-button  event-user-list-button-remove `}
                  onClick={() => handleEditUserList("removeAll")}
                >
                  <PlusIcon />
                </button>
              </span>
            ) : (
              <UserListContainer
                users={userUsers.activeUsers}
                userList={userList}
                loading={usersLoading}
                action={handleEditUserList}
                // action={() => null}
                title={"Recipient List"}
                class={`full-width full-height`}
              />
            )}
          </Col>
        </Row>

        {/* button row and gift package container*/}
        <section className={`column center-row event-dashboard-full-column `}>
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

        {/* checkout confirmation  */}
        <section className={`column center-row event-dashboard-full-column `}>
          <div className={`event-dashboard-sub-title primary-black-header`}>
            <span>Checkout</span>
          </div>
          <br></br>

          <div className={`row center center-self width-90`}>
            {/* total price details  */}
            <div
              className={`event-dashboard-half-column column left-align-column`}
            >
              <div className={`row`}>
                <span className={`row`}>Total Gift Price: </span>
                <span className={`row`}>
                  $
                  {activeItem.type === "grouped" &&
                  activeItem.id in userGroupedItems
                    ? userGroupedItems[activeItem.id].priceOverride
                      ? userGroupedItems[activeItem.id].priceOverride
                      : calcGiftPackagePrice(
                          userGroupedItems[activeItem.id],
                          userItems
                        )
                    : 0}
                </span>
              </div>

              <div className={`row`}>
                <span className={`row`}>Shipping: </span>
                <span className={`row`}>TBD</span>
              </div>

              <div className={`row`}>
                <span className={`row`}>
                  Gift will be charged to default payment method for{" "}
                  {match.params.orderID ? "the event" : " the account"}
                </span>
              </div>
            </div>
            <div
              className={`event-dashboard-half-column column left-align-column`}
            ></div>

            {/* credit card details  */}
          </div>
        </section>

        {/* Create Button */}
        <div className={`column center full-width`}>
          <div className={`row`}>
            <label>I agree to the purchase price listed</label>
            <input type={"checkbox"}></input>
          </div>
          {error ? error : ""}
          <button
            className={`new-event-button new-event-button-blue`}
            onClick={handleEventCheck}
          >
            {match.params.orderID ? "Edit" : "Create"} Gift
          </button>
        </div>
      </Row>
    </Col>
  );
}

export default OrderNew;

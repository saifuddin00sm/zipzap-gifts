import React, { useContext, useEffect, useState } from "react";
import {Container, Row, Col, Popover} from 'react-bootstrap';
import { fetchRequest, UserContext } from "../../App";
import { userGroupedItem } from "../../classes";
import appSettings from "../../appSettings.json";
import GiftCard from "../giftComponents/GiftCard";
import GiftDetails from "./GiftDetails";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";


const getGroupedItems = async (user: any) => {
  let response = await fetchRequest(user, "groupedItems", "GET");

  if ("items" in response) {
    console.log("the items")
    console.log(response.items)
    return response.items;
  }

  return {};
};

const getItems = async (user: any) => {
  let response = await fetchRequest(user, "items", "GET");

  if ("items" in response) {
    return response.items;
  }

  return {};
};



function GiftDashboard() {
  const {
    user, 
    userUsers, 
    setUserUsers,
    userItems,
    setUserItems,
    setUserUsersLoaded, 
    userUsersLoaded,   
    userGroupedItems,
    setUserGroupedItems, 
  } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [groupedItemsLoading, setGroupedItemsLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(true);

  const [searchGroupedItems, setSearchGroupedItems] = useState(
    [] as Array<string>
  );
  const [searchItems, setSearchItems] = useState(
    [] as Array<string>
  );

  useEffect(() => {
    if (Object.keys(userGroupedItems).length === 0) {
      settingGroupedItems();
    } else {
      setGroupedItemsLoading(false);
      setSearchGroupedItems([...Object.keys(userGroupedItems)]);
    }
    if (Object.keys(userItems).length === 0) {
      settingItems();
    }
    else {
      setItemsLoading(false);
      setSearchItems([...Object.keys(userItems)]);
    }
  }, []);

  const settingGroupedItems = async () => {
    let groupedItems = await getGroupedItems(user);
    setUserGroupedItems(groupedItems);
    setSearchGroupedItems([...Object.keys(groupedItems)]);
    setGroupedItemsLoading(false);
  };
  const settingItems = async () => {
    let items = await getItems(user);
    setUserItems(items);
    setSearchItems([...Object.keys(items)])
    setItemsLoading(false);
  };

  const [giftDetails, setGiftDetails] = useState(
    undefined as undefined| userGroupedItem);

  const [seeDetails, setSeeDetails] = useState(false);
  
  const selectUserToEdit = (itemID: string) => {
        setGiftDetails(userGroupedItems[itemID]);
        setSeeDetails(true);
        
    };
  const handleReset = () => {
    setSeeDetails(false);
    setGiftDetails(undefined);
  }

  return (
    <Col>
      <Row>
        <Col className="page-header justify-content-center ">
          <h3>Gift Dashboard</h3>
        </Col>
      </Row>
      {seeDetails ? ( giftDetails ? (
        <Row className="m-4 p-2 detail-card">
          <Col className="detail-card-item p-3" xs="5"> 
            <img src={`${appSettings.pictureURL}/${giftDetails.mainPicture}`}
              alt={giftDetails.name}
              className={`gift-item-details-card-image`}></img> 
          </Col>
          <Col className="detail-card-item detail-card-item-details p-3">
            <h3>{giftDetails.name}</h3>
            <p className="description-title">Details:</p>
            <p>{giftDetails.description}</p>
            <p className="description-title">Items:</p>
            <ul>
            {giftDetails.itemsArray.map((itemID) => (
                <li>{userItems[itemID].name}</li>
              ))}
          </ul>
          </Col>
          <Col className="detail-card-item-close p-2" xs="1">
            <button
            className={`event-item-description-button new-event-button-red`}
            onClick={handleReset}
            >
            <CloseIcon />
            </button>
          </Col>
        </Row> ) : null
      ): null}
      <Row className="m-4 gift-packages">
        {/* <div className={`event-dashboard-sub-title primary-blue-dark-header`}>
          <span>Gift Packages</span>
        </div> */}

        {searchGroupedItems.map((itemID, iIndex) => (
          <GiftCard
                key={iIndex}
                index={iIndex}
                item={userGroupedItems[itemID]}
                action={() => selectUserToEdit(itemID)}
                class={"my-2"}
              />
        ))}
      </Row>
      {/* <Row className="m-4">
        <div className={`event-dashboard-sub-title primary-green-dark-header`}>
          <span>Gift Items</span>
        </div>
        {searchItems.map((itemID, iIndex) => (
          <p>{userItems[itemID].name}</p>
        <GiftCard
              key={iIndex}
              index={iIndex}
              item={userItems[itemID]}
              action={() => selectUserToEdit(itemID)}
              class={"my-2"}
            />
        ))}
      </Row> */}
    </Col>
  );
}

export default GiftDashboard;

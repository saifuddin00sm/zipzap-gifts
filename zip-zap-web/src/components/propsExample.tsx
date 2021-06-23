import React from "react";
import { fetchRequest } from "../App";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ExampleNewCampaign() {
  let names = [
    "Kevin Sites",
    "Krista Humphrey",
    "Victoria Black",
    "Kolby Beck",
  ];

  const handleNewCampaign = async () => {
    let campaignID = 4;
    // {
    //     "orderID":"501",
    //     "cost": 45,
    //     "shipping": "1153 north 240 east orem utah 84057",
    //     "giftee": 0,
    //     "campaignID": 123,
    //     "grouped": 23,
    //     "notes": "Thank you for being such an amazing employee, I really don't know how I could do it without you!",
    //     "shippingFee": 5.90
    //   }
    let userOrderDict = {} as any;

    let array = new Array(60) as any;
    let arrayPromise = [...array.keys()].map(async (person, pIndex) => {
      userOrderDict[pIndex] = {
        orderID: pIndex,
        shippingDate: await handleCalcShippingDate(
          { birthday: true },
          "3/16/21",
          { birthday: `${getRandomInt(1, 12)}/${getRandomInt(1, 28)}/21` }
        ),
        cost: 0,
        shippingAddress: "1153 north 240 east orem utah 84057", // or null if not different from giftee address
        giftee: getRandomInt(1, 5),
        campaignID: campaignID,
        groupedID: 5,
        giftID: null,
        notes:
          "Thank you for being such an amazing employee, I really don't know how I could do it without you!",
        shippingFee: 0,
        isActive: true,
        shipmentDetails: {},
        // shippingDate: `${getRandomInt(1, 12)}/${getRandomInt(1, 28)}/21`,
      };
    });

    let arrayResult = await Promise.all(arrayPromise);

    console.log("userOrderDict", userOrderDict);

    let currentOrders = await handleOrderSort(userOrderDict);

    console.log("ORDER", currentOrders);

    let newOrderList = await fetchRequest(
      { email: "kevinpsites@gmail.com" },
      `orders/${3}`,
      "POST",
      {
        orders: userOrderDict,
        currentOrderList: currentOrders,
      }
    );

    console.log("RESPONSE", newOrderList);
  };

  const handleOrderSort = async (orders: { [key: string]: any }) => {
    let today = new Date();

    let orderSort = Object.keys(orders).filter((order) => {
      if (
        today.getMonth() === new Date(orders[order].shippingDate).getMonth()
      ) {
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

  const handleUpdateOrder = async () => {
    let data = {
      orderID: 38,
      shippingDate: "3/21/21",
      cost: 0,
      shipping: "1153 north 240 east orem utah 84057",
      giftee: 4,
      campaignID: 3,
      groupedID: 23,
      giftID: null,
      notes:
        "Thank you for being such an amazing employee, I really don't know how I could do it without you!",
      shippingFee: 0,
      isActive: false,
    };

    let updateResponse = await fetchRequest(
      { email: "kevinpsites@gmail.com" },
      `orders/${data.campaignID}`,
      "PUT",
      {
        user: data,
      }
    );
  };

  const getLastSunday = () => {
    let date = new Date();
    let lastSunday = date.setDate(date.getDate() - date.getDay());

    let nextSunday = date.setDate(new Date(lastSunday).getDate() + 7);

    console.log("sun", new Date(lastSunday), new Date(nextSunday));
  };

  const getWeekCampaigns = async () => {
    let response = await fetchRequest(
      { email: "kevinpsites@gmail.com" },
      "admin/orders",
      "GET"
    );

    console.log("ORDER", response);
  };

  return (
    <div>
      <h2>I am the Prop container and below are my props</h2>
      <button onClick={handleNewCampaign}>New Campaign</button>
      <button onClick={handleUpdateOrder}>Update Order</button>
      <button onClick={getLastSunday}>Sunday</button>
      <button onClick={getWeekCampaigns}>Week Orders</button>
    </div>
  );
}

export default ExampleNewCampaign;

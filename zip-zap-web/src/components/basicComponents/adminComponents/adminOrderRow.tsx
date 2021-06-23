import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import {
  adminItem,
  adminOrder,
  shippoShipmentRate,
  userRecipient,
} from "../../../classes";
import { ReactComponent as BoxIcon } from "../../../icons/box.svg";
import { calcGiftPackageWeight } from "../../eventComponents/eventNew";
import AdminItemRow from "./adminItemRow";
import appSettings from "../../../appSettings.json";
import LoadingIcon from "../LoadingIcon";

const boxSizes = [
  {
    type: "1",
    width: "12",
    height: "13.5",
    depth: "5",
  },
  {
    type: "2",
    width: "6",
    height: "4",
    depth: "5",
  },
];
// props.action req = (type:string, item:adminItem, index:number)
function AdminOrderRow(props: {
  index: number;
  order: adminOrder;
  giftee: userRecipient;
  action: Function;
  allowMultiple: boolean;
  activeOrder: null | number;
  cardMode?: boolean;
  editing?: boolean;
  fulfill?: string; // accountID in adminAccounts
}) {
  const { adminItems, adminGroupedItems, adminAccounts } =
    useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [shipmentRates, setShipmentRates] = useState(
    // [
    //   {
    //     object_created: "2021-06-23T14:08:23.362Z",
    //     object_id: "0a78fed6fb604d0a9998f29ff68608a9",
    //     object_owner: "connect.zipzapgifts@gmail.com",
    //     shipment: "2aa6704e750d4280bae527363a89ac7e",
    //     attributes: ["CHEAPEST"],
    //     amount: "7.59",
    //     currency: "USD",
    //     amount_local: "7.59",
    //     currency_local: "USD",
    //     provider: "USPS",
    //     provider_image_75:
    //       "https://shippo-static.s3.amazonaws.com/providers/75/USPS.png",
    //     provider_image_200:
    //       "https://shippo-static.s3.amazonaws.com/providers/200/USPS.png",
    //     servicelevel: {
    //       name: "Parcel Select",
    //       token: "usps_parcel_select",
    //       terms: "",
    //     },
    //     estimated_days: 7,
    //     arrives_by: null,
    //     duration_terms: "Delivery in 2 to 8 days.",
    //     messages: [],
    //     carrier_account: "74841298ca2e4739880dbc0e336de9f5",
    //     test: true,
    //     zone: "1",
    //   },
    //   {
    //     object_created: "2021-06-23T14:08:23.363Z",
    //     object_id: "7a4e5d3c1e91467cb89e599de1f03b7d",
    //     object_owner: "connect.zipzapgifts@gmail.com",
    //     shipment: "2aa6704e750d4280bae527363a89ac7e",
    //     attributes: ["BESTVALUE"],
    //     amount: "7.79",
    //     currency: "USD",
    //     amount_local: "7.79",
    //     currency_local: "USD",
    //     provider: "USPS",
    //     provider_image_75:
    //       "https://shippo-static.s3.amazonaws.com/providers/75/USPS.png",
    //     provider_image_200:
    //       "https://shippo-static.s3.amazonaws.com/providers/200/USPS.png",
    //     servicelevel: {
    //       name: "Priority Mail",
    //       token: "usps_priority",
    //       terms: "",
    //     },
    //     estimated_days: 1,
    //     arrives_by: null,
    //     duration_terms:
    //       "Delivery within 1, 2, or 3 days based on where your package started and where it’s being sent.",
    //     messages: [],
    //     carrier_account: "74841298ca2e4739880dbc0e336de9f5",
    //     test: true,
    //     zone: "1",
    //   },
    //   {
    //     object_created: "2021-06-23T14:08:23.988Z",
    //     object_id: "b626b116de554ca6a224f1e2e39f8d30",
    //     object_owner: "connect.zipzapgifts@gmail.com",
    //     shipment: "2aa6704e750d4280bae527363a89ac7e",
    //     attributes: [],
    //     amount: "7.89",
    //     currency: "USD",
    //     amount_local: "7.89",
    //     currency_local: "USD",
    //     provider: "UPS",
    //     provider_image_75:
    //       "https://shippo-static.s3.amazonaws.com/providers/75/UPS.png",
    //     provider_image_200:
    //       "https://shippo-static.s3.amazonaws.com/providers/200/UPS.png",
    //     servicelevel: {
    //       name: "Ground",
    //       token: "ups_ground",
    //       terms: "",
    //     },
    //     estimated_days: 1,
    //     arrives_by: null,
    //     duration_terms:
    //       "Delivery times vary. Delivered usually in 1-5 business days.",
    //     messages: [],
    //     carrier_account: "b5e18aa50aef4adf89ef2592f8611c21",
    //     test: true,
    //     zone: null,
    //   },
    //   {
    //     object_created: "2021-06-23T14:08:23.990Z",
    //     object_id: "b0d7d9e1b08f4f0486c30cd8688e3fe0",
    //     object_owner: "connect.zipzapgifts@gmail.com",
    //     shipment: "2aa6704e750d4280bae527363a89ac7e",
    //     attributes: [],
    //     amount: "9.01",
    //     currency: "USD",
    //     amount_local: "9.01",
    //     currency_local: "USD",
    //     provider: "UPS",
    //     provider_image_75:
    //       "https://shippo-static.s3.amazonaws.com/providers/75/UPS.png",
    //     provider_image_200:
    //       "https://shippo-static.s3.amazonaws.com/providers/200/UPS.png",
    //     servicelevel: {
    //       name: "3 Day Select®",
    //       token: "ups_3_day_select",
    //       terms: "",
    //     },
    //     estimated_days: 3,
    //     arrives_by: null,
    //     duration_terms: "Delivery by the end of the third business day.",
    //     messages: [],
    //     carrier_account: "b5e18aa50aef4adf89ef2592f8611c21",
    //     test: true,
    //     zone: null,
    //   },
    //   {
    //     object_created: "2021-06-23T14:08:23.989Z",
    //     object_id: "26e4e7a98b66494298b2bda20e820798",
    //     object_owner: "connect.zipzapgifts@gmail.com",
    //     shipment: "2aa6704e750d4280bae527363a89ac7e",
    //     attributes: [],
    //     amount: "11.25",
    //     currency: "USD",
    //     amount_local: "11.25",
    //     currency_local: "USD",
    //     provider: "UPS",
    //     provider_image_75:
    //       "https://shippo-static.s3.amazonaws.com/providers/75/UPS.png",
    //     provider_image_200:
    //       "https://shippo-static.s3.amazonaws.com/providers/200/UPS.png",
    //     servicelevel: {
    //       name: "2nd Day Air®",
    //       token: "ups_second_day_air",
    //       terms: "",
    //     },
    //     estimated_days: 2,
    //     arrives_by: null,
    //     duration_terms: "Delivery by the end of the second business day.",
    //     messages: [],
    //     carrier_account: "b5e18aa50aef4adf89ef2592f8611c21",
    //     test: true,
    //     zone: null,
    //   },
    //   {
    //     object_created: "2021-06-23T14:08:23.988Z",
    //     object_id: "a18d48d9a0a047169181afc2a64830df",
    //     object_owner: "connect.zipzapgifts@gmail.com",
    //     shipment: "2aa6704e750d4280bae527363a89ac7e",
    //     attributes: [],
    //     amount: "16.68",
    //     currency: "USD",
    //     amount_local: "16.68",
    //     currency_local: "USD",
    //     provider: "UPS",
    //     provider_image_75:
    //       "https://shippo-static.s3.amazonaws.com/providers/75/UPS.png",
    //     provider_image_200:
    //       "https://shippo-static.s3.amazonaws.com/providers/200/UPS.png",
    //     servicelevel: {
    //       name: "Next Day Air Saver®",
    //       token: "ups_next_day_air_saver",
    //       terms: "",
    //     },
    //     estimated_days: 1,
    //     arrives_by: "15:00:00",
    //     duration_terms:
    //       "Next business day delivery by 3:00 or 4:30 p.m. for commercial destinations and by end of day for residentail destinations.",
    //     messages: [],
    //     carrier_account: "b5e18aa50aef4adf89ef2592f8611c21",
    //     test: true,
    //     zone: null,
    //   },
    //   {
    //     object_created: "2021-06-23T14:08:23.987Z",
    //     object_id: "9d5fa317dff9423d861e2c051cce0026",
    //     object_owner: "connect.zipzapgifts@gmail.com",
    //     shipment: "2aa6704e750d4280bae527363a89ac7e",
    //     attributes: [],
    //     amount: "21.30",
    //     currency: "USD",
    //     amount_local: "21.30",
    //     currency_local: "USD",
    //     provider: "UPS",
    //     provider_image_75:
    //       "https://shippo-static.s3.amazonaws.com/providers/75/UPS.png",
    //     provider_image_200:
    //       "https://shippo-static.s3.amazonaws.com/providers/200/UPS.png",
    //     servicelevel: {
    //       name: "Next Day Air®",
    //       token: "ups_next_day_air",
    //       terms: "",
    //     },
    //     estimated_days: 1,
    //     arrives_by: "10:30:00",
    //     duration_terms:
    //       "Next business day delivery by 10:30 a.m., 12:00 noon, or end of day, depending on destination.",
    //     messages: [],
    //     carrier_account: "b5e18aa50aef4adf89ef2592f8611c21",
    //     test: true,
    //     zone: null,
    //   },
    //   {
    //     object_created: "2021-06-23T14:08:23.364Z",
    //     object_id: "90ed9660adb640758e974eed4381d707",
    //     object_owner: "connect.zipzapgifts@gmail.com",
    //     shipment: "2aa6704e750d4280bae527363a89ac7e",
    //     attributes: [],
    //     amount: "23.25",
    //     currency: "USD",
    //     amount_local: "23.25",
    //     currency_local: "USD",
    //     provider: "USPS",
    //     provider_image_75:
    //       "https://shippo-static.s3.amazonaws.com/providers/75/USPS.png",
    //     provider_image_200:
    //       "https://shippo-static.s3.amazonaws.com/providers/200/USPS.png",
    //     servicelevel: {
    //       name: "Priority Mail Express",
    //       token: "usps_priority_express",
    //       terms: "",
    //     },
    //     estimated_days: 2,
    //     arrives_by: null,
    //     duration_terms: "Overnight delivery to most U.S. locations.",
    //     messages: [],
    //     carrier_account: "74841298ca2e4739880dbc0e336de9f5",
    //     test: true,
    //     zone: "1",
    //   },
    //   {
    //     object_created: "2021-06-23T14:08:23.986Z",
    //     object_id: "808221a53d0b4b2fb950e08bbdf1280c",
    //     object_owner: "connect.zipzapgifts@gmail.com",
    //     shipment: "2aa6704e750d4280bae527363a89ac7e",
    //     attributes: ["FASTEST"],
    //     amount: "51.30",
    //     currency: "USD",
    //     amount_local: "51.30",
    //     currency_local: "USD",
    //     provider: "UPS",
    //     provider_image_75:
    //       "https://shippo-static.s3.amazonaws.com/providers/75/UPS.png",
    //     provider_image_200:
    //       "https://shippo-static.s3.amazonaws.com/providers/200/UPS.png",
    //     servicelevel: {
    //       name: "Next Day Air® Early",
    //       token: "ups_next_day_air_early_am",
    //       terms: "",
    //     },
    //     estimated_days: 1,
    //     arrives_by: "08:30:00",
    //     duration_terms:
    //       "Next business day delivery by 8:30 a.m., 9:00 a.m., or 9:30 a.m. ",
    //     messages: [],
    //     carrier_account: "b5e18aa50aef4adf89ef2592f8611c21",
    //     test: true,
    //     zone: null,
    //   },
    // ] as Array<shippoShipmentRate>
    [] as Array<shippoShipmentRate>
  );
  const [shipmentItem, setShipmentItem] = useState({} as any);
  const [shipmentTransaction, setShipmentTransaction] = useState({
    parcel: "",
    tracking: "",
    labelURL: "",
  } as {
    parcel: "";
    tracking: "";
    labelURL: "";
  });

  const [boxSelection, setBoxSelection] = useState("1");
  const [customBoxDimensions, setCustomBoxDimensions] = useState({
    type: "custom",
    width: "0",
    height: "0",
    depth: "0",
  });

  const changeBoxDimensions = (type: string, e: any) => {
    if (type === "width") {
      customBoxDimensions.width = e.target.value;
    } else if (type === "height") {
      customBoxDimensions.height = e.target.value;
    } else if (type === "depth") {
      customBoxDimensions.depth = e.target.value;
    }

    setCustomBoxDimensions({ ...customBoxDimensions });
  };

  const handleCreateShippingObject = async () => {
    if (
      props.fulfill !== undefined &&
      adminAccounts.length > 0 &&
      props.order.groupedID
    ) {
      setLoading(true);
      let accountID = parseInt(props.fulfill);
      let accounts = adminAccounts.filter(
        (account) => account.accountID === accountID
      );

      if (accounts.length === 0) {
        // TO-DO - Handle Error
        return false;
      }

      let account = accounts[0];
      let giftee = props.giftee;
      let gift = adminGroupedItems[props.order.groupedID];
      let box =
        boxSelection === "custom"
          ? customBoxDimensions
          : boxSizes[parseInt(boxSelection) - 1];

      let weight = calcGiftPackageWeight(gift, adminItems);

      let shipmentObject = {
        address_to: {
          name: `${giftee["First Name"]} ${giftee["Last Name"]}`,
          street1: "1153 North 240 East",
          city: "Orem",
          state: giftee.State,
          zip: giftee.Zip,
          country: "US",
        },
        address_from: {
          name: account.name,
          street1: account.address,
          city: account.city,
          state: account.state,
          zip: account.zip,
          country: "US",
        },
        parcels: [
          {
            length: box.depth,
            width: box.width,
            height: box.height,
            distance_unit: "in",
            weight: weight.toString(),
            mass_unit: "oz",
          },
        ],
        async: false,
      };

      let shippo = await fetch("https://api.goshippo.com/shipments/", {
        headers: {
          Authorization: `ShippoToken ${appSettings.shippoKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shipmentObject),
        method: "POST",
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          return { error: err };
        });

      if (shippo.error) {
        // To-DO - Handle Error
        setLoading(false);
        return;
      }
      setShipmentItem(shippo);
      setShipmentRates(
        shippo.rates.sort(
          (a: shippoShipmentRate, b: shippoShipmentRate) =>
            parseFloat(a.amount) - parseFloat(b.amount)
        )
      );
      setLoading(false);
      // console.log("SHIPP", shippo);
    }
  };

  const [shipoRateSelection, setShipoRateSelection] = useState(
    null as null | number
  );
  const [error, setError] = useState("");

  const handleCreateShipmentTransaction = async () => {
    if (shipoRateSelection === null) {
      setError("Please Select a Shipping Option");
      return;
    } else {
      setError("");
    }

    setLoading(true);

    let rateObject = shipmentRates[shipoRateSelection];

    let shippoTransaction = await fetch(
      "https://api.goshippo.com/transactions",
      {
        headers: {
          Authorization: `ShippoToken ${appSettings.shippoKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rate: rateObject.object_id,
          label_file_type: "PDF",
          async: false,
        }),
        method: "POST",
      }
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return { error: err };
      });

    if (shippoTransaction.error) {
      // To-DO - Handle Error
      setLoading(false);
      return;
    }

    // GET tracking number  - tracking_number
    // parcel number - parcel
    // label URL - label_url

    // TO-DO - Show Selected Rate

    setShipmentTransaction({
      parcel: shippoTransaction.parcel,
      tracking: shippoTransaction.tracking_number,
      labelURL: shippoTransaction.label_url,
    });

    props.order.shippingDetails = {
      parcelNumber: shippoTransaction.parcel,
      trackingNumber: shippoTransaction.tracking_number,
      labelURL: shippoTransaction.label_url,
      fulfillmentDate: new Date().toUTCString(),
      shippmentDate: "",
    };

    // TO-DO - Endpoint to add order details to DB and list

    // TO-DO - Show Success Message and close Order

    setLoading(false);
    console.log("rate", rateObject.object_id, shippoTransaction);
  };

  return !props.cardMode ? (
    <tr>
      {props.allowMultiple ? (
        <td className={`admin-order-button`}>
          <input
            type={"checkbox"}
            onClick={() => props.action("select", props.index)}
          ></input>
        </td>
      ) : null}
      <td data-label="Order #">
        {props.order.campaignID}-{props.order.orderID}
      </td>
      <td data-label="Shipping Date">
        {new Date(props.order.shippingDate).toDateString()}
      </td>
      <td data-label="Shipping Address">
        {" "}
        {props.giftee && "Address" in props.giftee
          ? props.giftee.Address
          : props.order.shippingAddress}
      </td>
      <td data-label="Giftee Name">
        {" "}
        {props.giftee
          ? `${props.giftee["First Name"]} ${props.giftee["Last Name"]}`
          : "N/A"}
      </td>
      <td data-label="Gift">
        {" "}
        {props.order.giftID && props.order.giftID in adminItems
          ? adminItems[props.order.giftID].name
          : props.order.groupedID && props.order.groupedID in adminGroupedItems
          ? adminGroupedItems[props.order.groupedID].name
          : "N/A"}
      </td>
      <td data-label="Campaign">{props.order.campaignName}</td>
      <td className={`admin-order-button`}>
        {" "}
        <button
          className={`general-button admin-button`}
          onClick={() => props.action("orderDetails", props.index)}
          // disabled={!props.item.isActive}
        >
          Order Details
        </button>
        {/* <button
          className={`general-button admin-button`}
          onClick={() => setEditing(true)}
          // disabled={!props.item.isActive}
        >
          Print Slip
        </button> */}
        <button
          className={`general-button admin-button`}
          onClick={() => props.action("fulfillOrder", props.index)}
          // disabled={!props.item.isActive}
        >
          Fulfill Order
        </button>
      </td>

      {/* {props.activeOrder !== null ? (
        <tr>
          <th scope="col" rowSpan={2}>
            Details
          </th>
          <td data-label="Body">{props.order.campaignName}</td>
        </tr>
      ) : null} */}

      {/* <td data-label="Giftee Name">03/01/2016 - 03/31/2016</td> */}
    </tr>
  ) : (
    <div
      className={`column center item-card-container ${
        !props.order.isActive ? "item-card-container-inactive" : ""
      }`}
    >
      {loading ? <LoadingIcon /> : null}
      <h3>
        {props.fulfill ? "Fulfill " : ""}Order #{props.order.campaignID}-
        {props.order.orderID} {!props.order.isActive ? ` - INACTIVE` : ""}
      </h3>

      <div className={`item-card-body`}>
        <p>
          Shipping Date: {new Date(props.order.shippingDate).toDateString()}
        </p>
        <p>
          Shipping Address:{" "}
          {props.giftee && "Address" in props.giftee
            ? props.giftee.Address
            : props.order.shippingAddress}
        </p>
        <p>
          Giftee Name:{" "}
          {props.giftee
            ? `${props.giftee["First Name"]} ${props.giftee["Last Name"]}`
            : "N/A"}
        </p>
        <p>
          <span>
            Gift Name:{" "}
            {props.order.giftID && props.order.giftID in adminItems
              ? adminItems[props.order.giftID].name
              : props.order.groupedID &&
                props.order.groupedID in adminGroupedItems
              ? adminGroupedItems[props.order.groupedID].name
              : "N/A"}
          </span>
          <p>
            <span>Items Details:</span>
            {props.order.giftID && props.order.giftID in adminItems
              ? adminItems[props.order.giftID].description
              : props.order.groupedID &&
                props.order.groupedID in adminGroupedItems
              ? adminGroupedItems[props.order.groupedID].itemsArray.map(
                  (itemID, iIndex) => (
                    <AdminItemRow
                      key={iIndex}
                      index={iIndex}
                      item={adminItems[itemID]}
                      // item={adminItems.find((item, index) => item.itemID === itemIndex)}
                      type={""}
                      action={() => null}
                    />
                  )
                )
              : "N/A"}
          </p>
        </p>
        <p>Campaign: {props.order.campaignName}</p>
        <p>Note: {props.order.notes}</p>
      </div>

      {props.fulfill ? (
        <div className={`column column-center`}>
          <div className={`row`}>
            <button
              className={`column center admin-shipping-icons-button admin-shipping-icons-1 ${
                boxSelection === "1" ? "admin-shipping-icons-active " : ""
              }`}
              onClick={() => setBoxSelection("1")}
              disabled={shipmentRates.length > 0}
            >
              <BoxIcon />
              <span>Box 1</span>
              <span>12”x 13.5” 5” deep </span>
            </button>
            <button
              className={`column center admin-shipping-icons-button admin-shipping-icons-2 ${
                boxSelection === "2" ? "admin-shipping-icons-active " : ""
              }`}
              onClick={() => setBoxSelection("2")}
              disabled={shipmentRates.length > 0}
            >
              <BoxIcon />
              <span>Box 2</span>
              <span>6”x4” 5” deep </span>
            </button>
            <button
              className={`column center admin-shipping-icons-button admin-shipping-icons-custom ${
                boxSelection === "custom" ? "admin-shipping-icons-active " : ""
              }`}
              onClick={() => setBoxSelection("custom")}
              disabled={shipmentRates.length > 0}
            >
              <BoxIcon />
              Custom Box
            </button>
          </div>
          {boxSelection === "custom" ? (
            <div>
              <span>
                {" "}
                <label>Width (in)</label>
                <input
                  type={"number"}
                  value={customBoxDimensions.width}
                  onChange={(e: any) => changeBoxDimensions("width", e)}
                ></input>
              </span>

              <span>
                {" "}
                <label>Height (in)</label>
                <input
                  type={"number"}
                  value={customBoxDimensions.height}
                  onChange={(e: any) => changeBoxDimensions("height", e)}
                ></input>
              </span>

              <span>
                {" "}
                <label>Depth (in)</label>
                <input
                  type={"number"}
                  value={customBoxDimensions.depth}
                  onChange={(e: any) => changeBoxDimensions("depth", e)}
                ></input>
              </span>
            </div>
          ) : null}
          <br></br>
          {shipmentTransaction.labelURL ? null : shipmentRates.length > 0 ? (
            <div className={`column`}>
              <h3>Choose A Rate</h3>

              <div className={`row row-wrap`}>
                {shipmentRates.map((rate, rIndex) => (
                  <button
                    key={rIndex}
                    className={`column center shipment-rate-button-container`}
                    onClick={() => setShipoRateSelection(rIndex)}
                  >
                    <span>
                      <img
                        src={rate.provider_image_75}
                        alt={rate.provider}
                      ></img>
                    </span>
                    <span
                      className={`column shipment-rate-button-text-container`}
                    >
                      <span>{rate.provider}</span>
                      <span>Cost: ${rate.amount}</span>
                      <span>Shipping Type: {rate.servicelevel.name}</span>
                      <span>{rate.duration_terms}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className={`row center`}>
              <button
                className={`general-button admin-button`}
                onClick={handleCreateShippingObject}
                // disabled={!props.item.isActive}
              >
                Get Shipping Options
              </button>
            </div>
          )}

          {loading ? (
            <LoadingIcon />
          ) : shipoRateSelection !== null && !shipmentTransaction.labelURL ? (
            <div className={`row center`}>
              <button
                className={`general-button admin-button`}
                onClick={handleCreateShipmentTransaction}
                // disabled={!props.item.isActive}
              >
                Finalize Shipment and Fulfill Order
              </button>
            </div>
          ) : shipmentTransaction.labelURL ? (
            <div className={`row center`}>
              <a
                className={`general-button admin-button`}
                href={shipmentTransaction.labelURL}
                target={"_blank"}
                // disabled={!props.item.isActive}
              >
                Print Shipment Label
              </a>
              <button
                className={`general-button admin-button`}
                onClick={() => props.action("orderDetailsClose", props.index)}
                // disabled={!props.item.isActive}
              >
                Close Order Details
              </button>
            </div>
          ) : null}

          {/* <button
        className={`general-button admin-button`}
        onClick={() => setEditing(true)}
        // disabled={!props.item.isActive}
      >
        Print Slip
      </button> */}
          {/* <button
        className={`general-button admin-button`}
        onClick={() => props.action("fulfillOrder", props.index)}
        // disabled={!props.item.isActive}
      >
        Fulfill Order
      </button> */}
        </div>
      ) : (
        <div className={`row center space-between`}>
          <button
            className={`general-button admin-button`}
            onClick={() => props.action("orderDetailsClose", props.index)}
            // disabled={!props.item.isActive}
          >
            Close Order Details
          </button>
          {/* <button
        className={`general-button admin-button`}
        onClick={() => setEditing(true)}
        // disabled={!props.item.isActive}
      >
        Print Slip
      </button> */}
          <button
            className={`general-button admin-button`}
            onClick={() => props.action("fulfillOrder", props.index)}
            // disabled={!props.item.isActive}
          >
            Fulfill Order
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminOrderRow;

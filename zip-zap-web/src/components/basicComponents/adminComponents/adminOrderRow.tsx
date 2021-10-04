import React, { useContext, useState } from "react";
import { fetchRequest, UserContext } from "../../../App";
import {
  adminOrder,
  shippoShipmentRate,
  userRecipient,
} from "../../../classes";
import { ReactComponent as BoxIcon } from "../../../icons/box.svg";
import { calcGiftPackageWeight } from "../../eventComponents/eventNew";
import AdminItemRow from "./adminItemRow";
import appSettings from "../../../appSettings.json";
import LoadingIcon from "../LoadingIcon";
// import { setegid } from "node:process";

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
  const { adminItems, adminGroupedItems, adminAccounts, user } =
    useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [shipmentRates, setShipmentRates] = useState(
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
          street1: giftee.Address,
          city: giftee.City,
          state: giftee.State,
          zip: giftee.Zip,
          country: "US",
        },
        address_from: {
          name: appSettings.hqAddress.name,
          street1: appSettings.hqAddress.address,
          city: appSettings.hqAddress.city,
          state: appSettings.hqAddress.state,
          zip: appSettings.hqAddress.zip,
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

      let shippo = await fetchRequest(
        user,
        "admin/shipmentRates",
        "POST",
        shipmentObject
      );

      // let shippo = await fetch("https://api.goshippo.com/shipments/", {
      //   headers: {
      //     Authorization: `ShippoToken ${appSettings.shippoKey}`,
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(shipmentObject),
      //   method: "POST",
      // })
      //   .then((res) => {
      //     return res.json();
      //   })
      //   .catch((err) => {
      //     return { error: err };
      //   });

      if (shippo.error) {
        // To-DO - Handle Error
        setLoading(false);
        return;
      }

      setShipmentItem(shippo);
      console.log("RA", shippo);

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
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateShipmentTransaction = async () => {
    if (shipoRateSelection === null) {
      setError("Please Select a Shipping Option");
      return;
    } else {
      setError("");
    }

    setLoading(true);

    let rateObject = shipmentRates[shipoRateSelection];

    let shippoTransaction = await fetchRequest(
      user,
      "admin/completeTransaction",
      "POST",
      {
        rate: rateObject.object_id,
        label_file_type: "PDF",
        async: false,
      }
    );

    if (shippoTransaction.error) {
      // To-DO - Handle Error
      setError("Error with shipment, please try again later");
      setLoading(false);
      return;
    }

    // GET tracking number  - tracking_number
    // parcel number - parcel
    // label URL - label_url
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

    props.order.shippingFee = parseFloat(rateObject.amount);

    // TO-DO - Endpoint to add order details to DB and list
    let orderUpdateResponse = await fetchRequest(
      user,
      "orders/fulfill",
      "PUT",
      {
        user: props.order,
      }
    );

    if (orderUpdateResponse.error) {
      // TO-DO - Handle Error
      setError("Error with shipment, please try again later");
      setLoading(false);
      return;
    }

    // TO-DO - Show Success Message and close Order
    setSuccessMessage("Shipment Fulfilled, Please Print the Shipment Label.");
    setLoading(false);
  };

  return !props.cardMode ? (
    <tr
      className={`${
        props.order.shippingDetails &&
        props.order.shippingDetails.fulfillmentDate
          ? "admin-order-fulfilled"
          : ""
      }`}
    >
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
        <button
          className={`general-button admin-button`}
          onClick={() => props.action("fulfillOrder", props.index)}
          // disabled={!props.item.isActive}
        >
          {props.order.shippingDetails &&
          props.order.shippingDetails.fulfillmentDate
            ? "Fulfillment Details"
            : "Fulfill Order"}
        </button>
      </td>
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

      {error ? (
        <span>{error}</span>
      ) : successMessage ? (
        <span>{successMessage}</span>
      ) : null}
      <br></br>
      {props.order.shippingDetails &&
      props.order.shippingDetails.fulfillmentDate ? (
        <div className={`column`}>
          <span>
            Order Fulfilled @{props.order.shippingDetails.fulfillmentDate}
          </span>

          <div className={`row center`}>
            <a
              className={`general-button admin-button`}
              href={props.order.shippingDetails.labelURL}
              target={"_blank"}
              rel="noreferrer"
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
        </div>
      ) : props.fulfill ? (
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
                    className={`column center shipment-rate-button-container ${
                      shipoRateSelection === rIndex
                        ? "shipment-rate-button-container-active"
                        : ""
                    }`}
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
                rel="noreferrer"
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
          ) : (
            <button
              className={`general-button admin-button`}
              onClick={() => props.action("orderDetailsClose", props.index)}
              // disabled={!props.item.isActive}
            >
              Close Order Details
            </button>
          )}
          {error ? (
            <span>{error}</span>
          ) : successMessage ? (
            <span>{successMessage}</span>
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
            {props.order.shippingDetails
              ? "Fulfillment Details"
              : "Fulfill Order"}
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminOrderRow;

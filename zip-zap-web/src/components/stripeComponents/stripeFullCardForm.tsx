import React, { useContext, useEffect, useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import LoadingIcon from "../basicComponents/LoadingIcon";
import { fetchRequest, UserContext } from "../../App";
import { Link } from "react-router-dom";

const StripeFullCardForm = (props: {
  buttonType?: string;
  redirectURL?: string;
}) => {
  const { user } = useContext(UserContext);
  const stripe = useStripe();
  const elements = useElements();

  const [customerSecret, setCustomerSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const [cardDetails, setCardDetails] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleSubmit = async (event: any) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (!cardDetails.name) {
      setError("Please Enter a Name");
      return;
    } else if (!cardDetails.address) {
      setError("Please Enter an Address");
      return;
    } else if (!cardDetails.city) {
      setError("Please Enter a City");
      return;
    } else if (!cardDetails.state) {
      setError("Please Enter a State (i.e. UT)");
      return;
    } else if (!cardDetails.zip) {
      setError("Please Enter a Zip Code");
      return;
    } else {
      setError("");
    }

    setStripeLoading(true);

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    console.log("c", cardNumberElement, cardExpiryElement, cardCvcElement);

    const result = await stripe.confirmCardSetup(customerSecret, {
      payment_method: {
        card: cardNumberElement ? cardNumberElement : { token: "" },
        billing_details: {
          name: cardDetails.name,
          address: {
            line1: cardDetails.address,
            city: cardDetails.city,
            state: cardDetails.state,
            postal_code: cardDetails.zip,
            country: "US",
          },
        },
      },
    });

    console.log("res", result);
    setStripeLoading(false);
    if (result.error) {
      // Display result.error.message in your UI.
      setError(
        result.error.message
          ? result.error.message
          : "Error Please Refresh the Page"
      );
    } else {
      setSuccessMessage("Card Added Successfully!");
      // The setup has succeeded. Display a success message and send
      // result.setupIntent.payment_method to your server to save the
      // card to a Customer
    }
  };

  const getCustomerSecret = async () => {
    let response = await fetchRequest(user, "payment/addCard", "GET");

    if (response.error || response.message) {
      // TO-DO - Handle Errors
      setLoading(false);
      return;
    }

    if (response.customerSecret) {
      setCustomerSecret(response.customerSecret);
    }

    setLoading(false);

    return;
  };

  const handleInputChange = (type: string, e: any) => {
    if (type === "name") {
      cardDetails.name = e.target.value;
    } else if (type === "address") {
      cardDetails.address = e.target.value;
    } else if (type === "city") {
      cardDetails.city = e.target.value;
    } else if (type === "state") {
      cardDetails.state = e.target.value;
    } else if (type === "zip") {
      cardDetails.zip = e.target.value;
    }

    setCardDetails({ ...cardDetails });
  };

  useEffect(() => {
    if (!customerSecret) {
      getCustomerSecret();
    }
  }, []);

  return loading ? (
    <LoadingIcon />
  ) : successMessage ? (
    <div className={`column center full-width`}>
      <span>{successMessage}</span>
      <Link
        to={props.redirectURL ? props.redirectURL : "/"}
        className={`back-link`}
      >
        Return to Previous Page
      </Link>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit}
      className={`stripe-card-input-form full-width column center-column`}
    >
      <input
        placeholder={"Name on Card"}
        className={`stripe-card-input-field`}
        value={cardDetails.name}
        onChange={(e: any) => handleInputChange("name", e)}
        disabled={stripeLoading}
      ></input>
      <CardNumberElement className={`stripe-card-input-field`} />
      <CardExpiryElement className={`stripe-card-input-field`} />
      <CardCvcElement className={`stripe-card-input-field`} />
      <br></br>

      <div className={`event-dashboard-sub-title stripe-card-input-header row`}>
        <strong>Billing Info</strong>
      </div>
      <input
        placeholder={"Street Address"}
        className={`stripe-card-input-field`}
        value={cardDetails.address}
        onChange={(e: any) => handleInputChange("address", e)}
        disabled={stripeLoading}
      ></input>
      <input
        placeholder={"City"}
        className={`stripe-card-input-field`}
        value={cardDetails.city}
        onChange={(e: any) => handleInputChange("city", e)}
        disabled={stripeLoading}
      ></input>
      <input
        placeholder={"State (i.e. UT)"}
        className={`stripe-card-input-field`}
        value={cardDetails.state}
        onChange={(e: any) => handleInputChange("state", e)}
        disabled={stripeLoading}
        maxLength={2}
      ></input>
      <input
        placeholder={"Zip Code"}
        className={`stripe-card-input-field`}
        value={cardDetails.zip}
        onChange={(e: any) => handleInputChange("zip", e)}
        disabled={stripeLoading}
        maxLength={5}
      ></input>
      {/* <CardElement /> */}

      <p>
        By pressing on the button below you agree to pay all charges that will
        be added to your account whether one-time or subscription.
        <br></br>
        <br></br>In order to cancel charges you must request to cancel before
        your gifts ship or your current month is over.
        <br></br>
        <br></br>
        If you have any questions please contact our support team.
      </p>
      <span>{error ? error : ""}</span>

      <br></br>
      <button
        type="submit"
        disabled={!stripe || stripeLoading}
        className={`new-event-button new-event-button-green`}
      >
        <strong>
          {props.buttonType === "add" ? "Add New Card" : "Confirm Purchase"}
        </strong>
      </button>
    </form>
  );
};

export default StripeFullCardForm;

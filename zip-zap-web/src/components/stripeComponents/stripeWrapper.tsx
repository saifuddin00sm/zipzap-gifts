import React from "react";
import appSettings from "../../appSettings.json";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(appSettings.stripeKey);

function StripeWrapper(props: { children?: any }) {
  return (
    <Elements stripe={stripePromise}>
      {props.children ? props.children : <CheckoutForm />}
    </Elements>
  );
}

export default StripeWrapper;

import { useState, useCallback } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

// A hook that gives back a function to submit filled out
// Payment information to the Stripe system so we can charge them later.
// Must be used in a component that is wrapped in the Elements component.
const usePayment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");

  const submit = useCallback(async () => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const response = await stripe.confirmSetup({
      elements,
      redirect: "if_required", // Prevents redirects from Zip Zap for credit cards
      confirmParams: {
        // TODO: We need to save the user's state so that if they're redirected back
        // to this location after authorizing payment it will pick up where they left off.
        // We don't have to worry about this until we support more payment methods than credit card.
        return_url: window.location.href,
      },
    });
    const { error, setupIntent: { payment_method } = {} } = response;

    if (error) {
      setErrorMessage(error.message);
    }
    return { error, paymentID: payment_method };
  }, [elements, stripe]);

  return { submit, errorMessage };
};

export default usePayment;

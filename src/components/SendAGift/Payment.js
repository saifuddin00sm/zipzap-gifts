import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { Auth } from "@aws-amplify/auth";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import usePayment from "../../hooks/usePayment";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

// TODO: Get this from env
const stripePromise = loadStripe(
  "pk_test_51HnY3pDT2m7Y85adloVaCn3sNJsUlm2utxtogULtFB14sb9jDQgcMhDtoGLLMucTX0iLvXwXIBcLesCUOebXBOaS00CzaWNb28"
);

// A helper component that has to be a child of Elements so that the usePayment
// hook can properly access the stripe and elements hooks.
const Submit = ({ setErrorMessage }) => {
  const { submit, errorMessage } = usePayment();
  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(errorMessage);
    }
  }, [errorMessage, setErrorMessage]);

  useEffect(() => {
    if (submit) {
      submit();
    }
  }, [submit]);

  return null;
};

const Payment = ({ callSubmit }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getSecret = async () => {
      try {
        const currentSession = await Auth.currentSession();
        const accessToken = currentSession.getAccessToken();
        const token = accessToken.getJwtToken();
        const response = await API.post("stripe", "/secret", {
          body: { token },
        });
        setClientSecret(response.clientSecret);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Cannot collect Payment Information at this time");
      }
    };

    getSecret();
  }, []);

  if (errorMessage) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  if (!clientSecret) {
    return <CircularProgress />;
  }

  const options = {
    clientSecret,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentElement />
      {callSubmit && <Submit setErrorMessage={setErrorMessage} />}
    </Elements>
  );
};

export default Payment;

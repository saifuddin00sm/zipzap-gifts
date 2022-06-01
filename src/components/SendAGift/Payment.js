import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useQuery } from "react-query";
import { getUser } from "../../graphql/queries";
import { useOutletContext } from "react-router-dom";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

// TODO: Get this from env
const stripePromise = loadStripe(
  "pk_test_51HnY3pDT2m7Y85adloVaCn3sNJsUlm2utxtogULtFB14sb9jDQgcMhDtoGLLMucTX0iLvXwXIBcLesCUOebXBOaS00CzaWNb28"
);

const Payment = () => {
  const [user] = useOutletContext();
  const [clientSecret, setClientSecret] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { isLoading, isError, data, error } = useQuery("user", () =>
    API.graphql(graphqlOperation(getUser, { id: user.username }))
  );
  const { data: { getUser: { name, stripeID } = {} } = {} } = data || {};

  useEffect(() => {
    const getSecret = async () => {
      try {
        // TODO: REMOVE THIS LINE
        const customerID = "cus_LnJhdY7DreukGt";
        const response = await API.post("stripe", "/secret", {
          body: { name, customerID },
        });
        // TODO: Remove
        console.log(response);
        setClientSecret(response.clientSecret);
        setErrMsg("");
      } catch (error) {
        // TODO: REMOVE THIS LINE
        console.log(error);
        setErrMsg("Cannot collect Payment Information at this time");
      }
    };

    if (name || stripeID) {
      getSecret();
    }
  }, [name, stripeID]);

  if (isError || errMsg) {
    return <Alert severity="error">{error?.toString() || errMsg}</Alert>;
  }

  if (isLoading || !clientSecret) {
    return <CircularProgress />;
  }

  const options = {
    clientSecret,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentElement />
    </Elements>
  );
};

export default Payment;

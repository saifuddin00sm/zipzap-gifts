import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { Auth } from "@aws-amplify/auth";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import usePayment from "../../hooks/usePayment";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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

const CreditCards = ({ cards }) => {
  return (
    <Box>
      <Typography variant="h6">Choose Credit Card</Typography>
      <Box className="credit_cards">
        <Box className="inner_card">
          {cards.map(({ isSelected, id, name, last4, exp_month, exp_year }) => (
            <Box key={id} className="credit_card">
              <Box
                className="card_top"
                sx={{ background: isSelected ? "#F1F1F1" : "#C5D6E2" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "right",
                    textTransform: "capitalize",
                  }}
                >
                  Credit Card
                </Typography>
              </Box>
              <Box
                className="card_bottom"
                sx={{ background: isSelected ? "#DEDEDE" : "#ABC4D6" }}
              >
                <Typography variant="h6">Ending In {last4}</Typography>
                <Typography variant="body2">
                  Exp: {exp_month}/{exp_year}
                </Typography>
                <Typography variant="body2">{name}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Button variant="outlined">Add New Card</Button>
      </Box>
    </Box>
  );
};

const Payment = ({ callSubmit }) => {
  const [loadingCards, setLoadingCards] = useState(true);
  const [cards, setCards] = useState([]);
  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getSecret = async () => {
      try {
        const currentSession = await Auth.currentSession();
        const accessToken = currentSession.getAccessToken();
        const token = accessToken.getJwtToken();
        const response = await API.post("stripe", "/payments", {
          body: { token },
        });
        setCards(Object.values(response));
      } catch (error) {
        // Ignoring the error and falling back to having the user submit new payment information
      }
      setLoadingCards(false);
    };

    getSecret();
  }, []);

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

  if (loadingCards) {
    return <CircularProgress />;
  }

  if (cards.length > 0) {
    return <CreditCards cards={cards} />;
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

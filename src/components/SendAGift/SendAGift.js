import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { parseISO, addDays } from "date-fns";
import { useQuery } from "react-query";
import { getOrder } from "../../graphql/queries";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GiftDetails from "./GiftDetails";
import ChooseRecipient from "./ChooseRecipient";
import Checkout from "./Checkout";
import SuccessModal from "./SuccessModal";
import GiftStepper from "./GiftStepper";
import InfoIcon from "@mui/icons-material/Info";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import SelectGifts from "./SelectGifts";
import { Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useReward } from "react-rewards";
import { useOrders } from "../../hooks/orders";

const Root = styled("div")(({ theme }) => ({
  background: "#ABC4D6",
  padding: "20px 50px 50px",
  [theme.breakpoints.down("md")]: {
    padding: "25px",
  },
  "& .innerBox": {
    "& .heading": {
      "& > h6": {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "35px",
        lineHeight: "52px",
        textTransform: "capitalize",

        color: "#FFFFFF",
      },
      backgroundColor: "#343436",
      padding: "10px",
      textAlign: "center",
    },
    "& .box_contents": {
      "& .topItems": {
        margin: "5px 0px 41px 0",
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        width: "100%",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
        },
      },
      "& .infoBox": {
        padding: "10px",
        background: "#FFFFFF",
        border: "1px solid #000000",
        maxWidth: "475px",
        width: "100%",
        "& p": {
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "21px",
          letterSpacing: "0.03em",
          color: "#6D6E70",
        },
      },
      background: "#ffff",
      padding: "20px",
    },
  },
}));

const steps = [
  "Choose a Gift",
  "Gift Details",
  "Choose Recipients",
  "Check Out",
];

const initialState = {
  giftID: "",
  giftImage: "",
  giftPrice: 0,
  name: "",
  note: "",
  to: addDays(new Date(), 7),
  from: addDays(new Date(), 7),
  orderType: "ONE_TIME",
  orderDateType: "",
  recipients: [],
  totalPrice: "",
  shippingAddressType: "RECIPIENT_ADDRESS",
  paymentID: "",
  canScheduleImmediately: false,
  noShippingFee: false,
};

const StepComponent = ({
  activeStep,
  giftSearch,
  formState,
  setInput,
  handleNext,
  submitPayment,
  setSubmitPayment,
  setSuccess,
}) => {
  let component = null;
  switch (activeStep) {
    case 0:
      component = (
        <SelectGifts
          giftSearch={giftSearch}
          selectedGift={formState.giftID}
          setSelectedGift={(gift) => {
            setInput("gift", gift);
            handleNext();
          }}
        />
      );
      break;
    case 1:
      component = <GiftDetails {...formState} setInput={setInput} />;
      break;
    case 2:
      component = (
        <ChooseRecipient
          selectedRecipients={formState.recipients}
          setRecipients={(recipients) => setInput("recipients", recipients)}
          orderDateType={formState.orderDateType}
        />
      );
      break;
    case 3:
    default:
      component = (
        <Checkout
          recipientCount={formState.recipients.length}
          giftImage={formState.giftImage}
          giftPrice={formState.giftPrice}
          paymentID={formState.paymentID}
          shippingAddressType={formState.shippingAddressType}
          noShippingFee={formState.noShippingFee}
          setInput={setInput}
          submitPayment={submitPayment}
          setSubmitPayment={setSubmitPayment}
          setSuccess={setSuccess}
        />
      );
      break;
  }
  return component;
};

const SendAGift = () => {
  const top = useRef(null);
  const params = useParams();
  const { addOrder } = useOrders();
  const [giftSearch, setGiftSearch] = useState("");
  const [formState, setFormState] = useState({ ...initialState });
  const [submitPayment, setSubmitPayment] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [invalid, setInvalid] = useState(true);

  const { data: { data: { getOrder: order } = {} } = {} } = useQuery(
    ["orders", params.id],
    () => API.graphql(graphqlOperation(getOrder, { id: params.id })),
    { enabled: !!params.id }
  );

  useEffect(() => {
    if (params.id) {
      setActiveStep(1);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id && order && !formState.id) {
      setFormState({
        ...order,
        recipients: order.recipientIDs,
        to: parseISO(order.toDate),
        from: parseISO(order.fromDate),
        orderDateType: order.orderDateType || "",
      });
    }
  }, [params.id, order, formState.id]);

  function setInput(key, value) {
    let k = key;
    let v = value;
    let giftImage;
    let giftPrice;
    let canScheduleImmediately = false;
    let noShippingFee = false;
    if (key === "gift") {
      k = "giftID";
      v = value.id;
      giftImage = value?.pictures?.items.filter(
        ({ alt }) => alt === "thumbnail"
      )?.[0]?.src;
      giftPrice = value.price;
      canScheduleImmediately = value.can_schedule_immediately;
      noShippingFee = value.no_shipping_fee;
    }
    setFormState({
      ...formState,
      [k]: v,
      ...(key === "orderType" && value === "ONE_TIME" && { orderDateType: "" }),
      ...(key === "gift" && {
        giftImage,
        giftPrice,
        canScheduleImmediately,
        noShippingFee,
      }),
    });
  }

  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);

  const { reward } = useReward("send-gift-success-id", "confetti", {
    colors: ["#abc6bd", "#c5d5e2", "#abc4d6"],
    startVelocity: 25,
    spread: 85,
    elementSize: 16,
  });
  const rewardRef = useRef(reward);

  const submit = () => {
    if (!formState.paymentID) {
      setSubmitPayment(true);
    } else {
      setSuccess(true);
    }
  };

  useEffect(() => {
    if (
      activeStep === steps.indexOf("Gift Details") &&
      formState.orderType === "RECURRING" &&
      !formState.orderDateType
    ) {
      // Disable the "Next" button if they haven't selected an orderDateType on the "Gift Details" step
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  }, [activeStep, formState.orderType, formState.orderDateType]);

  useEffect(() => {
    const submitOrder = async () => {
      try {
        await addOrder(formState);
      } catch (error) {
        setError(error);
      }
    };

    if (success) {
      submitOrder();
      setOpen(true);
      // Wait a bit for the success modal to render
      setTimeout(rewardRef.current, 100);
    }
  }, [success, addOrder, formState]);

  const handleSearch = (event) => {
    setGiftSearch(event.target.value);
  };

  const handleSearchKey = (event) => {
    if (event.key === "Escape") {
      setGiftSearch("");
    }
  };

  const handleNext = () => {
    top.current.scrollIntoView({ behavior: "smooth" });
    setActiveStep((prevActiveStep) => {
      const nextStep = prevActiveStep + 1;
      if (nextStep >= steps.length) {
        submit();
        return steps.length - 1;
      }
      return nextStep;
    });
  };

  const handleBack = () => {
    top.current.scrollIntoView({ behavior: "smooth" });
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Container sx={{ px: 0 }} component="main">
        <Root ref={top}>
          <Box className="innerBox">
            <GiftStepper
              steps={steps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
            <Box className="heading">
              <Typography sx={{ display: "inline-block" }} variant="h6">
                {steps[activeStep]}
              </Typography>
              {steps[activeStep] === steps[0] && (
                <Tooltip
                  enterTouchDelay={0}
                  title='Select a Gift to send to one or more of your recipients by pressing "Select Gift"'
                  placement="top"
                >
                  <InfoIcon sx={{ color: "#fff", marginLeft: "15px" }} />
                </Tooltip>
              )}
            </Box>
            <Box className="box_contents">
              <Box sx={{ width: "100%" }}>
                {activeStep === 0 && (
                  <Box className="topItems">
                    <TextField
                      fullWidth
                      label="Search for a Gift"
                      variant="outlined"
                      value={giftSearch}
                      onChange={handleSearch}
                      onKeyDown={handleSearchKey}
                    />
                    <Box className="infoBox">
                      <Typography>
                        Don't see The perfect gift? Email{" "}
                        <Link href="mailto:connect@zipzapgifts.com">
                          connect@zipzapgifts.com
                        </Link>{" "}
                        to have a custom gift created just for you
                      </Typography>
                    </Box>
                  </Box>
                )}
                <Box
                  sx={{ overflow: "auto", maxHeight: "600px", height: "100%" }}
                >
                  <StepComponent
                    activeStep={activeStep}
                    giftSearch={giftSearch}
                    formState={formState}
                    setInput={setInput}
                    handleNext={handleNext}
                    submitPayment={submitPayment}
                    setSubmitPayment={setSubmitPayment}
                    setSuccess={setSuccess}
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button
                    onClick={handleNext}
                    disabled={submitPayment || success || invalid}
                  >
                    {activeStep === steps.length - 1
                      ? `${formState.id ? "Update Gift" : "Create Gift"}`
                      : "Next"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Root>
      </Container>
      <SuccessModal open={open} setOpen={setOpen} error={error} />
    </>
  );
};

export default SendAGift;

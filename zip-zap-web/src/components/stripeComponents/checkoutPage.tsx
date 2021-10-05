import React from "react";
import appSettings from "../../appSettings.json";
import { loadStripe } from "@stripe/stripe-js";
import { Row, Col,} from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";
import StripeWrapper from "./stripeWrapper";
import StripeFullCardForm from "./stripeFullCardForm";
import AdminItemRow from "../basicComponents/adminComponents/adminItemRow";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// TODO: Is there a better place to put this function?
loadStripe(appSettings.stripeKey);

function CheckoutPage({ match, location }: RouteComponentProps) {
  function useQuery() {
    return new URLSearchParams(location.search);
  }

  let query = useQuery();
  let redirectURL = query.get("redirectURL");
  let checkoutType = query.get("checkoutType");

  return (
    <Col>
    <Row>
      <Col className="page-header justify-content-center ">
        <h3>Add a card</h3>
      </Col>
    </Row>
    <Row>
      {redirectURL ? (
        <Col sm="4">
          <Link to={redirectURL} className={`back-link`}>
            Back to Previous Page
          </Link>
        </Col>
      ) : null}
      </Row>

      {/* holds 4 Containers */}
      <Row
        className={`main-section-white-bg m-3`}
      >
        <Col>
        {/* <div className={`event-dashboard-sub-title primary-green-header`}>
          <span>{completedEvent ? completedEvent.name : "Event"} Details</span>
        </div> */}

        {/* checkout confirmation  */}
        {/* <section className={`event-dashboard-full-column`}> */}
          {/* <div className={`event-dashboard-sub-title primary-black-header`}>
            <span>Checkout</span>
          </div> */}
          <div className={`row center-row full-width`}>
            {checkoutType === "payment" ? (
              <div
                className={`event-dashboard-half-column column left-align-column`}
              >
                <div
                  className={`event-dashboard-sub-title primary-black-header`}
                >
                  <span>Checkout</span>
                </div>
                <div className={`row`}>
                  <span className={`row`}>Total Gift Price: </span>
                  <span className={`row`}>$0</span>
                </div>
              </div>
            ) : null}
              <Row className={`event-dashboard-sub-title primary-blue-header`}>
                <span>Card Information</span>
              </Row>
            <Row
              className={`event-dashboard-half-column column left-align-column column-grey-bg pt-3`}
            >
              <StripeWrapper>
                <StripeFullCardForm
                  buttonType={checkoutType ? checkoutType : ""}
                  redirectURL={redirectURL ? redirectURL : ""}
                />
              </StripeWrapper>
            </Row>
          </div>
        {/* </section> */}
        </Col>
      </Row>
    </Col>
  );
}

export default CheckoutPage;

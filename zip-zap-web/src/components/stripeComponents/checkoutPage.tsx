import React from "react";
import appSettings from "../../appSettings.json";
import { loadStripe } from "@stripe/stripe-js";
import { Link, RouteComponentProps } from "react-router-dom";
import StripeWrapper from "./stripeWrapper";
import StripeFullCardForm from "./stripeFullCardForm";

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
    <section className={`column center-column full-height`}>
      <header className={`column center page-header page-header-black`}>
        <h1>Check Out</h1>
      </header>

      {redirectURL ? (
        <section className={`row width-90`}>
          <Link to={redirectURL} className={`back-link`}>
            Back to Previous Page
          </Link>
        </section>
      ) : null}

      {/* holds 4 Containers */}
      <main
        className={` column center-column main-section main-section-white-bg`}
      >
        {/* <div className={`event-dashboard-sub-title primary-green-header`}>
          <span>{completedEvent ? completedEvent.name : "Event"} Details</span>
        </div> */}

        {/* checkout confirmation  */}
        <section className={`column center-row event-dashboard-full-column `}>
          {/* <div className={`event-dashboard-sub-title primary-black-header`}>
            <span>Checkout</span>
          </div> */}
          <br></br>

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
            <div
              className={`event-dashboard-half-column column left-align-column column-grey-bg`}
            >
              <div className={`event-dashboard-sub-title primary-blue-header`}>
                <span>Card Information</span>
              </div>
              <StripeWrapper>
                <StripeFullCardForm
                  buttonType={checkoutType ? checkoutType : ""}
                  redirectURL={redirectURL ? redirectURL : ""}
                />
              </StripeWrapper>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}

export default CheckoutPage;

/**
 * A serverless function that listens to the DynamoDB stream for
 * Orders to send out emails whenever an Order is updated or created
 * to let Zip Zap Gift Specialists know they need to reach out to
 * finalize the orders.
 */
//import aws from "aws-sdk";
//const ses = new aws.SES();
import adminNew from "./email-templates/admin-new.js";

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  // The event stream may have batched multiple records, so loop through them all
  event.Records.forEach((record) => {
    const { eventName, dynamodb: { NewImage = {} } = {} } = record;
    const {
      giftID,
      createdBy,
      recipientIDs,
      toDate,
      fromDate,
      orderType,
      totalPrice,
    } = NewImage;

    let date = new Date(toDate.S).toLocaleDateString("en-US");
    if (orderType.S === "RECURRING") {
      date = new Date(fromDate.S).toLocaleDateString("en-US") + " - " + date;
    }

    let email;
    if (eventName === "INSERT") {
      email = adminNew({
        emailAddress: createdBy.S,
        giftName: giftID.S,
        recipients: recipientIDs.L,
        date,
        price: totalPrice.S,
      });
    } else if (eventName === "MODIFY") {
      // TODO: Calculate differences and stuff...
      email = adminNew({
        emailAddress: createdBy.S,
        giftName: giftID.S,
        recipients: recipientIDs.L,
        date,
        price: totalPrice.S,
      });
    }

    console.log(email);
  });
  return { status: "done" };
};

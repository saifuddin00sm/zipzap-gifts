/* Amplify Params - DO NOT EDIT
	API_ZIPZAP_GRAPHQLAPIENDPOINTOUTPUT
	API_ZIPZAP_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * A serverless function that listens to the DynamoDB stream for
 * Orders to send out emails whenever an Order is updated or created
 * to let Zip Zap Gift Specialists know they need to reach out to
 * finalize the orders.
 */
//import aws from "aws-sdk";
//const ses = new aws.SES();
import adminNew from "./email-templates/admin-new.js";
import { getRecipients } from "./graphql.js";

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  // The event stream may have batched multiple records, so loop through them all
  for await (const record of event.Records) {
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

    const recipients = await getRecipients(recipientIDs.L.map((r) => r.S));
    console.log(recipients);

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
  }
  return { status: "done" };
};

/**
 * A serverless function that listens to the DynamoDB stream for
 * Orders to send out emails whenever an Order is updated or created
 * to let Zip Zap Gift Specialists know they need to reach out to
 * finalize the orders.
 */
// import aws from "aws-sdk";
// const ses = new aws.SES();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  // The event stream may have batched multiple records, so loop through them all
  event.Records.forEach((record) => {
    const { eventName } = record;
    if (eventName === "INSERT" || eventName === "MODIFY") {
      // TODO: Send out emails to alert on Order updates
      console.log("DynamoDB Record: %j", record.dynamodb);
    }
  });
  return { status: "done" };
};

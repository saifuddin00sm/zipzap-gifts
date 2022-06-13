/* Amplify Params - DO NOT EDIT
  API_ZIPZAP_GRAPHQLAPIENDPOINTOUTPUT
  API_ZIPZAP_GRAPHQLAPIIDOUTPUT
  ENV
  REGION
Amplify Params - DO NOT EDIT */ /*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

import aws from "aws-sdk";
import express from "express";
import bodyParser from "body-parser";
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import Stripe from "stripe";

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const { Parameters } = await new aws.SSM()
  .getParameters({
    Names: ["STRIPE_KEY"].map((secretName) => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();
const stripe = Stripe(Parameters.pop().Value);

// Returns a Stripe clientSecret associated with a customer that is either
// passed in the request body as "customerID" or creates a new customer in
// Stripe with the "name" parameter and returns the new customerID to be
// associated with the calling user.
app.post("/secret", async function (req, res) {
  const { name } = req.body;
  let customerID = req.body.customerID;

  if (!customerID) {
    const customer = await stripe.customers.create({
      description: `Customer Added: ${new Date().toString()} - from Amplify`,
      name,
    });
    customerID = customer.id;
  }

  const setupIntent = await stripe.setupIntents.create({
    customer: customerID,
  });

  res.send({
    clientSecret: setupIntent.client_secret,
    customerID,
  });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
export default app;

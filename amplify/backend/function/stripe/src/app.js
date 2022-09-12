/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["STRIPE_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["STRIPE_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
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

import express from "express";
import bodyParser from "body-parser";
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware.js";
import { stripe, getStripeCustomer } from "./auth.js";

// Declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Returns a Stripe clientSecret associated with a customer that is either
// already associated with the calling user or creates a new customer in Stripe.
// Requires the calling user to pass along their GraphQL auth token in the request
// body so that we can properly retrieve/update the database with their information.
app.post("/secret", async function (req, res) {
  let statusCode = 200;
  let body = {};

  try {
    const customer = await getStripeCustomer(req);

    // Get the client secret from Stripe
    if (customer) {
      const setupIntent = await stripe.setupIntents.create({ customer });
      body.clientSecret = setupIntent.client_secret;
    }
  } catch (error) {
    console.warn("CAUGHT ERROR", error);
    statusCode = 400;
    body = {
      error: "Unable to generate client secret",
    };
  }

  if (!body.clientSecret) {
    statusCode = 500;
    body = {
      error: "Error generating client secret",
    };
  }

  res.status(statusCode).send(body);
});

// Returns a list of Stripe payment methods for the calling user.
// Currently only supports credit cards.
app.post("/payments", async function (req, res) {
  let statusCode = 200;
  let body = {};

  try {
    const customer = await getStripeCustomer(req);
    const { data = [] } = await stripe.customers.listPaymentMethods(customer, {
      type: "card",
    });

    body = {
      ...data.map(
        ({
          id,
          billing_details: { name } = {},
          card: { last4, exp_month, exp_year } = {},
        }) => ({
          id,
          name,
          last4,
          exp_month,
          exp_year,
        })
      ),
    };
  } catch (error) {
    console.warn("CAUGHT ERROR", error);
    statusCode = 400;
    body = {
      error: "Unable to get payment methods",
    };
  }

  res.status(statusCode).send(body);
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
export default app;

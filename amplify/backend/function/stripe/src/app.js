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
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware.js";
import Stripe from "stripe";
import { default as fetch, Request } from "node-fetch";

const GRAPHQL_ENDPOINT = process.env.API_ZIPZAP_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_ZIPZAP_GRAPHQLAPIKEYOUTPUT;

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

// Get the Stripe secret
const { Parameters } = await new aws.SSM()
  .getParameters({
    Names: ["STRIPE_KEY"].map((secretName) => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();
const stripe = Stripe(Parameters.pop().Value);

const query = /* GraphQL */ `
  query GetStripeID($id: ID!) {
    getUser(id: $id) {
      name
      stripeID
    }
  }
`;

const mutation = /* GraphQL */ `
  mutation UpdateUserStripeID($input: UpdateUserInput!) {
    updateUser(input: $input) {
      stripeID
    }
  }
`;

// Returns a Stripe clientSecret associated with a customer that is either
// already associated with the calling user or creates a new customer in Stripe.
// Requires the calling user to pass along their GraphQL auth token in the request
// body so that we can properly retrieve/update the database with their information.
app.post("/secret", async function (req, res) {
  let statusCode = 200;
  let body = {};

  // Get the user's ID from the auth context of the request to verify they're properly authenticated.
  const cognitoID =
    req.apiGateway.event.requestContext.identity.cognitoAuthenticationProvider.split(
      "CognitoSignIn:"
    )[1];
  const variables = { id: cognitoID };

  /** @type {import('node-fetch').RequestInit} */
  const options = {
    method: "POST",
    headers: {
      "x-api-key": GRAPHQL_API_KEY,
      authorization: req.body.token,
    },
    body: JSON.stringify({ query, variables }),
  };
  const request = new Request(GRAPHQL_ENDPOINT, options);

  try {
    // Get the User's stripeID
    const response = await fetch(request);
    const json = await response.json();
    const { data: { getUser: { name, stripeID } = {} } = {}, errors } = json;
    if (errors) {
      statusCode = 400;
      console.warn("UNABLE TO GET USER", errors);
    }

    let customer = stripeID;
    if (!customer && name) {
      // Create the Stripe Customer
      const { id } = await stripe.customers.create({
        description: `Customer Added: ${new Date().toString()} - from Amplify`,
        name,
      });

      // Update the User with the new stripe ID
      const variables = { input: { id: cognitoID, stripeID: id } };
      options.body = JSON.stringify({ query: mutation, variables });
      const request = new Request(GRAPHQL_ENDPOINT, options);
      const updateResponse = await fetch(request);
      const json = await updateResponse.json();
      const {
        data: { updateUser: { stripeID: updatedStripeID } = {} } = {},
        errors,
      } = json;
      if (errors) {
        statusCode = 400;
        console.warn("UNABLE TO UPDATE USER", errors);
      }
      customer = updatedStripeID;
    }

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

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
export default app;

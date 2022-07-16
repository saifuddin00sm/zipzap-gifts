// Helper functions to authenticate and authorize user access to data.
import aws from "aws-sdk";
import Stripe from "stripe";
import { default as fetch, Request } from "node-fetch";

// Get the Stripe secret
const { Parameters } = await new aws.SSM()
  .getParameters({
    Names: ["STRIPE_KEY"].map((secretName) => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();
export const stripe = Stripe(Parameters.pop().Value);

const GRAPHQL_ENDPOINT = process.env.API_ZIPZAP_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_ZIPZAP_GRAPHQLAPIKEYOUTPUT;

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

// Takes a request object and returns the calling user's Stripe customer id.
// If they don't have a customer_id yet, it will create a new user in Stripe.
// The request object must contain the user's Cognito information and a GraphQL auth token.
export const getStripeCustomer = async (req) => {
  let customer;

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

  // Get the User's stripeID
  const response = await fetch(request);
  const json = await response.json();
  const { data: { getUser: { name, stripeID } = {} } = {}, errors } = json;
  if (errors) {
    console.warn("UNABLE TO GET USER", errors);
  }

  customer = stripeID;
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
      console.warn("UNABLE TO UPDATE USER", errors);
    }
    customer = updatedStripeID;
  }

  return customer;
};

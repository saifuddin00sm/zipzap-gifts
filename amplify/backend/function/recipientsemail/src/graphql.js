import { default as fetch, Request } from "node-fetch";

const GRAPHQL_ENDPOINT = process.env.API_ZIPZAP_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_ZIPZAP_GRAPHQLAPIKEYOUTPUT;

const query = /* GraphQL */ `
  query GetRecipientEmails($filter: ModelRecipientFilterInput) {
    listRecipients(filter: $filter) {
      items {
        email
      }
    }
  }
`;

/**
 * A helper function to grab all of the email addresses of the "ids" passed in the body
 * of the request. The user's GraphQL auth "token" must be passed in the body as well
 * so that we can make a secure request to AppSync for recipients the requesting
 * user ACTUALLY has access to.
 */
export const getEmails = async ({ body }) => {
  const { token, ids } = JSON.parse(body);
  const filterIDs = ids.map((id) => ({ id: { eq: id } }));
  const variables = { filter: { or: filterIDs } };

  /** @type {import('node-fetch').RequestInit} */
  const options = {
    method: "POST",
    headers: {
      "x-api-key": GRAPHQL_API_KEY,
      authorization: token,
    },
    body: JSON.stringify({ query, variables }),
  };
  const request = new Request(GRAPHQL_ENDPOINT, options);

  const response = await fetch(request);
  const json = await response.json();
  const { data: { listRecipients: { items = [] } = {} } = {}, errors } = json;
  if (errors) {
    console.warn("UNABLE TO GET Recipients", errors);
  }
  const emails = items.map(({ email }) => email);
  return emails;
};

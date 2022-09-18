import crypto from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { default as fetch, Request } from "node-fetch";

const GRAPHQL_ENDPOINT = process.env.API_ZIPZAP_GRAPHQLAPIENDPOINTOUTPUT;

const { Sha256 } = crypto;
const AWS_REGION = process.env.AWS_REGION || "us-west-2";

const recipientQuery = /* GraphQL */ `
  query GetRecipientByEmail($filter: ModelRecipientFilterInput) {
    listRecipients(filter: $filter) {
      items {
        id
        favorites {
          items {
            id
            type
            value
          }
        }
      }
    }
  }
`;

const createFavoriteMutation = /* GraphQL */ `
  mutation AddFavorite($input: CreateProfileFavoriteInput!) {
    createProfileFavorite(input: $input) {
      id
    }
  }
`;

const updateFavoriteMutation = /* GraphQL */ `
  mutation UpdateFavorite($input: UpdateProfileFavoriteInput!) {
    updateProfileFavorite(input: $input) {
      id
    }
  }
`;

const graphQLQuery = async (query, variables) => {
  const endpoint = new URL(GRAPHQL_ENDPOINT);
  const body = { query };
  if (variables) {
    body.variables = variables;
  }

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: "appsync",
    sha256: Sha256,
  });

  const requestToBeSigned = new HttpRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify(body),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  const response = await fetch(request);
  const { data = {}, errors } = await response.json();
  if (errors) {
    throw new Error(JSON.stringify(errors));
  }
  return data;
};

export const getRecipient = async (email) => {
  let recipient;
  const params = {
    filter: { email: { eq: email } },
  };

  const { listRecipients } = await graphQLQuery(recipientQuery, params);

  if (listRecipients?.items?.length > 0) {
    recipient = listRecipients.items[0];
  } else {
    throw new Error(`No recipient found for email address ${email}`);
  }

  return recipient;
};

export const createFavorite = async (recipientFavoritesId, type, value) => {
  await graphQLQuery(createFavoriteMutation, {
    input: {
      recipientFavoritesId,
      type,
      value,
    },
  });
};

export const updateFavorite = async (id, value) => {
  await graphQLQuery(updateFavoriteMutation, {
    input: {
      id,
      value,
    },
  });
};

/* Amplify Params - DO NOT EDIT
	API_ZIPZAP_GRAPHQLAPIENDPOINTOUTPUT
	API_ZIPZAP_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import { getEmails } from "./graphql.js";

/**
 * This lambda function takes a GraphQL AppSync token and list of Recipient ids
 * and sends out an email to each of them requesting that they fill out
 * the Favorites survey.
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  const emails = await getEmails(event);
  console.log({ emails });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(`Found ${emails.length} email addresses`),
  };
};

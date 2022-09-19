/* Amplify Params - DO NOT EDIT
	API_ZIPZAP_GRAPHQLAPIENDPOINTOUTPUT
	API_ZIPZAP_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import { getEmails } from "./graphql.js";
import { sendSurveyEmails } from "./email.js";

/**
 * This lambda function takes a GraphQL AppSync token and list of Recipient ids
 * and sends out an email to each of them requesting that they fill out
 * the Favorites survey.
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  let count = 0;
  try {
    const emails = await getEmails(event);
    count = await sendSurveyEmails(emails);
  } catch (error) {
    console.error(error);
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(`Successfully sent ${count} email(s).`),
  };
};

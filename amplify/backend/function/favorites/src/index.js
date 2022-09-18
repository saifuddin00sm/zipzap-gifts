/* Amplify Params - DO NOT EDIT
	API_ZIPZAP_GRAPHQLAPIENDPOINTOUTPUT
	API_ZIPZAP_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import { getRecipient } from "./graphql.js";

/**
 * This lambda function should be invoked by Google Forms passing
 * in an event object containing the namedValues from filling out
 * a Favorites Survey.
 *
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  const { namedValues } = event;
  let statusCode = 200;

  // Extract the email address from the form submission
  const email = namedValues?.["Email Address"]?.[0];
  delete namedValues?.["Email Address"];

  try {
    // Attempt to find the user from the passed in email address
    const recipient = await getRecipient(email);
    console.log({ recipient });
  } catch (error) {
    statusCode = 500;
    console.error(`Unable to update favorites for email "${email}".`, error);
  }

  return {
    statusCode,
  };
};

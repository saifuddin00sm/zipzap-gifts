import { template } from "./email_template.js";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const sesClient = new SESClient({ region: process.env.REGION });

const fromEmail = "noreply@zipzap.gifts";
const subject = "Hooray! Your Employer Wants To Send You Cool Gifts!";
const body = template;

/**
 * Sends the favorites survey email individually to each of the passed
 * in email addresses.
 */
export const sendSurveyEmails = async (emails) => {
  let count = 0;

  // Send each of the emails in parallel
  const promises = emails.map(async (email) => {
    try {
      const sendEmailCommand = new SendEmailCommand({
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: body,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: subject,
          },
        },
        Source: fromEmail,
      });
      const response = await sesClient.send(sendEmailCommand);
      // TODO: Remove this line, determine how we should count these...
      console.log(response);
      count++;
    } catch (error) {
      console.error(error);
    }
  });

  // Wait for all of the emails to finish sending
  await Promise.allSettled(promises);
  return count;
};

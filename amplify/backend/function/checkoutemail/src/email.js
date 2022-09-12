import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const sesClient = new SESClient({ region: process.env.REGION });

/**
 * Sends an email to the ADMIN_EMAIL from SES_EMAIL.
 * @param {string} subject The subject line for the email
 * @param {string} body The HTML body of the email
 * @returns
 */
export const sendAdminEmail = async (subject, body) => {
  const sendEmailCommand = new SendEmailCommand({
    Destination: {
      ToAddresses: [process.env.ADMIN_EMAIL],
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
    Source: process.env.SES_EMAIL,
  });
  return await sesClient.send(sendEmailCommand);
};

import { template } from "./email_template.js";
import { text } from "./text_template.js";
import mailcomposer from "mailcomposer";
import { SESClient, SendRawEmailCommand } from "@aws-sdk/client-ses";
const sesClient = new SESClient({ region: process.env.REGION });

const unsubscribeEmail = "connect@zipzapgifts.com";
const fromEmail = "Zip Zap Gifts <noreply@zipzap.gifts>";
const body = template;

/**
 * Sends the favorites survey email individually to each of the passed
 * in email addresses.
 */
export const sendSurveyEmails = async (emails) => {
  let count = 0;

  // Send each of the emails in parallel
  const promises = emails.map(async ({ email, companyName }) => {
    return new Promise((resolve, reject) => {
      try {
        var mailOptions = {
          from: fromEmail,
          subject: `Hooray! ${
            companyName || "Someone"
          } wants to send you a gift!`,
          text: text,
          html: body,
          to: email,
          headers: {
            "List-Unsubscribe": `<mailto:${unsubscribeEmail}>`,
          },
        };

        var mail = mailcomposer(mailOptions);

        mail.build(async (err, message) => {
          if (err) {
            console.error(err);
            reject();
          }

          const response = await sesClient.send(
            new SendRawEmailCommand({ RawMessage: { Data: message } })
          );
          console.log(response);
          count++;
          resolve();
        });
      } catch (error) {
        console.error(error);
        reject();
      }
    });
  });

  // Wait for all of the emails to finish sending
  await Promise.allSettled(promises);
  return count;
};

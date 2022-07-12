import { template } from "./email.js";

const email = ({ emailAddress, giftName, recipients, date, price }) => {
  const title = "Hooray Hooray!!";
  const body = `
  <p>
    <b>Client Email:</b> ${emailAddress}
  </p>

  <p>
    <b>Gift Selected:</b> ${giftName}
  </p>

  <p>
    <b>How Many and Who:</b> ${recipients.length}
  </p>

  <ul>
    ${recipients.map((r) => `<li>${r.S}</li>`).join("")}
  </ul>
    
  <p>
    <b>Scheduled For:</b> ${date}
  </p>

  <p>
    <b>Estimated Price:</b> $${price}
  </p>

  <p>
    Commence Happy Dance! Reach out to confirm details and finalize price so we can charge their card.
  </p>
  `;
  return template({ title, body });
};

export default email;

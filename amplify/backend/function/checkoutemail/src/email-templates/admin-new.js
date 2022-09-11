import { template } from "./email.js";

const email = ({
  updated = false,
  name,
  emailAddress,
  giftName,
  recipients,
  date,
  price,
}) => {
  const title = updated ? "Gift Order Updated!" : "Hooray Hooray!!";
  const body = `
  <p>
    <b>Client Email:</b> ${emailAddress}
  </p>

  <p>
    <b>Gift Selected:</b> ${giftName}
  </p>

  <p>
    <b>Name:</b> ${name}
  </p>

  <p>
    <b>How Many and Who:</b> ${recipients.length}
  </p>

  <ul>
    ${recipients
      .map((r) => `<li><span title="${r.id}">${r.name}</span></li>`)
      .join("")}
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

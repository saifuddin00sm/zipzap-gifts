const gFunctions = require("./genericFunctions");
const qFunctions = require("./queryFunctions");

exports.handler = async (event) => {
  let response = { error: "" };

  event.body = response;
  return event;
};

const fs = require("fs");

const openLocalJSONFile = async (filePath) => {
  let response = { error: "File does not exist.", data: {}, exists: false };

  if (fs.existsSync(filePath)) {
    response = await new Promise((res, rej) => {
      let json = fs.readFileSync(filePath);
      json = JSON.parse(json);
      response.data = json;
      response.exists = true;
      response.error = "";
      return res(response);
    });
  }

  return response;
};

async function writeFile(filePath, json, newFile) {
  return (result = new Promise(async (res, rej) => {
    let write = false;
    if (newFile) {
      write = true;
    } else {
      write = fs.existsSync(filePath);
    }

    if (write) {
      json = JSON.stringify(json, null, 2);

      // Use JSON.stringify(json) for production to make files smaller
      let writeResult = await new Promise(async (res, rej) => {
        try {
          fs.writeFileSync(filePath, json, (err) => {
            if (err) {
              console.log("writeResult ERROR: ", err);
              rej(false);
            } else res(true);
          });
          res(true);
        } catch (e) {
          rej(false);
        }
      });
      res(writeResult);
    } else rej({ error: "This File Doesn't Exist" });
  }));
}

const getLastSunday = (startingDate) => {
  let date = startingDate ? new Date(startingDate) : new Date();
  let lastSunday = date.setDate(date.getDate() - date.getDay());
  lastSunday = new Date(lastSunday).toDateString();

  let nextSunday = date.setDate(new Date(lastSunday).getDate() + 7);
  nextSunday = new Date(nextSunday).toDateString();

  return { lastSunday, nextSunday };
};

exports.openLocalJSONFile = openLocalJSONFile;
exports.writeFile = writeFile;
exports.getLastSunday = getLastSunday;

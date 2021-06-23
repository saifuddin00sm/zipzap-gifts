const crypto = require("crypto");
const AWS = require("aws-sdk");
const appSettings = require("./appSettings.json");

const hashString = (text) => {
  let response = { error: false, result: "" };

  if (!text) {
    response.result = "";
    return response;
  }

  response.result = crypto.createHash("sha512").update(text).digest("hex");

  return response;
};

const readAWSJsonFile = async (awsFilePath) => {
  let response = {
    error: false,
    data: null,
  };

  return (response = await new Promise((resolve, reject) => {
    const s3 = new AWS.S3({});
    var params = {
      Bucket: appSettings.databaseToggle.productionDatabase
        ? appSettings.s3BucketProduction
        : appSettings.s3Bucket,
      Key: awsFilePath,
      ResponseContentType: "application/json",
    };

    try {
      s3.getObject(params, function (err, data) {
        if (!err) {
          response.data = JSON.parse(data.Body.toString());
          return resolve(response);
        } else {
          response.error = err;
          return resolve(response);
        }
      });
    } catch (e) {
      // handle error catching to still return error without blowing up
      response.error = "No Such Key";
      return resolve(response);
    }
  }));
};

const writeAWSFile = async (fileKey, json) => {
  let result = { error: "", saved: false };
  return (result = await new Promise(async (res, rej) => {
    const s3 = new AWS.S3({});

    let params = {
      Bucket: appSettings.databaseToggle.productionDatabase
        ? appSettings.s3BucketProduction
        : appSettings.s3Bucket,
      Key: fileKey,
      Body: JSON.stringify(json),
    };

    s3.upload(params, function (err, data) {
      if (err) {
        rej({ error: "Error uploading JSON data" });
        console.log(err);
      } else {
        res({ error: "", saved: true });
      }
    });
  }));
};

exports.hashString = hashString;
exports.readAWSJsonFile = readAWSJsonFile;
exports.writeAWSFile = writeAWSFile;

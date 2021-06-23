const fs = require("fs");
const crypto = require("crypto");
const AWS = require("aws-sdk");
const appSettings = require("./appSettings.json");
const qFunctions = require("./queryFunctions");

// REMOVE FOR LAMBDA
AWS.config.loadFromPath("./config.json");

const LOCAL_KMS_KEY = "testKEY";

const openLocalJSONFile = async (filePath) => {
  let response = { error: "File does not exist.", data: {}, exists: false };

  try {
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
  } catch (error) {
    return res(response);
  }

  return response;
};

const checkDirectory = async (fileFolders) => {
  // Try to make folder, return true if created or if exists else return err
  let makeFolder = await new Promise((mkRes, mkRej) => {
    fs.mkdir(fileFolders, { recursive: true }, (err) => {
      if (err && err.code != "EEXIST") {
        console.log("Directory: ", fileFolders);
        console.log("MKDIR ERROR:", err);
        mkRes(false);
      } else {
        mkRes(true);
      }
    });
  });

  return makeFolder;
};

const writeFile = async (filePath, json, newFile) => {
  console.log("HEE");
  return (result = new Promise(async (res, rej) => {
    let write = false;
    if (newFile) {
      let splitFile = filePath.split("/");
      splitFile.pop(splitFile.length - 1);

      let makeFolder = await checkDirectory(splitFile.join("/"));
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
              res({ error: "Error Creating File" });
            } else res(true);
          });
          return res(true);
        } catch (e) {
          console.log("E", e);
          return res({ error: "This File Doesn't Exist" });
        }
      });
      return res(writeResult);
    } else res({ error: "This File Doesn't Exist" });
  }));
};

const getLastSunday = (startingDate) => {
  let date = startingDate ? new Date(startingDate) : new Date();
  let lastSunday = date.setDate(date.getDate() - date.getDay());
  lastSunday = new Date(lastSunday).toDateString();

  let nextSunday = date.setDate(new Date(lastSunday).getDate() + 7);
  nextSunday = new Date(nextSunday).toDateString();

  return { lastSunday, nextSunday };
};

const getMonthSunday = (startingDate) => {
  let date = startingDate ? new Date(startingDate) : new Date();

  let firstDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).toDateString();
  let lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).toDateString();

  return { firstDay, lastDay };
};

const hashString = (text) => {
  let response = { error: false, result: "" };

  if (!text) {
    response.error = "Missing Requirements";
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

const encryptStringLocal = async (text) => {
  let response = { error: "", result: "" };

  if (!text) {
    response.error = "Missing Text to Encrypt";
    return response;
  }

  var mykey = crypto.createCipher("aes-128-cbc", LOCAL_KMS_KEY);
  var mystr = mykey.update(text, "utf8", "hex");
  mystr += mykey.final("hex");

  response.result = mystr;

  return response;
};

const decryptStringLocal = async (text) => {
  let response = { error: "", result: "" };

  if (!text) {
    response.error = "Missing Text to Decrypt";
    return response;
  }

  let mykey = crypto.createDecipher("aes-128-cbc", LOCAL_KMS_KEY);
  let mystr = mykey.update(text, "hex", "utf8");
  mystr += mykey.final("utf8");

  response.result = mystr;

  return response;
};

const endPointAuthorize = async (userEmailRaw, feature) => {
  let response = {
    error: "",
    userEmail: "",
    allowed: false,
    account: {
      accountID: null,
      planID: null,
      roleID: null,
    },
  };
  if (!userEmailRaw) {
    response.error = "Missing User";
    return response;
  }

  let userEmail = hashString(userEmailRaw).result;
  let accountData = await qFunctions.getAccountData(userEmail);

  response = await qFunctions.checkFeature(
    feature,
    accountData.account.roleID,
    accountData.account.planID
  );

  response.userEmail = userEmail;
  response.account = accountData.account;

  return response;
};

const getAWSPreSignedURL = async (
  awsFilePath,
  expirationMinutes,
  uploadSignature
) => {
  let response = {
    error: "",
    url: "",
  };

  if (uploadSignature) {
    response = await new Promise(async (res, rej) => {
      let signedUrlExpireSeconds = 60 * 10;

      if (expirationMinutes) {
        signedUrlExpireSeconds = 60 * expirationMinutes;
      }

      const s3 = new AWS.S3({
        region: "us-east-1",
        signatureVersion: "v4",
      });
      let params = {
        Bucket: appSettings.databaseToggle.productionDatabase
          ? appSettings.s3BucketProduction
          : appSettings.s3Bucket,
        Key: awsFilePath,
      };

      params.Expires = signedUrlExpireSeconds;
      s3.getSignedUrl("putObject", params, (err, url) => {
        if (err) {
          return res({ error: err, url: "" });
        } else {
          return res({ error: "", url: url });
        }
      });
    });
  } else {
    response = await new Promise(async (res, rej) => {
      let signedUrlExpireSeconds = 60 * 10;

      if (expirationMinutes) {
        signedUrlExpireSeconds = 60 * expirationMinutes;
      }

      const s3 = new AWS.S3({
        region: "us-east-1",
        signatureVersion: "v4",
      });
      let params = {
        Bucket: appSettings.databaseToggle.productionDatabase
          ? appSettings.s3BucketProduction
          : appSettings.s3Bucket,
        Key: awsFilePath,
      };

      // Using callbacks
      let exists = await s3
        .headObject(params)
        .promise()
        .then((suc) => {
          return { exists: true };
        })
        .catch((err) => {
          return { exists: false, error: err };
        });

      if (!exists.exists) {
        console.log("EXISTS ERR: ", awsFilePath);
        return res({ error: exists.error.code, url: "" });
      }

      params.Expires = signedUrlExpireSeconds;
      s3.getSignedUrl("getObject", params, (err, url) => {
        if (err) {
          return res({ error: err, url: "" });
        } else {
          return res({ error: "", url: url });
        }
      });
    });
  }

  return response;
};

exports.openLocalJSONFile = openLocalJSONFile;
exports.writeFile = writeFile;
exports.getLastSunday = getLastSunday;
exports.hashString = hashString;
exports.getMonthSunday = getMonthSunday;
exports.readAWSJsonFile = readAWSJsonFile;
exports.writeAWSFile = writeAWSFile;
exports.encryptStringLocal = encryptStringLocal;
exports.decryptStringLocal = decryptStringLocal;
exports.endPointAuthorize = endPointAuthorize;
exports.getAWSPreSignedURL = getAWSPreSignedURL;

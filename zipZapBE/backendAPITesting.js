// Steps to Follow:
// 1. Go to website and login
// 2. Inspect and go to Application -> Local Storage -> URL
// 3. Look for a key of "user" with a dictionary of objects
// 4. Copy the value of the "id" field (will be a very long string)
// 5. Pass that as the auth token param to run the script
// 6. Pass the email used as the email param to run the script
// 7. OPTIONAL - By default we only test GET methods to reduce having to
//               delete our test work, to test PUT/POST endpoints pass
//               the allEndpoint param to check all requests

// Steps to Edit:
// 1. Get Endpoint Route
// 2. Add to endPointDictionary
// 3. Add Array of pathParams and queryParams as needed
// 3.1. Include default values for quicker testing otherwise prompt will show
// 4. Include "body" field in endpoint object if PUT/POST

// Steps to add Tests:
// 1. Include "testCriteria" field in endpoint object as array
// 2. Enter as many entried with keys as need to be checked (keys must be in result of endpoint
//     or an error will be caught)
// 3. Put the expected value in the same object as the key
// See "user/login" object for an example

const readline = require("readline");
const fs = require("fs");
const fetch = require("node-fetch");
const appSettings = require("./appSettings.json");

// eyJraWQiOiJkYVRvT0Q1QWxjYkgzZFBkOElvck80M0pyRHA4d1BYNjczdEx2VjZ3cndzPSIsImFsZyI6IlJTM
// jU2In0.eyJhdF9oYXNoIjoiRVU0V1hEVFBRRDJEYnFrWURJQWEyZyIsInN1YiI6ImQzZWJhYTdjLTM5OTAtNDFm
// NC1iMmI2LTgyZmYxNTY1MjU5NCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml
// 0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9CS2w2dHdCODAiLCJjb2duaXRvOnVzZX
// JuYW1lIjoiZDNlYmFhN2MtMzk5MC00MWY0LWIyYjYtODJmZjE1NjUyNTk0IiwiZ2l2ZW5fbmFtZSI6IktldmluI
// iwiYXVkIjoiMXRnNzVsMDBxcm0zOHQ2cmlrbnNtc2FyMm8iLCJldmVudF9pZCI6ImZiMmFkZDU2LTlkMjktNGM1
// NS1hZTRiLTNmMDUzMGRkZTcyMiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjI1MjI2OTg1LCJleHA
// iOjE2MjUzMTMzODUsImlhdCI6MTYyNTIyNjk4NSwiZmFtaWx5X25hbWUiOiJTaXRlcyIsImVtYWlsIjoia2V2aW
// 5wc2l0ZXNAZ21haWwuY29tIn0.rvex_sn6fHh1CxdfuxI_YU-kkT-SwS1Px1HNZfZLgCy_ymtlF_fJrsIIhjZpJ
// mQXZaw60MYeGEre8O6JNaFOcW3ktQ54NAwNPHxcHrtFsM4j9nlCn8XXXnyDshWSYqKfCHKcle5O_NEwwsr8CstX1
// qimpRttk56kP2DTlj0kCRsUVvswMawM-DLEsEeYfPjOkG-jdHJcBs-p2GxlSejJwTeS7T7_bMKhELCLV_0O3mKtGl
// 3PUIKtTie3bBZBobk2uAYZJnA1W25nMi5fChKzl_bzUXv7ELXOcgnEGBS8KtnS0j1V3xBRyIBXTk8KMnmXLhF_RS
// OxIKMsY208G3WonA","acc":"eyJraWQiOiJFV3l1bmU3d21aOVVkWm02b0VOdlVSNUpIWkFWWkpqUDViN3AyWHhZ
// bW8wPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkM2ViYWE3Yy0zOTkwLTQxZjQtYjJiNi04MmZmMTU2NTI1OTQiL
// CJldmVudF9pZCI6ImZiMmFkZDU2LTlkMjktNGM1NS1hZTRiLTNmMDUzMGRkZTcyMiIsInRva2VuX3VzZSI6ImFjY2V
// zcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1ha
// WwiLCJhdXRoX3RpbWUiOjE2MjUyMjY5ODUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1h
// em9uYXdzLmNvbVwvdXMtZWFzdC0xX0JLbDZ0d0I4MCIsImV4cCI6MTYyNTMxMzM4NSwiaWF0IjoxNjI1MjI2OTg1LCJ
// 2ZXJzaW9uIjoyLCJqdGkiOiJkNjIzZGMzYS00ZDk0LTQxMWEtOTUxNS1hNGYzM2E3NzcyOTciLCJjbGllbnRfaWQiOi
// IxdGc3NWwwMHFybTM4dDZyaWtuc21zYXIybyIsInVzZXJuYW1lIjoiZDNlYmFhN2MtMzk5MC00MWY0LWIyYjYtODJmZj
// E1NjUyNTk0In0.n4qcLwizNZiMx3mReBXt9dmKPD302Ro23g9dSq_z_I_G0AfnNAy4hmP4isAst_CnWT0yx1f-KAQ_PL
// 9QyhzGeEiYi1YEzuFNJo59P25oejf5Ep-2k3qolDB-y1byU2azexlHb6dgBHumOq1KLkAVRELibSqKOLt4eex7DeZn45
// 0dKK0ICI_F6iavPXArF0BdRyHxucowot-O06Pk4svexuOJwPYhf8Ebb62z5Q6zYH2Xn7yh9Fq8l21qCKlUvK3jzEODXY
// mdMKWsc0Bu0XmORPcNbPjzCOi-SUca3etQt1V39apAsLGzIv_W7kL4EFJiwMyGhagpHzbJ-XXnNIiTzA

const endPointDictionary = [
  { route: "admin/orders", type: "GET" },
  {
    route: "admin/orders",
    type: "GET",
    pathParams: [{ name: "accountID", value: 6 }],
  },
  { route: "admin/userCheck", type: "GET" },
  { route: "campaigns", type: "GET" },
  {
    route: "campaigns",
    type: "GET",
    pathParams: [{ name: "campaignID", value: 23 }],
  },
  { route: "groupedItems", type: "GET" },
  {
    route: "groupedItems",
    type: "GET",
    pathParams: [{ name: "itemID", value: 9 }],
  },
  { route: "items", type: "GET" },
  {
    route: "items",
    type: "GET",
    pathParams: [{ name: "itemID", value: 3 }],
  },
  {
    route: "items",
    type: "POST",
    body: {
      name: "test api item",
      description: "my test item",
      mainPicture: "",
      price: 10,
      quantity: 10,
      pictures: [],
      quantityAvailable: 10,
      purchasedFrom: "backend server api",
      weight: 20,
      cost: 1,
      brandingAvailable: false,
    },
  },
  {
    route: "items/tempURL",
    type: "GET",
    queryParams: [
      { name: "pictureName", value: "test-image.png" },
      { name: "itemType", value: "groupedItem" },
      { name: "itemName", value: "test API Image" },
    ],
  },
  {
    route: "orders",
    type: "GET",
    pathParams: [{ name: "campaignID", value: 23 }],
  },
  {
    route: "orders",
    type: "GET",
    pathParams: [
      { name: "campaignID", value: 23 },
      { name: "orderID", value: 18 },
    ],
  },
  { route: "payment/addCard", type: "GET" },
  { route: "payment/listCards", type: "GET" },
  {
    route: "user/login",
    type: "GET",
    testCriteria: [
      {
        key: "validUser",
        value: true,
      },
    ],
  },
  { route: "userList", type: "GET" },
];

const userEmail = process.argv[2];
const authToken = process.argv[3];
const testAllArg = process.argv[4];

console.log("\nEmail: ", userEmail);
console.log("Token: ", authToken ? authToken.slice(0, 10) : "");
console.log("GetOnly / Specific End Point: ", testAllArg);

if (!userEmail || !authToken) {
  console.log(`\nMISSING USER OR TOKEN`);
  process.exit(1);
}

const testAll = testAllArg === "true" ? true : false;
const testingEndpoint =
  testAllArg && testAllArg !== "true" && testAllArg !== "false"
    ? testAllArg
    : "";

const writeLogFile = async (body) => {
  return new Promise((res, rej) => {
    fs.writeFile("log.json", JSON.stringify(body), function (err) {
      if (err) {
        res({ error: "Error Saving", message: err.stack });
      }
      res({ error: "", message: "" });
    });
  });
};

const getEndpointVariable = async (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let myAnswer = "";
  return new Promise((res, rej) => {
    rl.question(`\n ${question}`, (myVariable) => {
      myAnswer = myVariable;
      console.log("o", myAnswer);
      rl.close();
    });

    rl.on("close", () => {
      res(myAnswer);
    });
  });
};

const fetchRequest = async (endpoint, method, body) => {
  return await fetch(
    `${appSettings.backendTestServer}/${endpoint}`,
    method === "GET" || method === "DELETE"
      ? {
          method: method,
          headers: {
            user: userEmail,
            "user-token": authToken,
            "Content-Type": "application/json",
          },
        }
      : {
          method: method ? method : "POST",
          headers: {
            user: userEmail,
            "user-token": authToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
  )
    .then((res) => {
      return res.json();
    })
    .then((suc) => {
      //   console.log("RES JSON: ", suc);
      // return suc.body;
      if ("body" in suc) {
        return suc.body;
      }
      return suc;
    })
    .catch((err) => {
      return { error: "Error", message: err };
    });
};

const Main = async () => {
  //   let myAnswer = await getEndpointVariable("My Question: ");
  //   console.log("\n\nT", myAnswer);

  let errors = [];
  for (let i = 0; i < endPointDictionary.length; i++) {
    const endpoint = endPointDictionary[i];
    if (!testAll && endpoint.type !== "GET") {
      errors.push({
        name: endpoint.route,
        type: endpoint.type,
        error: "skipped",
      });
      continue;
    }
    let endpointRoute = endpoint.route;

    if (endpoint.pathParams) {
      for (let pI = 0; pI < endpoint.pathParams.length; pI++) {
        const param = endpoint.pathParams[pI];
        let value = param.value;
        if (value === undefined || value === null) {
          value = await getEndpointVariable(`What is the ${param.name}: `);
        }

        endpointRoute += `/${value}`;
      }
    }

    if (endpoint.queryParams) {
      endpointRoute += `?`;
      for (let pI = 0; pI < endpoint.queryParams.length; pI++) {
        const param = endpoint.queryParams[pI];
        let value = param.value;
        if (value === undefined || value === null) {
          value = await getEndpointVariable(`What is the ${param.name}: `);
        }

        endpointRoute += `${value}&`;
      }
    }

    console.log("\nChecking: ", endpointRoute, endpoint.type);
    let endPointCheck = await fetchRequest(
      endpointRoute,
      endpoint.type,
      endpoint.body
    );

    if ("message" in endPointCheck) {
      errors.push({
        name: endpointRoute,
        type: endpoint.type,
        error: endPointCheck.message,
      });
    } else if ("error" in endPointCheck && endPointCheck.error) {
      errors.push({
        name: endpointRoute,
        type: endpoint.type,
        error: endPointCheck.error,
      });
    } else {
      console.log("CHECK SUCCESS");
      if (endpoint.testCriteria) {
        let testErrors = [];
        let successMap = endpoint.testCriteria.map((test) => {
          if (!(test.key in endPointCheck)) {
            testErrors.push({
              error: `MISSING: ${test.key}`,
              details: endPointCheck,
            });
          } else if (endPointCheck[test.key] !== test.value) {
            testErrors.push({
              error: `VALUE DIFFERENT FOR "${test.key}": ${test.value}`,
              details: endPointCheck,
            });
          }
        });

        let successResult = await Promise.all(successMap);

        if (testErrors.length > 0) {
          errors.push({
            name: endpointRoute,
            type: endpoint.type,
            error: "Failed Test",
            details: testErrors,
          });
        }
      }
    }
  }

  for (let e = 0; e < errors.length; e++) {
    const error = errors[e];
    console.log(
      `\nEndpoint ${error.error !== "skipped" ? "Failed" : "Skipped"}: `,
      error.name
    );
  }

  if (errors.length > 0) {
    let saveLogs = await writeLogFile(errors);

    console.log("\n\n Logs Saved: ", saveLogs.error);
  } else {
    console.log("\n\nAll Endpoints Passed!!");
  }

  process.exit(0);
};

Main();

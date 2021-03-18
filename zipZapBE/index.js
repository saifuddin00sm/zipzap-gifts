const Koa = require("koa");
const Router = require("koa-router");
const koaBody = require("koa-body");
const cors = require("koa-cors");
// const convert = require("koa-convert");
// const cors = require("koa-cors");
const app = new Koa();
const router = new Router();
const db = require("./database/index");
const gFunctions = require("./genericFunctions");
const qFunctions = require("./queryFunctions");
// const sFunctions = require("./socketFunctions");
// const appSettings = require("./appSettings.json");

app.use(cors());
app.use(koaBody());

const checkCriteria = (criteria, person) => {};

router.get("/", async (ctx, next) => {
  let response = { error: "", data: "Hello" };

  let employees = {
    person1: {
      name: "Kevin Sites",
      birthday: "3/1/21",
      jobTitle: "Assistant Manager",
    },
    person2: {
      name: "Matt Norton",
      birthday: "7/2/20",
      jobTitle: "Manager",
    },
  };

  // let person = {
  //   name: "Kevin Sites",
  //   birthday: "3/1/2",
  //   jobTitle: "Assistant Manager",
  // };

  let myVariableName = "birthday";
  let myVariableValue = true;
  // let myVariableValue = true;

  let myVariableName2 = "campaignDate";
  // let myVariableName2 = "campaignDate";
  let myVariableValue2 = "3/1/2";

  let myVariableName3 = "jobTitle";
  let myVariableValue3 = "Manager";

  let myVariableName4 = "hire date";
  let myVariableValue4 = "3/10/21";

  let criteriaObject = {
    [myVariableName]: myVariableValue,
    [myVariableName2]: myVariableValue2,
    [myVariableName3]: myVariableValue3,
  };

  let filtered = Object.keys(employees).filter((employeeKey) => {
    if (employeeKey === "person1") {
      console.log("PERSON", [employeeKey]);
      return true;
    } else return false;
  });

  let peopleFilter = Object.keys(employees).map(async (employeeKey) => {
    let person = employees[employeeKey];

    let returnTrue = false;
    let found = {
      [myVariableName]: false,
      [myVariableName2]: false,
      [myVariableName3]: false,
    };

    let keyCheck = Object.keys(criteriaObject).map((key) => {
      console.log("TYPE", key, [typeof criteriaObject[key]]);
      if (typeof criteriaObject[key] === "boolean" && key in person) {
        returnTrue = true;
        found[key] = true;
        return true;
      } else if (key === "campaignDate") {
        returnTrue = true;
        found[key] = true;
        return true;
      } else if (key in person && person[key] === criteriaObject[key]) {
        returnTrue = true;
        found[key] = true;
        return true;
      }

      // if (key in person && person[key] === criteriaObject[key]) {
      //   found = true;
      // }
    });

    let keyResult = await Promise.all(keyCheck);
    return returnTrue ? employeeKey : null;
  });

  let peopleFilterResult = await Promise.all(peopleFilter).then((values) => {
    console.log(
      "VALUE",
      values.filter((result) => (result !== null ? true : false))
    );
    return values.filter((result) => (result !== null ? true : false));
  });

  response.employees = peopleFilterResult;

  // response.found = found;
  response.test = criteriaObject;
  response[myVariableName] = myVariableValue;
  ctx.body = response;
  return ctx;
});

// ADMIN ENDPOINTS
router.get("/admin/features", async (ctx) => {
  let response = { error: "", features: {}, users: [] };
});

router.get("/admin/userCheck", async (ctx) => {
  // let response = { error: "", features: {}, users: [] };

  let response = await qFunctions.getAdminUsers(ctx.headers.user);
  ctx.body = response;
  return ctx;
});

// ADMIN ORDERS

// get all accounts that have orders for the week
router.get("/admin/orders", async (ctx) => {
  let response = {
    error: "",
    accounts: [],
    dates: {
      lastSunday: "",
      nextSunday: "",
    },
  };
  let { lastSunday, nextSunday } = gFunctions.getLastSunday();

  // get orders and campaigns #'s
  // let weekOrders = await qFunctions.getWeekOrders(lastSunday, nextSunday);
  let weekOrders = await qFunctions.getWeekAccounts(lastSunday, nextSunday);
  console.log("WE", weekOrders);

  if (weekOrders.error) {
    response.error = weekOrders.error;
    ctx.body = response;
    return ctx;
  }

  // get all campaign user lists and filter out to only get the users
  // TO-DO - AWS READ
  // let userListPromise = Object.keys(response.campaignList).map(
  //   async (campaignID) => {
  //     // TO-DO - switch to AWS
  //     let filePath = `./testData/campaigns/${campaignID}/orders.json`;
  //     let campaignOrders = gFunctions.openLocalJSONFile(filePath);
  //   }
  // );

  response.accounts = weekOrders.accounts;
  response.dates = { lastSunday, nextSunday };
  ctx.body = response;
  return ctx;
});

// get all orders for the current week
router.get("/admin/orders/:accountID", async (ctx) => {
  let response = {
    error: "",
    campaignList: {},
    orders: [],
    accountUsers: { activeUsers: {}, inActiveUsers: {} },
    dates: {
      lastSunday: "",
      nextSunday: "",
    },
  };
  let { lastSunday, nextSunday } = gFunctions.getLastSunday();

  let params = ctx.params;

  // get orders and campaigns #'s
  // let weekOrders = await qFunctions.getWeekOrders(lastSunday, nextSunday);
  let weekOrders = await qFunctions.getWeekOrders(
    lastSunday,
    nextSunday,
    params.accountID
  );

  if (weekOrders.error) {
    response.error = weekOrders.error;
    ctx.body = response;
    return ctx;
  }

  // get user list for account
  // TO-DO - AWS READ
  let filePath = `./testData/accounts/${params.accountID}/masterList.json`;
  let accountUsers = await gFunctions.openLocalJSONFile(filePath);

  if (accountUsers.error || !accountUsers.exists) {
    response.error = accountUsers.error
      ? accountUsers.error
      : "Error Getting Account Users";
    ctx.body = response;
    return ctx;
  }

  response.accountUsers = accountUsers.data;
  response.orders = weekOrders.orders;
  response.dates = { lastSunday, nextSunday };

  // maybe unneeded?
  response.campaignList = weekOrders.campaignList;

  ctx.body = response;
  return ctx;
});

// ADMIN ITEMS ENDPOINTS
// get all items
router.get("/items", async (ctx, next) => {
  let response = await qFunctions.getAllItems();

  ctx.body = response;
  return ctx;
});

// get one item  - requires itemID
router.get("/items/:itemID", async (ctx, next) => {
  let response = await qFunctions.getItems(ctx.params.itemID);

  ctx.body = response;
  return ctx;
});

// create new item  - requires All fields
router.post("/items", async (ctx, next) => {
  let body = ctx.request.body;

  let response = await qFunctions.addItem(body);

  ctx.body = response;
  return ctx;
});

// update one item - requires All fields
router.put("/items/:itemID", async (ctx, next) => {
  let body = ctx.request.body;

  let response = await qFunctions.updateItem(body, ctx.params.itemID);

  ctx.body = response;
  return ctx;
});

// Delete one item - requires itemID - deactivates does not delete
router.delete("/items/:itemID", async (ctx, next) => {
  let response = await qFunctions.deactivateItem(ctx.params.itemID);

  ctx.body = response;
  return ctx;
});

// ADMIN GROUPED ITEMS ENDPOINTS
// get all  grouped items
router.get("/groupedItems", async (ctx, next) => {
  let response = await qFunctions.getAllGroupedItems();

  ctx.body = response;
  return ctx;
});

// get one grouped item
router.get("/groupedItems/:itemID", async (ctx, next) => {
  let response = await qFunctions.getGroupedItems(ctx.params.itemID);

  ctx.body = response;
  return ctx;
});

// create new grouped item
router.post("/groupedItems", async (ctx, next) => {
  let body = ctx.request.body;

  let response = await qFunctions.addGroupedItem(body);

  ctx.body = response;
  return ctx;
});

// update one grouped item - requires All fields
router.put("/groupedItems/:itemID", async (ctx, next) => {
  let body = ctx.request.body;

  let response = await qFunctions.updateGroupedItem(body, ctx.params.itemID);

  ctx.body = response;
  return ctx;
});

// Delete one grouped item - requires itemID - deactivates does not delete
router.delete("/groupedItems/:itemID", async (ctx, next) => {
  let response = await qFunctions.deactivateGroupedItem(ctx.params.itemID);

  ctx.body = response;
  return ctx;
});

// CAMPAIGN ENDPOINTS - TO-DO - Query by USER
// get all user campaigns - ordered by campaign start date, then archived
router.get("/campaigns", async (ctx, next) => {
  let response = await qFunctions.getAllCampaigns();

  ctx.body = response;
  return ctx;
});

// create new campaign - with user list
router.post("/campaigns", async (ctx, next) => {
  // EXAMPLE BODY:
  // {
  //   name:"my campaign",
  //   criteria:{
  //     campaignDate:"3/19/2021"
  //   },
  //   startDate:"03/12/21",
  //   endDate:"03/19/21",
  //   userList:["user-1", "user-2"]
  //   defaultItemID: itemID - OR NULL if grouped
  //   defaultGroupedItemID:groupedItemID - OR NULL if single item
  // }

  let body = ctx.request.body;

  let response = await qFunctions.addCampaign(body);
  ctx.body = response;
  return ctx;
});

// TO-DO - AWS READ
// get single campaign and get order list from S3
router.get("/campaigns/:campaignID", async (ctx, next) => {
  let response = { error: "", campaign: {}, orders: {} };
  let campaignData = qFunctions.getCampaignData(ctx.params.campaignID);

  // TO-DO - switch to AWS
  let filePath = `./testData/campaigns/${ctx.params.campaignID}/orders.json`;
  let campaignOrders = gFunctions.openLocalJSONFile(filePath);

  let campaignPromises = await Promise.all([campaignData, campaignOrders]).then(
    (values) => {
      campaignData = values[0];
      campaignOrders = values[1];
    }
  );

  response.campaign = campaignData.campaign;
  response.orders = campaignOrders.data;

  response.error = campaignData.error
    ? campaignData.error
    : campaignOrders.error || !campaignOrders.exists
    ? "Error getting campaign orders."
    : "";

  ctx.body = response;
  return ctx;
});

// update single campaign - i.d. name, start, end date, user list, default item, default group
router.put("/campaigns/:campaignID", async (ctx) => {
  let body = ctx.request.body;

  // EXAMPLE BODY
  // {
  //   "campaignID": 3,
  //   "name": "March Gift edit",
  //   "criteria": {
  //       "campaignDate": "3/19/2021"
  //   },
  //   "startDate": "2021-03-12T07:00:00.000Z",
  //   "endDate": "2021-03-19T06:00:00.000Z",
  //   "archived": false,
  //   "endEarly": false,
  //   "userList": [
  //       "user-1",
  //       "user-2"
  //   ],
  //   "defaultItemID": 1,
  //   "defaultGroupedItemID": null
  // }

  let response = await qFunctions.updateCampaignData(
    body,
    ctx.params.campaignID
  );

  ctx.body = response;
  return ctx;
});

// CAMPAIGN ORDER ENDPOINTS - TO-DO - Query by USER, AWS READ
// create order list file for campaign
router.post("/campaigns/order/:campaignID", async (ctx) => {
  let response = { error: "", saved: false };
  let body = ctx.request.body;

  console.log("HERE");

  // EXAMPLE BODY - create entire list
  // {
  //   orders:{
  //     "0":{
  //       "orderID":"501",
  //       "cost": 45,
  //       "shipping": "1153 north 240 east orem utah 84057",
  //       "giftee": 0,
  //       "campaignID": 123,
  //       "groupedID": 23, - or null if giftID
  //       "giftID": 2, - or null if groupedID
  //       "notes": "Thank you for being such an amazing employee, I really don't know how I could do it without you!",
  //       "shippingFee": 5.90
  //     },
  //     "1":{
  //       "orderID":"501",
  //       "cost": 45,
  //       "shipping": "1153 north 240 east orem utah 84057",
  //       "giftee": 0,
  //       "campaignID": 123,
  //       "groupedID": 23, - or null if giftID
  //       "giftID": 2, - or null if groupedID
  //       "notes": "Thank you for being such an amazing employee, I really don't know how I could do it without you!",
  //       "shippingFee": 5.90
  //     },
  //     ...
  //   },
  //   currentOrderList:["0", "1", ...console.]
  // }

  // TO-DO - switch to AWS
  let filePath = `./testData/campaigns/${ctx.params.campaignID}/orders.json`;

  let saved = await gFunctions.writeFile(filePath, body.orders, true);

  // TO-DO - Add This Months Orders to DB
  let failed = [];
  let completed = [];
  let dbSavedOrders = body.currentOrderList.map(async (orderID) => {
    let saved = await qFunctions.addOrder(body.orders[orderID]);

    if (saved.error) {
      failed.push({
        orderID: orderID,
        error: saved.error,
        body: body.orders[orderID],
      });
    } else {
      completed.push(saved.orderID);
    }
  });

  let dbOrderResults = await Promise.all(dbSavedOrders);

  response.saved = saved;
  response.failed = failed;
  response.completed = completed;

  ctx.body = response;
  return ctx;
});

// update single order on campaign
router.put("/campaigns/order/:campaignID", async (ctx) => {
  let response = { error: "", saved: false, orderID: null };
  let body = ctx.request.body;

  // EXAMPLE BODY - will either replace or add new user
  // {
  //   user:{
  //     "orderID":"501",
  //     "cost": 4,
  //     "shipping": "1153 north 240 east orem utah 84057",
  //     "giftee": 0,
  //     "campaignID": 123,
  //     "grouped": 23,
  //     "notes": "Thank you for being such an amazing employee, I really don't know how I could do it without you!",
  //     "shippingFee": 4.5
  //   }
  // }

  // TO-DO - switch to AWS
  let filePath = `./testData/campaigns/${ctx.params.campaignID}/orders.json`;
  let campaignOrders = await gFunctions.openLocalJSONFile(filePath);

  if (campaignOrders.error || !campaignOrders.exists) {
    console.log("CAMP", campaignOrders.error, filePath);
    response.error = "Error updating campaign orders.";
    ctx.body = response;
    return ctx;
  }

  campaignOrders.data[body.user.orderID] = body.user;

  let saved = await gFunctions.writeFile(filePath, campaignOrders.data, false);

  response.saved = saved;

  // TO-DO - update DB row if applicable
  let rowUpdate = await qFunctions.editOrder(
    body.user,
    body.user.campaignID,
    body.user.orderID
  );

  if (rowUpdate.error) {
    response.error = rowUpdate.error;
    ctx.body = response;
    return ctx;
  }

  response.orderID = rowUpdate.orderID;

  ctx.body = response;
  return ctx;
});

// TESTING PURPOSE

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
router.post("/test", async (ctx) => {
  let response = { saved: false, items: [] };

  // let newArray = Array(10);

  // let personDict = ctx.request.body;
  let personDict = {};

  let names = [
    "Kevin Sites",
    "Krista Humphrey",
    "Victoria Black",
    "Kolby Beck",
  ];

  let jobs = ["CEO", "Manager", "Director", "Developer"];

  let arrayPromise = [...Array(60).keys()].map((person, pIndex) => {
    personDict[pIndex] = {
      Name: names[getRandomInt(0, 3)],
      Birthday: `${getRandomInt(1, 12)}/${getRandomInt(1, 28)}/21`,
      "Job Title": jobs[getRandomInt(0, 3)],
    };
  });

  let arrayResult = await Promise.all(arrayPromise);

  console.log("HERE", personDict);

  let saved = await gFunctions.writeFile("testArray2.json", personDict, true);

  response.saved = saved;
  // response.items = newArray;

  ctx.body = response;
  return ctx;
});

app.use(router.routes());
exports.server = app;

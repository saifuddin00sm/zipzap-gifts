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
const appSettings = require("./appSettings.json");

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

// AWS COMPLETE - PERMISSIONED - MOVE TO USER LIST
router.get("/admin/userCheck", async (ctx) => {
  // let response = { error: "", features: {}, users: [] };

  let response = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.adminLogin
  );
  // let response = await qFunctions.getAdminUsers(ctx.headers.user);
  ctx.body = response;
  return ctx;
});

// ADMIN ORDERS
// AWS COMPLETE - PERMISSIONED
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

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.adminGetOrders
  );

  if (allowed.error || !allowed.allowed) {
    response.error = "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  let { lastSunday, nextSunday } = gFunctions.getLastSunday();

  // get orders and campaigns #'s
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

// TO-DO - AWS Permission
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

  if (accountUsers.error) {
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

// ITEMS ENDPOINTS - Admin and Regular
// AWS COMPLETE - PERMISSIONED
// get all items
router.get("/items", async (ctx, next) => {
  let query = ctx.query;
  let response = { error: "", items: {} };

  let allowed = { allowed: false };
  if (query.admin) {
    allowed = await gFunctions.endPointAuthorize(
      ctx.headers.user,
      appSettings.features.adminGetItems
    );
  } else {
    allowed = await gFunctions.endPointAuthorize(
      ctx.headers.user,
      appSettings.features.userGetItems
    );
  }
  if (!allowed.allowed) {
    response.error = "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  response = await qFunctions.getAllItems(query.admin);

  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
// get one item  - requires itemID
router.get("/items/:itemID", async (ctx, next) => {
  let response = { error: "", item: {} };

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.userGetItem
  );
  if (!allowed.allowed) {
    response.error = "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  response = await qFunctions.getItems(ctx.params.itemID);

  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
router.get("/items/tempURL", async (ctx, next) => {
  let query = ctx.query;
  // Required Query Params
  // pictureName:string
  // itemType:string - can be "item" or "groupedItem"
  // itemName:string

  let response = { error: "", itemURL: "", itemPath: "" };

  let { pictureName, itemType, itemName } = query;

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.adminAddItem
  );

  if (!allowed.allowed) {
    response.error = "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  let itemPath = `${itemType}/${itemName}/${pictureName}`;
  let URL = await gFunctions.getAWSPreSignedURL(itemPath, 10, true);

  if (URL.error) {
    response.error = "Problem Creating Item, Please Contact Support";
    ctx.body = response;
    return ctx;
  }

  response.itemPath = itemPath;
  response.itemURL = URL.url;

  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
// create new item  - requires All fields
router.post("/items", async (ctx, next) => {
  let body = ctx.request.body;

  let response = { error: "", itemsID: "" };

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.adminAddItem
  );

  if (!allowed.allowed) {
    response.error = "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  console.log("B", body);

  response.body = body;

  // response = await qFunctions.addItem(body);

  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
// update one item - requires All fields
router.put("/items/:itemID", async (ctx, next) => {
  let body = ctx.request.body;
  let response = { error: "", itemsID: "" };

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.adminUpdateItem
  );

  if (!allowed.allowed) {
    response.error = "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  response = await qFunctions.updateItem(body, ctx.params.itemID);

  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
// Delete one item - requires itemID - deactivates does not delete
router.delete("/items/:itemID", async (ctx, next) => {
  let response = { error: "", itemsID: "" };

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.adminRemoveItem
  );
  if (!allowed.allowed) {
    response.error = "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  response = await qFunctions.deactivateItem(ctx.params.itemID);

  ctx.body = response;
  return ctx;
});

// ADMIN GROUPED ITEMS ENDPOINTS
// AWS COMPLETE - PERMISSIONED
// get all  grouped items
router.get("/groupedItems", async (ctx, next) => {
  let query = ctx.query;

  let response = { error: "", items: {} };

  let allowed = { allowed: false, userEmail: "" };
  if (query.admin) {
    allowed = await gFunctions.endPointAuthorize(
      ctx.headers.user,
      appSettings.features.adminGetGroupedItems
    );
  } else {
    allowed = await gFunctions.endPointAuthorize(
      ctx.headers.user,
      appSettings.features.userGetGroupedItems
    );
  }
  if (!allowed.allowed) {
    response.error = "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  response = await qFunctions.getAllGroupedItems(
    query.admin,
    allowed.userEmail
  );

  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
// get one grouped item
router.get("/groupedItems/:itemID", async (ctx, next) => {
  let response = { error: "", item: {} };

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.userGetGroupedItem
  );
  if (!allowed.allowed) {
    response.error = "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  response = await qFunctions.getGroupedItems(ctx.params.itemID);

  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
// create new grouped item
router.post("/groupedItems", async (ctx, next) => {
  let body = ctx.request.body;
  let query = ctx.query;

  let response = { error: "", itemsID: null };

  let allowed = { allowed: false, userEmail: "" };
  if (query.admin) {
    allowed = await gFunctions.endPointAuthorize(
      ctx.headers.user,
      appSettings.features.adminAddGroupedItem
    );
  } else {
    allowed = await gFunctions.endPointAuthorize(
      ctx.headers.user,
      appSettings.features.userAddGroupedItem
    );
  }
  if (!allowed.allowed) {
    response.error = "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  if (!query.admin) {
    let userEmail = gFunctions.hashString(ctx.headers.user).result;
    let accountData = await qFunctions.getAccountData(userEmail);

    if (accountData.error) {
      response.error = accountData.error;
      ctx.body = response;
      return ctx;
    }

    body.account = accountData.account.accountID;
  }

  response = await qFunctions.addGroupedItem(body);

  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
// update one grouped item - requires All fields
router.put("/groupedItems/:itemID", async (ctx, next) => {
  let body = ctx.request.body;

  let response = { error: "", itemsID: null };

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.adminUpdateGroupedItem
  );

  if (!allowed.allowed) {
    response.error = "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  response = await qFunctions.updateGroupedItem(body, ctx.params.itemID);

  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
// Delete one grouped item - requires itemID - deactivates does not delete
router.delete("/groupedItems/:itemID", async (ctx, next) => {
  let response = { error: "", itemsID: null };

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.adminDeleteGroupedItem
  );

  if (!allowed.allowed) {
    response.error = "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  response = await qFunctions.deactivateGroupedItem(ctx.params.itemID);

  ctx.body = response;
  return ctx;
});

// CAMPAIGN ENDPOINTS
// AWS COMPLETE - PERMISSIONED
// get all user campaigns - ordered by campaign start date, then archived
router.get("/campaigns", async (ctx, next) => {
  let response = { error: "", campaigns: {} };
  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.getCampaigns
  );
  if (allowed.error || !allowed.allowed) {
    response.error = allowed.error ? allowed.error : "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  response = await qFunctions.getAllCampaigns(allowed.userEmail);

  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
// create new campaign
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

  let response = { error: "", campaignID: null };
  let body = ctx.request.body;

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.addCampagin
  );
  if (allowed.error || !allowed.allowed) {
    response.error = allowed.error ? allowed.error : "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  response = await qFunctions.addCampaign(body, allowed.userEmail);
  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
// get single campaign and get order list from S3
router.get("/campaigns/:campaignID", async (ctx, next) => {
  let response = { error: "", campaign: {}, orders: {} };
  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.getCampaigns
  );
  if (allowed.error || !allowed.allowed) {
    response.error = allowed.error ? allowed.error : "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  let campaignData = await qFunctions.getCampaignData(
    ctx.params.campaignID,
    allowed.userEmail
  );

  if (campaignData.error) {
    response.error = campaignData.error;
    ctx.body = response;
    return ctx;
  }

  // let filePath = `./testData/campaigns/${ctx.params.campaignID}/orders.json`;
  // let campaignOrders = gFunctions.openLocalJSONFile(filePath);

  let filePath = `campaigns/${campaignData.campaign.campaignID}/orders.json`;
  let campaignOrders = await gFunctions.readAWSJsonFile(filePath);

  // let campaignPromises = await Promise.all([campaignData, campaignOrders]).then(
  //   (values) => {
  //     campaignData = values[0];
  //     campaignOrders = values[1];
  //   }
  // );

  response.campaign = campaignData.campaign;
  response.orders = campaignOrders.data;

  response.error = campaignData.error
    ? campaignData.error
    : campaignOrders.error
    ? "Error getting campaign orders."
    : "";

  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
// update single campaign - i.d. name, start, end date, user list, default item, default group
router.put("/campaigns/:campaignID", async (ctx) => {
  let response = { error: "", campaignID: null };
  let body = ctx.request.body;
  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.updateCampaign
  );
  if (allowed.error || !allowed.allowed) {
    response.error = allowed.error ? allowed.error : "Unauthorized";
    ctx.body = response;
    return ctx;
  }

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

  let campaignData = await qFunctions.getCampaignData(
    ctx.params.campaignID,
    allowed.userEmail
  );

  if (campaignData.error) {
    response.error = campaignData.error;
    ctx.body = response;
    return ctx;
  }

  response = await qFunctions.updateCampaignData(
    body,
    campaignData.campaign.campaignID,
    allowed.userEmail
  );

  ctx.body = response;
  return ctx;
});

// CAMPAIGN ORDER ENDPOINTS

// AWS COMPLETE - PERMISSIONED
// get all orders for the month - with weekOnly query Param only get DB rows
router.get("/orders/all", async (ctx) => {
  let response = {
    error: "",
    campaignOrders: {},
    firstDay: "",
    lastDay: "",
    dateOrders: {},
  };

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.getOrdersDB
  );
  if (allowed.error || !allowed.allowed) {
    response.error = allowed.error ? allowed.error : "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  let { firstDay, lastDay } = gFunctions.getMonthSunday();
  let accountData = await qFunctions.getAccountData(allowed.userEmail);

  if (accountData.error) {
    response.error = accountData.error;
    ctx.body = response;
    return ctx;
  }

  let orders = await qFunctions.getWeekOrders(
    firstDay,
    lastDay,
    allowed.account.accountID,
    true,
    true
  );

  response.campaignOrders = orders.orderObject;
  response.dateOrders = orders.dateObject;
  response.firstDay = firstDay;
  response.lastDay = lastDay;

  ctx.body = response;
  return ctx;
});

/// AWS COMPLETE - PERMISSIONED
router.get("/orders/past", async (ctx) => {
  let response = {
    error: "",
    dateOrders: {},
  };

  let query = ctx.query;

  let month = query.month;
  let year = query.year;
  let getAll = query.all;

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.getOrdersPrevious
  );
  if (allowed.error || !allowed.allowed) {
    response.error = allowed.error ? allowed.error : "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  if (!month || !year) {
    let { firstDay } = gFunctions.getMonthSunday();

    if (!month) {
      month = new Date(firstDay).getMonth().toString();
    }

    if (!year) {
      year = new Date(firstDay).getFullYear().toString();
    }
  }

  let campaigns = await qFunctions.getAllCampaigns(allowed.userEmail);

  if (campaigns.error) {
    response.error = campaigns.error;
    ctx.body = response;
    return ctx;
  }

  // EXAMPLE All ORDERS
  // {
  //   monthID:{
  //     campaignID:{
  //       orderID:eventOrder
  //     }
  //   }
  // }

  let allOrders = {};

  let error = {};

  let campaignPromise = Object.keys(campaigns.campaigns).map(
    async (campaignID) => {
      let campaign = campaigns.campaigns[campaignID];

      let filePath = `campaigns/${campaignID}/orders.json`;
      let userList = await gFunctions.readAWSJsonFile(filePath);

      if (userList.error) {
        error = userList.error;
        return false;
      }

      // allOrders[campaignID] = {};

      let orderMap = Object.keys(userList.data).map((orderID) => {
        let order = userList.data[orderID];

        let orderMonth = new Date(order.shippingDate).getMonth();
        let orderYear = new Date(order.shippingDate).getFullYear();

        if (
          getAll ||
          (month === orderMonth.toString() && year === orderYear.toString())
        ) {
          if (!(orderMonth in allOrders)) {
            allOrders[orderMonth] = {};
          }

          if (!(campaignID in allOrders[orderMonth])) {
            allOrders[orderMonth][campaignID] = {};
          }

          allOrders[orderMonth][campaignID][orderID] = order;
        }
      });

      let orderResult = await Promise.all(orderMap);
    }
  );

  let campaignResult = await Promise.all(campaignPromise);

  response.dateOrders = allOrders;
  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
// get all orders on campaign - with weekOnly query Param only get DB rows
router.get("/orders/:campaignID", async (ctx) => {
  let response = { error: "", campaignOrders: {} };

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.getOrdersDB
  );
  if (allowed.error || !allowed.allowed) {
    response.error = allowed.error ? allowed.error : "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  let campaignData = await qFunctions.getCampaignData(
    ctx.params.campaignID,
    allowed.userEmail
  );

  if (campaignData.error) {
    response.error = campaignData.error;
    ctx.body = response;
    return ctx;
  }

  // let filePath = `./testData/campaigns/${ctx.params.campaignID}/orders.json`;
  // let campaignOrders = await gFunctions.openLocalJSONFile(filePath);

  let filePath = `campaigns/${campaignData.campaign.campaignID}/orders.json`;
  let campaignOrders = await gFunctions.readAWSJsonFile(filePath);

  if (campaignOrders.error) {
    response.error = "Error updating campaign orders.";
    ctx.body = response;
    return ctx;
  }
  response.campaignOrders = campaignOrders.data;

  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
// create order list file for campaign
router.post("/orders/:campaignID", async (ctx) => {
  let response = { error: "", saved: false };
  let body = ctx.request.body;

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.addOrders
  );
  if (allowed.error || !allowed.allowed) {
    response.error = allowed.error ? allowed.error : "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  let campaignData = await qFunctions.getCampaignData(
    ctx.params.campaignID,
    allowed.userEmail
  );

  if (campaignData.error) {
    response.error = campaignData.error;
    ctx.body = response;
    return ctx;
  }

  // EXAMPLE BODY - create entire list
  // {
  //   orders:{
  //     "0":{
  //       "orderID":"501",
  //       "cost": 45,
  //       "shippingAddress": "1153 north 240 east",
  //       "shippingCity": "Orem",
  //       "shippingState": "UT",
  //       "shippingZip": "84057",
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
  //       "shippingAddress": "1153 north 240 east",
  //       "shippingCity": "Orem",
  //       "shippingState": "UT",
  //       "shippingZip": "84057",
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

  let filePath = `campaigns/${campaignData.campaign.campaignID}/orders.json`;
  // let filePath = `./testData/campaigns/${ctx.params.campaignID}/orders.json`;

  let saved = await gFunctions.writeAWSFile(filePath, body.orders);
  // let saved = await gFunctions.writeFile(filePath, body.orders, true);

  // TO-DO - Add This Months Orders to DB

  let removedTempOrders = await qFunctions.removeOldTempOrders(
    campaignData.campaign.campaignID,
    body.currentOrderList
  );

  if (removedTempOrders.error) {
    response.error = removedTempOrders.error;
    ctx.body = response;
    return ctx;
  }

  let failed = [];
  let completed = [];
  let alreadySent = [];
  let dbSavedOrders = body.currentOrderList.map(async (orderID) => {
    if (
      removedTempOrders.updatedRows.length > 0 &&
      removedTempOrders.updatedRows.includes(orderID)
    ) {
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
    } else {
      alreadySent.push(orderID);
    }
  });

  let dbOrderResults = await Promise.all(dbSavedOrders);

  response = saved;
  response.failed = failed;
  response.completed = completed;
  response.alreadySent = alreadySent;

  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
// update single order on campaign
router.put("/orders/:campaignID", async (ctx) => {
  let response = { error: "", saved: false, orderID: null };
  let body = ctx.request.body;

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.updateOrders
  );
  if (allowed.error || !allowed.allowed) {
    response.error = allowed.error ? allowed.error : "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  let campaignData = await qFunctions.getCampaignData(
    ctx.params.campaignID,
    allowed.userEmail
  );

  if (campaignData.error) {
    response.error = campaignData.error;
    ctx.body = response;
    return ctx;
  }

  // EXAMPLE BODY - will either replace or add new user
  // {
  //   user:{
  //       "orderID":"501",
  //       "cost": 45,
  //       "shippingAddress": "1153 north 240 east",
  //       "shippingCity": "Orem",
  //       "shippingState": "UT",
  //       "shippingZip": "84057",
  //       "giftee": 0,
  //       "campaignID": 123,
  //       "groupedID": 23, - or null if giftID
  //       "giftID": 2, - or null if groupedID
  //       "notes": "Thank you for being such an amazing employee, I really don't know how I could do it without you!",
  //       "shippingFee": 5.90
  //   },
  //   oneTime?:boolean
  //   oneTimeDB?:boolean
  // }

  // TO-DO - switch to AWS

  // let filePath = `./testData/campaigns/${ctx.params.campaignID}/orders.json`;
  // let campaignOrders = await gFunctions.openLocalJSONFile(filePath);

  let filePath = `campaigns/${campaignData.campaign.campaignID}/orders.json`;
  let campaignOrders = await gFunctions.readAWSJsonFile(filePath);

  if (
    "code" in campaignOrders.error &&
    campaignOrders.error.code.includes("NoSuchKey")
  ) {
    campaignOrders.data = {};
    campaignOrders.error = "";
  }

  if (campaignOrders.error) {
    response.error = "Error updating campaign orders.";
    ctx.body = response;
    return ctx;
  }

  if (body.oneTime) {
    // console.log("ONE", body.oneTime);
    let order = campaignOrders.data[body.user.orderID];
    if (order && order.giftee === body.user.giftee) {
      // console.log("same", body.user.orderID, body.user.giftee, order.giftee);
      campaignOrders.data[body.user.orderID] = body.user;
    } else {
      let orderTotal = Object.keys(campaignOrders.data).length;

      body.user.orderID = orderTotal + 1;

      // console.log("new", orderTotal, campaignOrders.data);

      campaignOrders.data[orderTotal + 1] = body.user;
    }
  } else {
    campaignOrders.data[body.user.orderID] = body.user;
  }

  let saved = await gFunctions.writeAWSFile(filePath, campaignOrders.data);
  // let saved = await gFunctions.writeFile(filePath, campaignOrders.data, false);

  response.saved = saved.saved;

  // TO-DO - update DB row if applicable
  let rowUpdate = { error: "", orderID: null };
  if (body.oneTime) {
    if (body.oneTimeDB) {
      rowUpdate = await qFunctions.addOrder(body.user);
    }
  } else {
    rowUpdate = await qFunctions.editOrder(
      body.user,
      body.user.campaignID,
      body.user.orderID
    );
  }

  if (rowUpdate.error !== "No Order Found") {
    response.error = rowUpdate.error;
    ctx.body = response;
    return ctx;
  }
  response.orderID = rowUpdate.orderID;

  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
// get single order on campaign
// TO-Do - Maybe get orders from DB to get shipping info?
router.get("/orders/:campaignID/:orderID", async (ctx) => {
  let response = { error: "", order: null };

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.getOrdersList
  );
  if (allowed.error || !allowed.allowed) {
    response.error = allowed.error ? allowed.error : "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  let campaignData = await qFunctions.getCampaignData(
    ctx.params.campaignID,
    allowed.userEmail
  );

  if (campaignData.error) {
    response.error = campaignData.error;
    ctx.body = response;
    return ctx;
  }

  // let filePath = `./testData/campaigns/${ctx.params.campaignID}/orders.json`;
  // let campaignOrders = await gFunctions.openLocalJSONFile(filePath);

  let filePath = `campaigns/${campaignData.campaign.campaignID}/orders.json`;
  let campaignOrders = await gFunctions.readAWSJsonFile(filePath);

  if (campaignOrders.error) {
    console.log("CAMP", campaignOrders.error, filePath);
    response.error = "Error getting order.";
    ctx.body = response;
    return ctx;
  }

  // TO-DO - test if slower than DB grab
  response.order = campaignOrders.data[ctx.params.orderID];
  ctx.body = response;
  return ctx;
});

// USER LIST ENDPOINTS

// AWS COMPLETE - PERMISSIONED
// get master list of users for account
router.get("/userList", async (ctx) => {
  let response = { error: "", users: { activeUsers: {}, inActiveUsers: {} } };

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.getRecipientList
  );
  if (allowed.error || !allowed.allowed) {
    response.error = allowed.error ? allowed.error : "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  // TO-DO - switch to AWS
  let filePath = `./testData/accounts/${allowed.account.accountID}/masterList.json`;
  let accountMasterList = await gFunctions.openLocalJSONFile(filePath);

  // let filePath = `accounts/${accountData.account.accountID}/masterList.json`;
  // let accountMasterList = await gFunctions.readAWSJsonFile(filePath);

  if (accountMasterList.error) {
    response.error = accountMasterList.error;
    ctx.body = response;

    return response;
  }

  response.users = accountMasterList.data;
  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
const DataFrame = require("dataframe-js").DataFrame;
router.post("/user/masterList", async (ctx) => {
  let body = ctx.request.body;

  // EXAMPLE BODY
  // {
  //   fileName: "",
  // }

  if (!body.fileName) {
    response.error = "Missing Requirements";
    ctx.body = response;
    return ctx;
  }

  let response = { error: "", url: "" };

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.addRecipientList
  );
  if (allowed.error || !allowed.allowed) {
    response.error = allowed.error ? allowed.error : "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  let filePath = `accounts/${allowed.account.accountID}/uploads/${body.fileName}`;
  response = await gFunctions.getAWSPreSignedURL(filePath, 10, true);

  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
router.put("/user/masterList", async (ctx) => {
  let response = {
    error: "",
    users: { activeUsers: {}, inActiveUsers: {} },
    newUserIds: [],
    totalRows: 0,
  };

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.addRecipientList
  );
  if (allowed.error || !allowed.allowed) {
    response.error = allowed.error ? allowed.error : "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  // TO-DO - AWS READ
  let filePath = `accounts/${allowed.account.accountID}/uploads/${body.fileName}`;

  let getPresignedFileURL = await gFunctions.getAWSPreSignedURL(filePath);

  if (getPresignedFileURL.error) {
    console.log("FILE PROCESS s3 ERROR", getPresignedFileURL);
    response.error = "Error with uploaded file, please contact support";
    ctx.body = response;
    return ctx;
  }

  // changed to s3
  let masterListFilePath = `./testData/accounts/${allowed.account.accountID}/masterList.json`;
  let oldFile = await gFunctions.openLocalJSONFile(masterListFilePath);

  let users = {
    activeUsers: {},
    inActiveUsers: {},
  };
  if (oldFile.exists) {
    users = oldFile.data;
  }

  // REQUIRED FIELDS
  // First Name
  // Last Name
  // Department
  // Title
  // Birthday
  // Date Started
  // Address
  // City
  // State (2 Char)
  // Zip

  let userCount =
    Object.keys(users.activeUsers).length +
    Object.keys(users.inActiveUsers).length;

  let newUserIds = [];
  let totalRows = 0;

  let df = await DataFrame.fromCSV(filePath).then(async (df) => {
    let columns = df.listColumns();
    let allMapping = df.map(async (row, rIndex) => {
      // find total row count
      totalRows = rIndex + 1;

      let rowDict = row.toDict();
      let newUser = {};
      let userMap = columns.map((columnName, cIndex) => {
        let newColumn = columnName;
        if (newColumn.toLowerCase().includes("first name")) {
          newColumn = "First Name";
        } else if (newColumn.toLowerCase().includes("last name")) {
          newColumn = "Last Name";
        } else if (
          newColumn.toLowerCase().includes("birthday") ||
          newColumn.toLowerCase().includes("birthdate") ||
          newColumn.toLowerCase().includes("date of birth")
        ) {
          newColumn = "Birthday";
        } else if (
          newColumn.toLowerCase().includes("address") ||
          newColumn.toLowerCase().includes("street address") ||
          newColumn.toLowerCase().includes("home address")
        ) {
          newColumn = "Address";
        } else if (
          newColumn.toLowerCase().includes("city") ||
          newColumn.toLowerCase().includes("town")
        ) {
          newColumn = "City";
        } else if (newColumn.toLowerCase().includes("state")) {
          newColumn = "State";
        } else if (
          newColumn.toLowerCase().includes("zip") ||
          newColumn.toLowerCase().includes("zip code") ||
          newColumn.toLowerCase().includes("postal code")
        ) {
          newColumn = "Zip";
        } else if (
          newColumn.toLowerCase().includes("job title") ||
          newColumn.toLowerCase().includes("position") ||
          newColumn.toLowerCase().includes("title")
        ) {
          newColumn = "Title";
        } else if (
          newColumn.toLowerCase().includes("start date") ||
          newColumn.toLowerCase().includes("date started") ||
          newColumn.toLowerCase().includes("job anniversary") ||
          newColumn.toLowerCase().includes("work anniversary")
        ) {
          newColumn = "Date Started";
        } else if (
          newColumn.toLowerCase().includes("group") ||
          newColumn.toLowerCase().includes("department")
        ) {
          newColumn = "Department";
        }

        // newColumn = newColumn.replace(" ", "");
        newUser[newColumn] = rowDict[columnName];
      });

      let userResult = await Promise.all(userMap);

      if (!("Birthday" in newUser)) {
        newUser["Birthday"] = "";
      }

      if (!("Address" in newUser)) {
        newUser["Address"] = "";
      }

      if (!("Title" in newUser)) {
        newUser["Title"] = "";
      }

      if (!("Date Started" in newUser)) {
        newUser["Date Started"] = "";
      }

      if (!("Department" in newUser)) {
        newUser["Department"] = "";
      }

      if (!("City" in newUser)) {
        newUser["City"] = "";
      }

      if (!("State" in newUser)) {
        newUser["State"] = "";
      }

      if (!("Zip" in newUser)) {
        newUser["Zip"] = "";
      }

      if (
        "First Name" in newUser &&
        newUser["First Name"] &&
        "Last Name" in newUser &&
        newUser["Last Name"]
      ) {
        users.activeUsers[userCount + 1 + rIndex] = newUser;
        newUserIds.push(userCount + 1 + rIndex);
      }
    });

    let allResult = await Promise.all(allMapping);
    return df;
  });

  // response.data = df.toCollection();
  response.users = users;
  response.newUserIds = newUserIds;
  response.totalRows = totalRows;

  // TO-DO - AWS READ
  let savePath = `./testData/accounts/${accountData.account.accountID}/masterList.json`;
  let saveMasterList = await gFunctions.writeFile(
    savePath,
    response.users,
    true
  );

  // let saveMasterList = await gFunctions.writeAWSFile(savePath, response.users);

  if (!saveMasterList) {
    response.error = "Error making list";
    ctx.body = response;

    return response;
  }

  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
router.put("/userList", async (ctx) => {
  let response = { error: "", updated: false };

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.updateRecipientGroup
  );
  if (allowed.error || !allowed.allowed) {
    response.error = allowed.error ? allowed.error : "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  let body = ctx.request.body;

  // EXAMPLE BODY
  // {
  //   users:[] array of userID,
  //   type:"group" - string,
  //   old:"marketing" - string of old field,
  //   new:"new marketing"  - string of new field
  // }

  if (
    !body.type ||
    !body.users ||
    body.old === undefined ||
    body.new === undefined
  ) {
    response.error = "Missing Update Requirements";
    ctx.body = response;

    return response;
  }

  // TO-DO - switch to AWS
  // let filePath = `./testData/accounts/${allowed.account.accountID}/masterList.json`;
  // let accountMasterList = await gFunctions.openLocalJSONFile(filePath);

  let filePath = `accounts/${allowed.account.accountID}/masterList.json`;
  let accountMasterList = await gFunctions.readAWSJsonFile(filePath);

  if (accountMasterList.error) {
    response.error = accountMasterList.error;
    ctx.body = response;

    return response;
  }

  let userUpdateMap = body.users.map((userID) => {
    if (userID in accountMasterList.data.activeUsers) {
      let user = accountMasterList.data.activeUsers[userID];

      if (body.type === "group") {
        if (user.Department === body.old) {
          user.Department = body.new;
        } else {
          console.log(
            "DIDN'T Match? ",
            user.Name,
            user.Department,
            body.old,
            body.new
          );
        }
      }

      accountMasterList.data.activeUsers[userID] = user;
    } else {
      console.log("MISSING USER", userID);
    }
  });

  let userUpdateResult = await Promise.all(userUpdateMap);

  // let savedList = await gFunctions.writeFile(filePath, accountMasterList.data);
  let savedList = await gFunctions.writeAWSFile(
    filePath,
    accountMasterList.data
  );

  response.updated = savedList;
  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
router.post("/userList/user", async (ctx) => {
  let response = { error: "", added: false };

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.addRecipient
  );
  if (allowed.error || !allowed.allowed) {
    response.error = allowed.error ? allowed.error : "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  let body = ctx.request.body;

  // EXAMPLE BODY
  // {
  //   Name: "",
  //   Birthday: "",
  //   Address: "",
  //   ["Title"]: "",
  //   ["Date Started"]: "",
  //   Department: "",
  //   City:"",
  //   State (2 Char):"",
  //   Zip:"",
  //   userID:1
  // }

  if (
    !body.userID ||
    !body["First Name"] ||
    !body["Last Name"] ||
    !body["Title"] ||
    !body.Birthday ||
    !body["Date Started"] ||
    !body.Address ||
    !body.City ||
    !body.State ||
    !body.Zip
  ) {
    response.error = "Missing Add User Requirements";
    ctx.body = response;

    return response;
  }

  // TO-DO - switch to AWS
  let filePath = `./testData/accounts/${allowed.account.accountID}/masterList.json`;
  let accountMasterList = await gFunctions.openLocalJSONFile(filePath);

  // let filePath = `accounts/${accountData.account.accountID}/masterList.json`;
  // let accountMasterList = await gFunctions.readAWSJsonFile(filePath);

  if (accountMasterList.error) {
    response.error = accountMasterList.error;
    ctx.body = response;

    return response;
  }

  accountMasterList.data.activeUsers[body.userID] = body;

  let savedList = await gFunctions.writeFile(filePath, accountMasterList.data);
  // let savedList = await gFunctions.writeAWSFile(filePath, accountMasterList.data);

  response.added = savedList;
  ctx.body = response;
  return ctx;
});

router.put("/userList/user", async (ctx) => {
  let response = { error: "", saved: false };

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.editRecipient
  );
  if (allowed.error || !allowed.allowed) {
    response.error = allowed.error ? allowed.error : "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  let body = ctx.request.body;

  // EXAMPLE BODY
  // {
  //   Name: "",
  //   Birthday: "",
  //   Address: "",
  //   ["Title"]: "",
  //   ["Date Started"]: "",
  //   Department: "",
  //   City:"",
  //   State (2 Char):"",
  //   Zip:"",
  //   userID:1
  // }

  if (
    !body.userID ||
    !body["First Name"] ||
    !body["Last Name"] ||
    !body["Title"] ||
    !body.Birthday ||
    !body["Date Started"] ||
    !body.Address ||
    !body.City ||
    !body.State ||
    !body.Zip
  ) {
    response.error = "Missing Add User Requirements";
    ctx.body = response;

    return response;
  }

  // TO-DO - switch to AWS
  // let filePath = `./testData/accounts/${allowed.account.accountID}/masterList.json`;
  // let accountMasterList = await gFunctions.openLocalJSONFile(filePath);

  let filePath = `accounts/${accountData.account.accountID}/masterList.json`;
  let accountMasterList = await gFunctions.readAWSJsonFile(filePath);

  if (accountMasterList.error) {
    response.error = accountMasterList.error;
    ctx.body = response;

    return response;
  }

  accountMasterList.data.activeUsers[body.userID] = body;

  // let savedList = await gFunctions.writeFile(filePath, accountMasterList.data);
  let savedList = await gFunctions.writeAWSFile(
    filePath,
    accountMasterList.data
  );

  response = savedList;
  ctx.body = response;
  return ctx;
});

// USER Endpoints
router.get("/user/login", async (ctx) => {
  let userEmail = gFunctions.hashString(ctx.headers.user).result;
  let response = await qFunctions.queryUser(userEmail);

  ctx.body = response;
  return ctx;
});

// AWS COMPLETE - PERMISSIONED
router.post("/user/registerUser", async (ctx) => {
  let response = {
    error: "",
    accountCreated: false,
    company: { accountID: "", Company: "", City: "", State: "" },
    user: { userID: "", email: "" },
  };
  let body = ctx.request.body;

  // BODY EXAMPLE
  // {
  //   Email: "";
  //   email:"",
  //   "First Name": "";
  //   "Last Name": "";
  //   Company: "";
  //   Address: "";
  //   City: "";
  //   State: "";
  //   Zip: "";
  // }

  if (
    !body ||
    !body.Email ||
    !body["First Name"] ||
    !body["Last Name"] ||
    !body.Company ||
    !body.Address ||
    !body.City ||
    !body.State ||
    !body.Zip
  ) {
    response.error = "Missing Register Requirements";
    ctx.body = response;

    return response;
  }

  if (ctx.headers.user !== body.Email) {
    response.error = "Invalid User";
    ctx.body = response;

    return response;
  }

  let userEmail = gFunctions.hashString(ctx.headers.user).result;

  let checkUser = await qFunctions.queryUser(userEmail);

  if (checkUser.validUser) {
    response.error = checkUser.error ? checkUser.error : "User Already Exists";
    ctx.body = response;

    return response;
  }

  let checkAccount = await qFunctions.queryAccount(body);
  if (
    checkAccount.error ||
    checkAccount.company.Company ||
    !checkAccount.validCompany
  ) {
    response.error = checkAccount.error
      ? checkAccount.error
      : "Company Already Exists";
    response.company = checkAccount.company;

    ctx.body = response;

    return response;
  }

  let createCompany = await qFunctions.createNewCompanyAccount(body);

  if (createCompany.error || !createCompany.accountID) {
    response.error = createCompany.error
      ? createCompany.error
      : "Error creating Company, please contact support";
    ctx.body = response;
    return response;
  }

  response.company.accountID = createCompany.accountID;

  let createUser = await qFunctions.createNewUser(
    userEmail,
    body,
    createCompany.accountID
  );

  if (createUser.error) {
    response.error = createUser.error;
    ctx.body = response;

    return response;
  }

  response.user.email = userEmail;
  response.user.userID = createUser.userID;

  let accountUpdate = await qFunctions.updateAccountContact(
    response.company.accountID,
    response.user.userID
  );

  if (accountUpdate.error) {
    response.error = accountUpdate.error;
    ctx.body = response;

    return response;
  }

  response.accountCreated = true;

  ctx.body = response;
  return ctx;
});

const STRIPE_KEY = appSettings.databaseToggle.productionDatabase
  ? process.env.STRIPE_PROD_KEY
  : process.env.STRIPE_TEST_KEY;
router.get("/payment/addCard", async (ctx) => {
  const stripe = require("stripe")(STRIPE_KEY);

  let response = {
    error: "",
    customerSecret: "",
    newCustomer: false,
  };

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.addCard
  );
  if (allowed.error || !allowed.allowed) {
    response.error = allowed.error ? allowed.error : "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  let customer = { id: "" };
  if (!allowed.account.stripeID) {
    customer = await stripe.customers.create({
      description: `Customer Added: ${new Date().toString()} - from AWS Lambda`,
      address: {
        city: allowed.account.city,
        country: "us",
        line1: allowed.account.address,
        postal_code: allowed.account.zip,
        state: allowed.account.state,
      },
      name: allowed.account.name,
    });
    if (customer.id) {
      response.newCustomer = true;

      let addStripeID = qFunctions.updateAccountStripeID(
        customer.id,
        allowed.account.accountID
      );
      response.stripeAdded = addStripeID;
    }
    response.newCustomerData = customer;
  } else {
    customer.id = allowed.account.stripeID;
  }

  if (!customer.id) {
    response.error = "Missing Customer ID";
    ctx.body = response;
    return ctx;
  }

  const intent = await stripe.setupIntents.create({
    customer: customer.id,
  });
  response.customerSecret = intent.client_secret;
  response.customerData = intent;

  ctx.body = response;
  return ctx;
});

router.get("/payment/listCards", async (ctx) => {
  const stripe = require("stripe")(STRIPE_KEY);

  let response = {
    error: "",
    cards: [],
  };

  let allowed = await gFunctions.endPointAuthorize(
    ctx.headers.user,
    appSettings.features.getCards
  );
  if (allowed.error || !allowed.allowed) {
    response.error = allowed.error ? allowed.error : "Unauthorized";
    ctx.body = response;
    return ctx;
  }

  let customer = { id: "" };
  if (!allowed.account.stripeID) {
    customer = await stripe.customers.create({
      description: `Customer Added: ${new Date().toString()} - from AWS Lambda`,
      address: {
        city: allowed.account.city,
        country: "us",
        line1: allowed.account.address,
        postal_code: allowed.account.zip,
        state: allowed.account.state,
      },
      name: allowed.account.name,
    });
    if (customer.id) {
      response.newCustomer = true;

      let addStripeID = qFunctions.updateAccountStripeID(
        customer.id,
        allowed.account.accountID
      );
      response.stripeAdded = addStripeID;
    }
    response.newCustomerData = customer;
  } else {
    customer.id = allowed.account.stripeID;
  }

  if (!customer.id) {
    response.error = "Missing Customer ID";
    ctx.body = response;
    return ctx;
  }

  const paymentMethods = await stripe.paymentMethods.list({
    customer: customer.id,
    type: "card",
  });
  response.cards = paymentMethods.data;

  ctx.body = response;
  return ctx;
});

// TESTING PURPOSE

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
router.get("/test", async (ctx) => {
  let response = { saved: false, email: "", allowed: false };

  // "get_account_campaigns", 2, 1
  let userEmail = gFunctions.hashString(ctx.headers.user).result;
  // let accountData = await qFunctions.getAccountData(userEmail);
  // console.log("ACC", accountData);

  let getQuery = await db.query(
    `
      SELECT *
      FROM temp_orders te
      WHERE te.campaign_id = $1
      AND te.order_id = ANY($2)
      `,
    [5, [3, 54]]
  ); // returns query rows with rowCount else error
  if (getQuery.error) {
    response.error = getQuery.error.stack;
    // return response;
  } else if (getQuery.rowCount > 0) {
    response.company = getQuery.rows[0];
    response.validCompany = false;
    // return response;
  } else {
    response.rows = getQuery.rows;
  }

  // response.allowed = await qFunctions.checkFeature(
  //   "get_account_campaigns",
  //   accountData.account.roleID,
  //   accountData.account.planID
  // );

  // let newArray = Array(10);

  // let personDict = ctx.request.body;
  // let personDict = {};

  // let names = [
  //   "Kevin Sites",
  //   "Krista Humphrey",
  //   "Victoria Black",
  //   "Kolby Beck",
  // ];

  // let jobs = ["CEO", "Manager", "Director", "Developer"];

  // let arrayPromise = [...Array(60).keys()].map((person, pIndex) => {
  //   personDict[pIndex] = {
  //     Name: names[getRandomInt(0, 3)],
  //     Birthday: `${getRandomInt(1, 12)}/${getRandomInt(1, 28)}/21`,
  //     "Job Title": jobs[getRandomInt(0, 3)],
  //   };
  // });

  // let arrayResult = await Promise.all(arrayPromise);

  // console.log("HERE", personDict);

  // let saved = await gFunctions.writeFile("testArray2.json", personDict, true);

  // response.saved = saved;
  // response.items = newArray;

  ctx.body = response;
  return ctx;
});

app.use(router.routes());
exports.server = app;
